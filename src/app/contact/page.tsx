'use client';

import React, { useState } from 'react';
import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Tech Avenue, Silicon Valley, USA',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 800 123 4567',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@gadgetshub.com',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Fri: 9AM - 6PM',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#ff6e18] to-[#ff8c42] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Get In Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl"
            >
              Have questions? We'd love to hear from you!
            </motion.p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`${info.bgColor} ${info.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <info.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Info Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-[#ff6e18]" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="focus:ring-[#ff6e18]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="focus:ring-[#ff6e18]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        className="focus:ring-[#ff6e18]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                        className="focus:ring-[#ff6e18]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#ff6e18] hover:bg-[#e65c10] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-none shadow-lg bg-gradient-to-br from-[#ff6e18]/10 to-[#ff8c42]/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Support</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📧 Email Support</h4>
                      <p className="text-sm text-gray-600">Response within 24 hours</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">💬 Live Chat</h4>
                      <p className="text-sm text-gray-600">Available 9AM - 6PM EST</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📞 Phone Support</h4>
                      <p className="text-sm text-gray-600">Mon - Fri business hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">FAQ</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">Shipping Time?</p>
                      <p className="text-gray-600">3-5 business days</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Return Policy?</p>
                      <p className="text-gray-600">30 days return</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Warranty?</p>
                      <p className="text-gray-600">1 year manufacturer warranty</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-12">
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Map Location</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Contact;
