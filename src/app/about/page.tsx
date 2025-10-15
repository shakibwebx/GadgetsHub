'use client';

import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Truck, Headphones, Award, Target, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'Latest Tech',
      description: 'Exclusive access to cutting-edge gadgets',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and secure shipping options',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help you',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Safe and encrypted transactions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Award, value: '500+', label: 'Products' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction Rate' },
    { icon: Target, value: '50+', label: 'Brands' },
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-6"
            >
              About Gadgets-Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl max-w-3xl mx-auto"
            >
              Your trusted destination for the latest technology and gadgets
            </motion.p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto px-6 -mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-[#ff6e18]" />
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  At <span className="font-bold text-[#ff6e18]">Gadgets-Hub</span>, we're passionate about bringing the latest technology to your fingertips. Founded by tech enthusiasts, we've built a platform that makes discovering and purchasing cutting-edge gadgets simple and enjoyable.
                </p>
                <p>
                  Whether you're a gamer seeking the latest gear, a professional looking for productivity tools, or a tech lover exploring new innovations, we have something for everyone.
                </p>
                <p>
                  Our mission is to provide not just products, but experiences—with seamless shopping, fast delivery, and exceptional customer service.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  To become the leading online destination for gadget enthusiasts worldwide, offering an extensive range of high-quality electronics and accessories.
                </p>
                <p>
                  We envision a future where technology is accessible to everyone, and where shopping for gadgets is as exciting as using them.
                </p>
              </div>
              <div className="mt-8">
                <Badge className="bg-[#ff6e18] text-white px-4 py-2 text-lg">
                  Trusted by 10,000+ Customers
                </Badge>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Info Card */}
          <Card className="border-none shadow-lg bg-gradient-to-r from-[#ff6e18]/10 to-[#ff8c42]/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get In Touch</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-2">📍</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">123 Tech Avenue<br/>Silicon Valley, USA</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">📞</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 800 123 4567</p>
                </div>
                <div>
                  <div className="text-4xl mb-2">📧</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">support@gadgetshub.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;
