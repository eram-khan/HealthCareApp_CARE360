"use client";

import React from 'react';
import { LogOut } from 'lucide-react';
import '../../styles/support-theme.css';

export default function QuickExit() {
  const handleExit = () => {
    // Quickly replace the current history state and navigate to a safe site
    window.location.replace("https://www.google.com");
  };

  return (
    <button
      onClick={handleExit}
      title="Quick Exit"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#EB5757',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(235, 87, 87, 0.4)',
        zIndex: 9999,
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <LogOut size={20} /> Leave Site
    </button>
  );
}
