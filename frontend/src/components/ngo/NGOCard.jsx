import React from 'react';
import '../../styles/support-theme.css';
import { ExternalLink, Phone } from 'lucide-react';

export default function NGOCard({ ngo }) {
  return (
    <div className="support-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--support-text-primary)' }}>
          {ngo.name}
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {ngo.categories?.map(cat => (
            <span key={cat} style={{ 
              backgroundColor: 'rgba(111, 207, 151, 0.2)', 
              color: '#27AE60', 
              padding: '4px 8px', 
              borderRadius: '16px', 
              fontSize: '12px',
              fontWeight: 600
            }}>
              {cat}
            </span>
          ))}
        </div>

        <p style={{ fontSize: '14px', color: 'var(--support-text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
          {ngo.description}
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        {ngo.website && (
          <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="support-btn support-btn-primary" style={{ flex: 1, padding: '10px' }}>
            <ExternalLink size={16} /> Link
          </a>
        )}
        {ngo.phone && (
          <a href={`tel:${ngo.phone}`} className="support-btn support-btn-outline" style={{ flex: 1, padding: '10px' }}>
            <Phone size={16} /> Call
          </a>
        )}
      </div>
    </div>
  );
}
