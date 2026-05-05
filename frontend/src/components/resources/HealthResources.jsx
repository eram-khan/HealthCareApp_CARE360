"use client";

import React, { useState } from 'react';
import '../../styles/support-theme.css';
import { HeartPulse, ShieldCheck, MapPin } from 'lucide-react';

export default function HealthResources() {
  const [activeTab, setActiveTab] = useState('prevention');

  return (
    <div className="support-card">
      <div style={{ display: 'flex', borderBottom: '1px solid var(--support-border)', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('prevention')}
          style={{
            flex: 1, padding: '12px', background: 'none', border: 'none',
            borderBottom: activeTab === 'prevention' ? '3px solid var(--support-primary)' : '3px solid transparent',
            color: activeTab === 'prevention' ? 'var(--support-primary)' : 'var(--support-text-secondary)',
            fontWeight: activeTab === 'prevention' ? 'bold' : 'normal',
            cursor: 'pointer'
          }}
        >
          Prevention
        </button>
        <button 
          onClick={() => setActiveTab('testing')}
          style={{
            flex: 1, padding: '12px', background: 'none', border: 'none',
            borderBottom: activeTab === 'testing' ? '3px solid var(--support-primary)' : '3px solid transparent',
            color: activeTab === 'testing' ? 'var(--support-primary)' : 'var(--support-text-secondary)',
            fontWeight: activeTab === 'testing' ? 'bold' : 'normal',
            cursor: 'pointer'
          }}
        >
          Free Testing
        </button>
      </div>

      {activeTab === 'prevention' && (
        <div style={{ padding: '8px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--support-text-primary)' }}>
            <ShieldCheck size={20} color="var(--support-secondary)" /> STI/STD Prevention Tips
          </h3>
          <ul style={{ paddingLeft: '20px', marginTop: '16px', lineHeight: '1.8', color: 'var(--support-text-secondary)' }}>
            <li><strong>Use Condoms Consistently:</strong> Condoms are the most effective method to prevent both pregnancy and STIs.</li>
            <li><strong>Regular Screenings:</strong> Get tested every 3-6 months. Many STIs have no symptoms initially.</li>
            <li><strong>Know Your Rights:</strong> You have the right to refuse a client who refuses safe practices.</li>
            <li><strong>Communication:</strong> Always talk openly with your partners/clients about safe sex limits before any activity.</li>
            <li><strong>PrEP & PEP:</strong> Consider Pre-Exposure Prophylaxis to prevent HIV, and use PEP within 72 hours of an exposure.</li>
          </ul>
        </div>
      )}

      {activeTab === 'testing' && (
        <div style={{ padding: '8px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--support-text-primary)' }}>
            <MapPin size={20} color="var(--support-primary)" /> Confidential Free Testing Centers
          </h3>
          <p style={{ marginTop: '12px', marginBottom: '20px', color: 'var(--support-text-secondary)' }}>
            Testing is fully confidential and in many places legally protected to remain anonymous.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--support-bg)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Government ICTC Clinics (National)</h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--support-text-secondary)' }}>
                Integrated Counseling and Testing Centres available in government district hospitals across India. Free counseling & testing.
              </p>
              <a href="https://naco.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--support-primary)', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold' }}>
                Visit NACO Directory
              </a>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--support-bg)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Sneh Clinic Network</h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--support-text-secondary)' }}>
                Targeted intervention clinics providing safe, non-judgmental healthcare for high-risk groups.
              </p>
              <span style={{ fontSize: '14px', color: 'var(--support-text-primary)', fontWeight: 'bold' }}>Call Toll Free: 1097 (National AIDS Helpline)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
