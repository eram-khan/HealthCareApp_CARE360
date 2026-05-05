"use client";

import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import '../../styles/support-theme.css';

export default function PinLock({ children }) {
  const [isLocked, setIsLocked] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  // A very simple static PIN just for safety envelope demonstration
  // In production, this might be set via localStorage by the user
  const CORRECT_PIN = '1234'; 

  useEffect(() => {
    // Optionally check if PIN protection is enabled in localStorage
    const lockEnabled = localStorage.getItem('care360-pin-lock') === 'true';
    setIsLocked(lockEnabled);
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setIsLocked(false);
      setPin('');
      setError('');
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'var(--support-bg)',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="support-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ backgroundColor: 'rgba(74, 144, 226, 0.1)', padding: '16px', borderRadius: '50%' }}>
             <Lock size={32} color="var(--support-primary)" />
          </div>
        </div>
        
        <h2 style={{ marginBottom: '8px', color: 'var(--support-text-primary)' }}>Secure Access</h2>
        <p style={{ color: 'var(--support-text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
          Please enter your 4-digit PIN to access this application.
        </p>

        <form onSubmit={handleUnlock}>
          <input 
            type="password" 
            pattern="[0-9]*" 
            inputMode="numeric"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            style={{
              width: '100%', padding: '16px', fontSize: '24px', letterSpacing: '8px',
              textAlign: 'center', borderRadius: 'var(--support-radius)',
              border: `2px solid ${error ? 'var(--support-emergency)' : 'var(--support-border)'}`,
              marginBottom: '16px', outline: 'none'
            }}
            autoFocus
          />
          {error && <p style={{ color: 'var(--support-emergency)', fontSize: '12px', marginBottom: '16px', marginTop: '-8px' }}>{error}</p>}
          <button type="submit" className="support-btn support-btn-primary w-full">
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
