import React from 'react';
import ContactUs from '@/components/contact/ContactUs';
import Header from '@/components/landing/Header';
import '../../styles/support-theme.css';

export default function ContactUsPage() {
  return (
    <div className="support-container flex flex-col items-center pt-24">
      <Header />
      <div style={{ maxWidth: '600px', width: '100%', marginTop: '40px' }}>
        <div className="support-header text-center">
          <h1>We Are Here to Help</h1>
        </div>
        
        <ContactUs />
      </div>
    </div>
  );
}
