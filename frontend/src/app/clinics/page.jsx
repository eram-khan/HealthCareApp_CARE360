"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/landing/Header';

const fallbackClinics = [
  {
    "id": 1, "name": "SafeCare Health Clinic", "city": "Greater Noida", "area": "Alpha 2",
    "address": "Near Alpha 2 Market", "services": ["STI/STD Testing", "Women's Health"], "phone": "9876543210",
    "coordinates": { "lat": 28.4744, "lng": 77.5030 },
    "doctors": [ { "name": "Dr. Anjali Sharma", "specialization": "Gynecologist" }, { "name": "Dr. Rakesh Verma", "specialization": "General Physician" } ]
  },
  {
    "id": 2, "name": "City Wellness Clinic", "city": "Greater Noida", "area": "Beta 1",
    "address": "Opp Beta 1 Metro", "services": ["General Clinic", "Emergency Care"], "phone": "9123456780",
    "coordinates": { "lat": 28.4800, "lng": 77.5100 },
    "doctors": [ { "name": "Dr. Amit Singh", "specialization": "General Physician" }, { "name": "Dr. Neha Kapoor", "specialization": "Dermatologist" } ]
  },
  {
    "id": 3, "name": "Swasthya Support Center", "city": "Delhi", "area": "Laxmi Nagar",
    "address": "Main Road Laxmi Nagar", "services": ["STI/STD Testing", "Counseling"], "phone": "9988776655",
    "coordinates": { "lat": 28.6300, "lng": 77.2800 },
    "doctors": [ { "name": "Dr. Pooja Mehta", "specialization": "Sexual Health Specialist" }, { "name": "Dr. Karan Malhotra", "specialization": "Psychologist" } ]
  },
  {
    "id": 4, "name": "CarePoint Clinic", "city": "Noida", "area": "Sector 62",
    "address": "Near Sector 62 Metro", "services": ["Women's Health", "General Clinic"], "phone": "9012345678",
    "coordinates": { "lat": 28.6200, "lng": 77.3600 },
    "doctors": [ { "name": "Dr. Sneha Gupta", "specialization": "Gynecologist" }, { "name": "Dr. Vivek Jain", "specialization": "General Physician" } ]
  },
  {
    "id": 5, "name": "Hope Wellness Clinic", "city": "Greater Noida", "area": "Gamma 1",
    "address": "Near Jagat Farm, Gamma 1", "services": ["General Clinic", "Women's Health"], "phone": "9898765432",
    "coordinates": { "lat": 28.4600, "lng": 77.5200 },
    "doctors": [ { "name": "Dr. Priya Nanda", "specialization": "Gynecologist" }, { "name": "Dr. Arjun Mehra", "specialization": "General Physician" } ]
  },
  {
    "id": 6, "name": "LifeCare Support Clinic", "city": "Noida", "area": "Sector 18",
    "address": "Near Atta Market, Sector 18", "services": ["STI/STD Testing", "Counseling"], "phone": "9871234567",
    "coordinates": { "lat": 28.5700, "lng": 77.3200 },
    "doctors": [ { "name": "Dr. Simran Kaur", "specialization": "Sexual Health Specialist" }, { "name": "Dr. Rohit Bansal", "specialization": "Psychologist" } ]
  },
  {
    "id": 7, "name": "Sunrise Medical Center", "city": "Delhi", "area": "Karol Bagh",
    "address": "Main Road, Karol Bagh", "services": ["Emergency Care", "General Clinic"], "phone": "9811122233",
    "coordinates": { "lat": 28.6500, "lng": 77.1900 },
    "doctors": [ { "name": "Dr. Kavita Sharma", "specialization": "Emergency Specialist" }, { "name": "Dr. Deepak Arora", "specialization": "General Physician" } ]
  },
  {
    "id": 8, "name": "CareNest Women Clinic", "city": "Ghaziabad", "area": "Indirapuram",
    "address": "Near Habitat Center, Indirapuram", "services": ["Women's Health", "STI/STD Testing"], "phone": "9900011223",
    "coordinates": { "lat": 28.6400, "lng": 77.3700 },
    "doctors": [ { "name": "Dr. Neelam Joshi", "specialization": "Gynecologist" }, { "name": "Dr. Ayesha Khan", "specialization": "Dermatologist" } ]
  }
];

