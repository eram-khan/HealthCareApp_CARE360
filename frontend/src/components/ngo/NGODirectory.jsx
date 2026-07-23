"use client";

import React, { useState, useEffect } from 'react';
import NGOCard from './NGOCard';

// Fallback data in case the backend API isn't fully ready
const fallbackNGOs = [
  {
    id: 'ngo-1', name: 'Durbar Mahila Samanwaya Committee',
    description: 'A collective of sex workers fighting for the rights and dignity of sex workers, providing health support and legal advocacy.',
    website: 'https://durbar.org/', categories: ['Health Support', 'Legal Help']
  },
  {
    id: 'ngo-2', name: 'SANGRAM',
    description: 'Empowering women in sex work through collective organizing, education, and health awareness.',
    website: 'https://www.sangram.org/', categories: ['Health Support']
  },
  {
    id: 'ngo-3', name: 'National Network of Sex Workers (NNSW)',
    description: 'A national network amplifying the voices of sex workers from different states and fighting against violence and stigma.',
    website: 'https://nnswindia.org/', categories: ['Legal Help', 'Counseling']
  },
  {
    id: 'ngo-4', name: 'All India Network of Sex Workers (AINSW)',
    description: 'A broad alliance fighting for the rights of sex workers in India, providing shelter connections and national advocacy.',
    website: 'https://www.ainsw.in/', categories: ['Legal Help', 'Shelter']
  }
];

export default function NGODirectory() {
  const [ngos, setNgos] = useState([]);
  const [filter, setFilter] = useState('All');
  
  useEffect(() => {
    // Fetch from the API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ngo`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setNgos(data.data);
        } else {
          setNgos(fallbackNGOs);
        }
      })
      .catch((err) => {
        console.error("Failed to load NGOs from API, using fallback", err);
        setNgos(fallbackNGOs);
      });
  }, []);

  const categories = ['All', 'Health Support', 'Legal Help', 'Counseling', 'Shelter'];

  const filteredNgos = filter === 'All' 
    ? ngos 
    : ngos.filter(ngo => ngo.categories?.includes(filter));

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              whiteSpace: 'nowrap',
              backgroundColor: filter === cat ? 'var(--support-primary)' : '#E5E7EB',
              color: filter === cat ? 'white' : 'var(--support-text-primary)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredNgos.map(ngo => (
          <NGOCard key={ngo.id} ngo={ngo} />
        ))}
      </div>
      
      {filteredNgos.length === 0 && (
         <p style={{ textAlign: 'center', marginTop: '40px', color: 'var(--support-text-secondary)' }}>
           No organizations found matching this category.
         </p>
      )}
    </div>
  );
}
