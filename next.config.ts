module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'cdn1.iconfinder.com',
      'github.githubassets.com',
      'cdn.pixabay.com', // fallback image
      'lh3.googleusercontent.com', // if using Google provider
      'avatars.githubusercontent.com', // if using GitHub provider
      'localhost',
      'demo2.themelexus.com',
      'www.squarepharma.com.bd',
      'vineta-html.vercel.app',
      'i.ibb.co.com',
      'via.placeholder.com',
      'upload.wikimedia.org', // for brand logos
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
        // pathname: '/dx4vanvsp/**',
      },
      {
        protocol: 'https',
        hostname: 'demo2.themelexus.com',
        pathname: '**',
      },
    ],
  },
};
