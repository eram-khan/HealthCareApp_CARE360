"use client";

import React, { useState } from 'react';
import { Mic, UserX, UserCheck } from 'lucide-react';
import '../../styles/support-theme.css';

/**
 * SafeChatAddons
 * This component contains the Anonymous toggle and Voice message UI placeholders
 * as requested. Since we are not modifying existing components directly, 
 * this can be imported and dropped securely next to or inside the existing Chat interface.
 */
export default function SafeChatAddons({ onToggleAnonymous }) {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleToggle = () => {
    const newState = !isAnonymous;
    setIsAnonymous(newState);
    if (onToggleAnonymous) onToggleAnonymous(newState);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', backgroundColor: 'var(--support-bg)', borderRadius: 'var(--support-radius)' }}>
      {/* Anonymous Toggle */}
      <button 
        onClick={handleToggle}
        className="support-btn"
        style={{
          backgroundColor: isAnonymous ? '#F2C94C' : 'var(--support-card-bg)',
          color: isAnonymous ? '#000' : 'var(--support-text-secondary)',
          border: '1px solid var(--support-border)',
          padding: '8px 12px',
          fontSize: '14px'
        }}
      >
        {isAnonymous ? <UserX size={16} /> : <UserCheck size={16} />}
        {isAnonymous ? 'Anonymous Mode ON' : 'Go Anonymous'}
      </button>

      {/* Voice Message Placeholder */}
      <button 
        className="support-btn"
        title="Send Voice Note (Coming Soon)"
        style={{
          padding: '10px',
          borderRadius: '50%',
          backgroundColor: 'var(--support-card-bg)',
          border: '1px solid var(--support-border)',
          color: 'var(--support-primary)',
          cursor: 'not-allowed'
        }}
      >
        <Mic size={18} />
      </button>
    </div>
  );
}
