import React from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-96 w-full">
              <Image 
                src="/images/about-us.png" 
                alt="CARE360 Medical Team" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-md">About CARE360</h1>
              </div>
            </div>
            
            <div className="p-10 md:p-16 text-gray-800 space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
                <p className="text-lg leading-relaxed text-gray-600 mb-4">
                  At CARE360, our primary mission is to provide safe, stigma-free, and confidential healthcare specifically tailored for sex workers and other vulnerable communities in India. We understand the unique challenges and discrimination faced by sex workers when seeking medical care.
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                  Our platform is built to ensure that distance, time, financial constraints, and societal stigma are never barriers to receiving world-class medical advice and treatment. We are committed to fostering an environment of absolute discretion, empathy, and respect.
                </p>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Who We Are</h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  We are a dynamic team of healthcare professionals, technologists, and patient advocates dedicated to revolutionizing the healthcare landscape. With a network of hundreds of certified, sensitized, and non-judgmental doctors across various specialties, CARE360 bridges the gap between marginalized individuals and premium medical expertise. We offer panic buttons, NGO directories, and anonymous consultations to ensure safety is always our top priority.
                </p>
              </section>

              <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">100+</h3>
                  <p className="font-medium text-gray-700">Certified Doctors</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <h3 className="text-4xl font-bold text-green-600 mb-2">24/7</h3>
                  <p className="font-medium text-gray-700">Support & Care</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <h3 className="text-4xl font-bold text-purple-600 mb-2">200+</h3>
                  <p className="font-medium text-gray-700">Satisfied Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
