/* eslint-disable @typescript-eslint/no-unused-vars */
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pages } from 'next/dist/build/templates/app-page';
import { signIn } from 'next-auth/react';
import { JWT } from 'next-auth/jwt';
import { Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

interface UserWithRole extends User {
  role: string;
  access_token: string;
  image?: string;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          method: 'github',
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile, tokens) {
        let userRole = 'user';
        if (profile.email == 'arfinchowa524@gmail.com') {
          userRole = 'admin';
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
          method: 'google',
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          }
        );

        const data = await response.json();

        if (response.ok && data.user && data.token) {
          return {
            ...data.user,
            role: data.user.role,
            access_token: data.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle social login (GitHub, Google)
      if (account?.provider === 'github' || account?.provider === 'google') {
        try {
          // Call backend to create/update user
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/social-login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                image: user.image,
                method: account.provider,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            // Store access token in user object
            (user as any).access_token = data.token;
            (user as any).role = data.user.role;
            return true;
          } else {
            console.error('Failed to create/update user in backend');
            return false;
          }
        } catch (error) {
          console.error('Error during social login:', error);
          return false;
        }
      }

      // Allow credentials login
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        const typedUser = user as UserWithRole;
        token.role = typedUser.role;
        token.accessToken = typedUser.access_token;
        token.image = typedUser.image;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        const typesSession = session.user as UserWithRole;
        typesSession.role = token.role as string;

        // Fetch latest user data from database to get updated info
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/email/${session.user.email}`
          );
          if (response.ok) {
            const userData = await response.json();
            typesSession.name = userData.name || token.name as string;
            typesSession.image = userData.image || token.image as string;
            typesSession.role = userData.role || token.role as string;
          } else {
            typesSession.image = token.image as string;
          }
        } catch (error) {
          typesSession.image = token.image as string;
        }
      }
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
