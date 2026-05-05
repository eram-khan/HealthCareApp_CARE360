"use client";

import React, { useState, useEffect } from 'react';
import { Phone, AlertTriangle, ShieldAlert } from 'lucide-react';
import '../../styles/support-theme.css';

export default function EmergencyButtons() {
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Attempt to grab location continuously or just on mount so it's ready.
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log("Location access denied or unavailable", error)
      );
    }
  }, []);

  useEffect(() => {
    let holdTimer;
    let progressTimer;
    if (holding) {
      // increase progress every 30ms to reach 100% in 3 seconds (3000ms)
      progressTimer = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 1; // 1% every 30ms -> 3000ms total
        });
      }, 30);

      holdTimer = setTimeout(() => {
        triggerPanic();
        setHolding(false);
        setHoldProgress(0);
      }, 3000);
    } else {
      setHoldProgress(0);
    }
    
    return () => {
      clearTimeout(holdTimer);
      clearInterval(progressTimer);
    };
  }, [holding]);

  const handlePointerDown = () => setHolding(true);
  const handlePointerUp = () => setHolding(false);
  const handlePointerLeave = () => setHolding(false);

  const triggerPanic = async () => {
    const locMsg = location 
      ? `I need urgent help. My location: https://maps.google.com/?q=${location.lat},${location.lng}` 
      : `I need urgent help. Please contact me immediately.`;
    
    // Send email alert to admin
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/emergency/alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location })
      });
      console.log('Emergency email alert sent.');
    } catch (error) {
      console.error('Failed to send emergency email alert:', error);
    }

    const message = encodeURIComponent(locMsg);
    // Standard SMS link without predefined number ensures it goes to default SMS app where user can pick contact or default to emergency
    window.location.href = `sms:?body=${message}`;
  };

  return (
    <div className="support-card">
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldAlert color="#EB5757" /> Immediate Help
      </h2>
      <p style={{ color: 'var(--support-text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
        Tap any number below to call directly. For the panic button, hold for 3 seconds to send an emergency SMS with your location.
      </p>

      <div className="flex flex-col gap-4 mb-4">
        <a href="tel:100" className="support-btn support-btn-outline w-full" style={{ color: 'var(--support-text-primary)' }}>
          <Phone size={18} /> Call Police (100)
        </a>
        <a href="tel:108" className="support-btn support-btn-outline w-full" style={{ color: 'var(--support-text-primary)' }}>
          <Phone size={18} /> Call Ambulance (108)
        </a>
        <a href="tel:1091" className="support-btn support-btn-outline w-full" style={{ color: 'var(--support-text-primary)' }}>
          <Phone size={18} /> Women Helpline (1091)
        </a>
      </div>

      <div style={{ marginTop: '32px' }}>
        <button 
          className="support-btn support-btn-emergency"
          style={{ position: 'relative', overflow: 'hidden' }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
        >
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, left: 0, bottom: 0, 
              width: `${Math.min(holdProgress, 100)}%`, 
              backgroundColor: 'rgba(0,0,0,0.2)',
              transition: 'width 0.1s linear'
            }} 
          />
          <AlertTriangle size={20} style={{ position: 'relative', zIndex: 1 }} /> 
          <span style={{ position: 'relative', zIndex: 1 }}>
            HOLD TO ALERT (PANIC)
          </span>
        </button>
        {holding && <p className="text-center mt-4" style={{ color: 'var(--support-emergency)', fontSize: '12px', fontWeight: 'bold' }}>Holding... {Math.floor((holdProgress/100) * 3)}s</p>}
      </div>
    </div>
  );
}