export default function ClinicsPage() {
  const [clinics, setClinics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const fetchClinics = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      const currentSearch = params.search !== undefined ? params.search : searchQuery;
      if (currentSearch) queryParams.append('search', currentSearch);
      if (params.lat) queryParams.append('lat', params.lat);
      if (params.lng) queryParams.append('lng', params.lng);
      
      const pageToFetch = params.page || currentPage;
      queryParams.append('page', pageToFetch);
      queryParams.append('limit', limit);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const res = await fetch(`${apiUrl}/clinics?${queryParams.toString()}`);
      
      const data = await res.json();
      if (data.success) {
        setClinics(data.data);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      } else {
        throw new Error(data.message || 'Failed to fetch clinics');
      }
    } catch (err) {
      console.warn("API fetch failed, falling back to local data.", err);
      let result = [...fallbackClinics];
      const currentSearch = params.search !== undefined ? params.search : searchQuery;
      const q = currentSearch.toLowerCase();
      
      if (q) {
        result = result.filter(clinic => 
          clinic.name.toLowerCase().includes(q) ||
          clinic.city.toLowerCase().includes(q) || 
          clinic.area.toLowerCase().includes(q) ||
          clinic.address.toLowerCase().includes(q) ||
          clinic.doctors.some(doc => 
            doc.specialization.toLowerCase().includes(q) || 
            doc.name.toLowerCase().includes(q)
          ) ||
          clinic.services.some(s => s.toLowerCase().includes(q))
        );
      }
      
      const pageToFetch = params.page || currentPage;
      const totalCount = result.length;
      const tPages = Math.ceil(totalCount / limit);
      const start = (pageToFetch - 1) * limit;
      const end = pageToFetch * limit;
      result = result.slice(start, end);

      setClinics(result);
      setTotalPages(tPages || 1);
      setCurrentPage(pageToFetch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setUserLocation(null); // Reset user location since we are using text search
    setCurrentPage(1);
    fetchClinics({ page: 1, search: searchQuery });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setSearchQuery(''); // Clear text search field
        setCurrentPage(1);
        fetchClinics({ lat: latitude, lng: longitude, search: '', page: 1 });
      },
      (error) => {
        console.error("Error getting location", error);
        alert("Unable to retrieve your location. Please check browser permissions.");
        setLoading(false);
      }
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchClinics({ page: newPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Find Nearby Clinics | CARE360</title>
      </Head>
      <Header />
      <div style={{...styles.container, paddingTop: '120px'}}>
        <div style={styles.wrapper}>
          <h1 style={styles.header}>Find Clinics Near You</h1>
          <p style={styles.subtext}>Search for health centers securely. Your location data is not stored.</p>
          
          <div style={styles.searchCard}>
            <form onSubmit={handleSearch} style={styles.formGroup}>
              <div style={styles.inputRow}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location or specialist..."
                  style={{...styles.input, flex: '1', width: '100%'}}
                />
              </div>

              <div style={styles.buttonRow}>
                <button type="submit" style={styles.primaryButton}>
                  Search Clinics
                </button>
                <button 
                  type="button" 
                  onClick={handleUseMyLocation} 
                  style={styles.secondaryButton}
                >
                  📍 Use My Location
                </button>
              </div>
            </form>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {loading ? (
            <div style={styles.loading}>Searching for clinics...</div>
          ) : (
            <div style={styles.resultsContainer}>
              {clinics.length > 0 ? (
                clinics.map(clinic => (
                  <div key={clinic.id} style={styles.card}>
                    <h3 style={styles.cardTitle}>{clinic.name}</h3>
                    <p style={styles.cardText}>
                      <strong>📍 Location:</strong> {clinic.address}, {clinic.area}, {clinic.city}
                    </p>
                    <div style={styles.tagsContainer}>
                      {clinic.services.map((srv, idx) => (
                        <span key={idx} style={styles.tag}>{srv}</span>
                      ))}
                    </div>
                    {clinic.doctors && clinic.doctors.length > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#333' }}>Doctors Available:</h4>
                        {clinic.doctors.map((doc, idx) => (
                          <div key={idx} style={{ fontSize: '14px', color: '#555', marginBottom: '3px' }}>
                            • <strong>{doc.name}</strong> ({doc.specialization})
                          </div>
                        ))}
                      </div>
                    )}
                    {clinic.distance !== undefined && (
                      <p style={styles.distanceText}>
                        {clinic.distance.toFixed(1)} km away
                      </p>
                    )}
                    <div style={styles.actionRow}>
                      <a href={`tel:${clinic.phone}`} style={styles.callButton}>
                        📞 Call {clinic.phone}
                      </a>
                      <a 
                        href={`https://www.google.com/maps?q=${clinic.coordinates.lat},${clinic.coordinates.lng}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={styles.mapButton}
                      >
                        📍 View on Map
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.noResults}>
                  <p>No clinics found matching your criteria. Try adjusting your search.</p>
                </div>
              )}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={currentPage === 1 ? styles.pageButtonDisabled : styles.pageButton}
              >
                &#8592; Prev
              </button>
              <span style={styles.pageText}>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={currentPage === totalPages ? styles.pageButtonDisabled : styles.pageButton}
              >
                Next &#8594;
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    backgroundColor: '#F7F9FB',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  wrapper: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '8px',
    fontSize: '2rem'
  },
  subtext: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px'
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    marginBottom: '30px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  inputRow: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },
  input: {
    flex: '2',
    minWidth: '200px',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  select: {
    flex: '1',
    minWidth: '150px',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: '#fff'
  },
  buttonRow: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
    flexWrap: 'wrap'
  },
  primaryButton: {
    flex: '1',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },
  secondaryButton: {
    flex: '1',
    backgroundColor: '#f0f4f8',
    color: '#4A90E2',
    border: '1px solid #4A90E2',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '18px'
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  resultsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column'
  },
  cardTitle: {
    margin: '0 0 10px 0',
    color: '#333',
    fontSize: '1.25rem'
  },
  cardText: {
    margin: '0 0 15px 0',
    color: '#555',
    lineHeight: '1.5'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '15px'
  },
  tag: {
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
    padding: '4px 10px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500'
  },
  distanceText: {
    color: '#e65100',
    fontWeight: 'bold',
    marginBottom: '15px',
    fontSize: '14px'
  },
  actionRow: {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto',
    flexWrap: 'wrap'
  },
  callButton: {
    flex: '1',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '10px 5px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '14px'
  },
  mapButton: {
    flex: '1',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#f5f5f5',
    color: '#333',
    padding: '10px 5px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '14px'
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    color: '#666'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
    gap: '15px'
  },
  pageButton: {
    padding: '8px 16px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  pageButtonDisabled: {
    padding: '8px 16px',
    backgroundColor: '#e0e0e0',
    color: '#9e9e9e',
    border: 'none',
    borderRadius: '6px',
    cursor: 'not-allowed',
    fontSize: '14px',
    fontWeight: '600'
  },
  pageText: {
    fontSize: '14px',
    color: '#555',
    fontWeight: '500'
  }
};
