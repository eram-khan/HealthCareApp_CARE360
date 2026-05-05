import React from 'react';
import EmergencyButtons from '@/components/emergency/EmergencyButtons';
import Header from '@/components/landing/Header';
import '../../styles/support-theme.css';

export default function EmergencyPage() {
  return (
    <div className="support-container flex flex-col items-center pt-24">
      <Header />
      <div style={{ maxWidth: '600px', width: '100%', marginTop: '40px' }}>
        <div className="support-header">
          <h1>Emergency Support</h1>
          <p>Get immediate help discreetly and safely. Your safety is our priority.</p>
        </div>
        
        <EmergencyButtons />
      </div>
    </div>
  );
}
