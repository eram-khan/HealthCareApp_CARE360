const express = require('express');
const router = express.Router();

// Dummy Data
const dummyClinics = [
  {
    "id": 1,
    "name": "SafeCare Health Clinic",
    "city": "Greater Noida",
    "area": "Alpha 2",
    "address": "Near Alpha 2 Market",
    "services": ["STI/STD Testing", "Women's Health"],
    "phone": "9876543210",
    "coordinates": { "lat": 28.4744, "lng": 77.5030 },
    "doctors": [
      { "name": "Dr. Anjali Sharma", "specialization": "Gynecologist" },
      { "name": "Dr. Rakesh Verma", "specialization": "General Physician" }
    ]
  },
  {
    "id": 2,
    "name": "City Wellness Clinic",
    "city": "Greater Noida",
    "area": "Beta 1",
    "address": "Opp Beta 1 Metro",
    "services": ["General Clinic", "Emergency Care"],
    "phone": "9123456780",
    "coordinates": { "lat": 28.4800, "lng": 77.5100 },
    "doctors": [
      { "name": "Dr. Amit Singh", "specialization": "General Physician" },
      { "name": "Dr. Neha Kapoor", "specialization": "Dermatologist" }
    ]
  },
  {
    "id": 3,
    "name": "Swasthya Support Center",
    "city": "Delhi",
    "area": "Laxmi Nagar",
    "address": "Main Road Laxmi Nagar",
    "services": ["STI/STD Testing", "Counseling"],
    "phone": "9988776655",
    "coordinates": { "lat": 28.6300, "lng": 77.2800 },
    "doctors": [
      { "name": "Dr. Pooja Mehta", "specialization": "Sexual Health Specialist" },
      { "name": "Dr. Karan Malhotra", "specialization": "Psychologist" }
    ]
  },
  {
    "id": 4,
    "name": "CarePoint Clinic",
    "city": "Noida",
    "area": "Sector 62",
    "address": "Near Sector 62 Metro",
    "services": ["Women's Health", "General Clinic"],
    "phone": "9012345678",
    "coordinates": { "lat": 28.6200, "lng": 77.3600 },
    "doctors": [
      { "name": "Dr. Sneha Gupta", "specialization": "Gynecologist" },
      { "name": "Dr. Vivek Jain", "specialization": "General Physician" }
    ]
  },
  {
    "id": 5,
    "name": "Hope Wellness Clinic",
    "city": "Greater Noida",
    "area": "Gamma 1",
    "address": "Near Jagat Farm, Gamma 1",
    "services": ["General Clinic", "Women's Health"],
    "phone": "9898765432",
    "coordinates": { "lat": 28.4600, "lng": 77.5200 },
    "doctors": [
      { "name": "Dr. Priya Nanda", "specialization": "Gynecologist" },
      { "name": "Dr. Arjun Mehra", "specialization": "General Physician" }
    ]
  },
  {
    "id": 6,
    "name": "LifeCare Support Clinic",
    "city": "Noida",
    "area": "Sector 18",
    "address": "Near Atta Market, Sector 18",
    "services": ["STI/STD Testing", "Counseling"],
    "phone": "9871234567",
    "coordinates": { "lat": 28.5700, "lng": 77.3200 },
    "doctors": [
      { "name": "Dr. Simran Kaur", "specialization": "Sexual Health Specialist" },
      { "name": "Dr. Rohit Bansal", "specialization": "Psychologist" }
    ]
  },
  {
    "id": 7,
    "name": "Sunrise Medical Center",
    "city": "Delhi",
    "area": "Karol Bagh",
    "address": "Main Road, Karol Bagh",
    "services": ["Emergency Care", "General Clinic"],
    "phone": "9811122233",
    "coordinates": { "lat": 28.6500, "lng": 77.1900 },
    "doctors": [
      { "name": "Dr. Kavita Sharma", "specialization": "Emergency Specialist" },
      { "name": "Dr. Deepak Arora", "specialization": "General Physician" }
    ]
  },
  {
    "id": 8,
    "name": "CareNest Women Clinic",
    "city": "Ghaziabad",
    "area": "Indirapuram",
    "address": "Near Habitat Center, Indirapuram",
    "services": ["Women's Health", "STI/STD Testing"],
    "phone": "9900011223",
    "coordinates": { "lat": 28.6400, "lng": 77.3700 },
    "doctors": [
      { "name": "Dr. Neelam Joshi", "specialization": "Gynecologist" },
      { "name": "Dr. Ayesha Khan", "specialization": "Dermatologist" }
    ]
  }
];

// Helper to calculate distance in km using Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  
  var dLon = deg2rad(lon2 - lon1); 
  var a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c; 
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// GET /api/clinics
router.get('/', (req, res) => {
  try {
    const { search, lat, lng, page = 1, limit = 4 } = req.query;

    let filteredClinics = [...dummyClinics];

    // Filter by single search string (location, doctor specialization, or service)
    if (search) {
      const q = search.toLowerCase();
      filteredClinics = filteredClinics.filter(clinic => 
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

    // If coordinates are provided, sort by distance
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      
      // Calculate and append distance
      filteredClinics = filteredClinics.map(clinic => {
        const distance = getDistanceFromLatLonInKm(userLat, userLng, clinic.coordinates.lat, clinic.coordinates.lng);
        return { ...clinic, distance };
      });
      
      // Sort by nearest first
      filteredClinics.sort((a, b) => a.distance - b.distance);
    }

    const totalCount = filteredClinics.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    filteredClinics = filteredClinics.slice(startIndex, endIndex);

    res.json({ 
      success: true, 
      count: filteredClinics.length, 
      totalCount,
      totalPages,
      currentPage: Number(page),
      data: filteredClinics 
    });
  } catch (error) {
    console.error('Error fetching clinics:', error);
    res.status(500).json({ success: false, message: 'Server error fetching clinics' });
  }
});

module.exports = router;
