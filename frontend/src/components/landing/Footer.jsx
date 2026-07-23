"use client";
import { contactInfo, footerSections, socials } from "@/lib/constant";
import { Stethoscope } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        window.alert('Subscription successful!');
        setEmail('');
      } else {
        window.alert(data.message || 'Error subscribing');
      }
    } catch (err) {
      window.alert('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600  rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-br from-white to-blue-100  bg-clip-text text-transparent">
                  CARE360
                </div>
              </div>

              <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                Your trusted healthcare partner providing quality medical
                consultations with certified doctors online, anytime, anywhere.
              </p>

              <div className="space-y-3 mb-6">
                {contactInfo.map((item, index) =>
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-blue-100">

                    <item.icon className="w-4 h-4 text-blue-300" />
                    <span>{item.text}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Links section */}

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, index) =>
                  <div key={index}>
                    <h3 className="font-semibold text-white mb-4 text-lg">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) =>
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className="text-blue-200 hover:text-white transition-colors duration-200 text-sm hover:underline">

                            {link.text}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Newslesster section */}

        <div className="py-8 border-t border-blue-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-blue-200 text-sm">
                Get health tips and doctor updates delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-blue-800/50 border border-blue-600 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent min-w-[280px] h-10" />

              <Button type="submit" disabled={loading} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white px-5 h-10 rounded-md whitespace-nowrap text-sm font-medium">
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom section */}

        <div className="py-6 border-t border-blue-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-blue-200 text-sm">
              <p>&copy; 2025 CARE360, Inc. All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;