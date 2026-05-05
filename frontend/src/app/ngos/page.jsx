import React from 'react';
import NGODirectory from '@/components/ngo/NGODirectory';
import Header from '@/components/landing/Header';
import '../../styles/support-theme.css';

export default function NGOsPage() {
  return (
    <div className="support-container flex flex-col items-center pt-24">
      <Header />
      <div style={{ maxWidth: '800px', width: '100%', marginTop: '40px' }}>
        <div className="support-header">
          <h1>NGO Support Directory</h1>
          <p>Find organizations dedicated to your health, safety, and rights.</p>
        </div>
        
        <NGODirectory />
      </div>
    </div>
  );
}
