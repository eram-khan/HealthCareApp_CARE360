import React from 'react';
import HealthResources from '@/components/resources/HealthResources';
import Header from '@/components/landing/Header';
import '../../styles/support-theme.css';

export default function HealthResourcesPage() {
  return (
    <div className="support-container flex flex-col items-center pt-24">
      <Header />
      <div style={{ maxWidth: '800px', width: '100%', marginTop: '40px' }}>
        <div className="support-header">
          <h1>Health Resources</h1>
          <p>Important guidelines, prevention tips, and safe clinics.</p>
        </div>
        
        <HealthResources />
      </div>
    </div>
  );
}
