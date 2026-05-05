"use client";

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import '../../styles/support-theme.css'; // Utilizing the safe/supportive soft theme

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    supportType: '',
    message: '',
    anonymous: false
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      setError('Email and Message are required.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '', email: '', phone: '', supportType: '', message: '', anonymous: false
        });
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Could not connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="support-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <CheckCircle size={48} color="var(--support-secondary)" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ marginBottom: '8px' }}>Message Sent Securely</h2>
        <p style={{ color: 'var(--support-text-secondary)', marginBottom: '24px' }}>
          Your message has been sent. We will reach out to you safely and discreetly as soon as possible.
        </p>
        <button className="support-btn support-btn-primary" onClick={() => setSuccess(false)}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="support-card">
      <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Contact Support</h2>
      <p style={{ color: 'var(--support-text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
        Reach out securely for health, legal, or general NGO assistance.
      </p>

      {error && (
        <div style={{ backgroundColor: 'rgba(235, 87, 87, 0.1)', color: 'var(--support-emergency)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
            <input 
              type="checkbox" 
              name="anonymous" 
              checked={formData.anonymous} 
              onChange={handleChange}
              style={{ width: '18px', height: '18px', accentColor: 'var(--support-primary)' }}
            />
            Keep me anonymous
          </label>
        </div>

        {!formData.anonymous && (
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Full Name *</label>
            <input 
              required
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Your Name"
              style={{ width: '100%', padding: '12px', borderRadius: 'var(--support-radius)', border: '1px solid var(--support-border)', outline: 'none' }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Email Address *</label>
          <input 
            required
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="safe.email@example.com"
            style={{ width: '100%', padding: '12px', borderRadius: 'var(--support-radius)', border: '1px solid var(--support-border)', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Phone Number (Optional)</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="e.g. 9876543210"
            style={{ width: '100%', padding: '12px', borderRadius: 'var(--support-radius)', border: '1px solid var(--support-border)', outline: 'none' }}
          />
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Type of Support Needed</label>
           <select 
             name="supportType" 
             value={formData.supportType} 
             onChange={handleChange}
             style={{ width: '100%', padding: '12px', borderRadius: 'var(--support-radius)', border: '1px solid var(--support-border)', outline: 'none', backgroundColor: 'white' }}
           >
             <option value="">Select an option...</option>
             <option value="Health Support">Health Support</option>
             <option value="Emergency Help">Emergency Help</option>
             <option value="Legal Help">Legal Help</option>
             <option value="Counseling">Counseling</option>
             <option value="NGO Assistance">NGO Assistance</option>
           </select>
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Message *</label>
           <textarea 
             required
             name="message" 
             value={formData.message} 
             onChange={handleChange} 
             placeholder="How can we help you?"
             rows="5"
             style={{ width: '100%', padding: '12px', borderRadius: 'var(--support-radius)', border: '1px solid var(--support-border)', outline: 'none', resize: 'vertical' }}
           />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="support-btn support-btn-primary w-full mt-4" 
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Sending...' : <><Send size={18} /> Send MessageSecurely</>}
        </button>
      </form>
    </div>
  );
}
