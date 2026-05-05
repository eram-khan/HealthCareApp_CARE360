const express = require('express');
const router = express.Router();

const ngoList = [
  {
    id: 'ngo-1',
    name: 'Durbar Mahila Samanwaya Committee',
    description: 'A collective of sex workers fighting for the rights and dignity of sex workers, providing health support and legal advocacy.',
    website: 'https://durbar.org/',
    categories: ['Health Support', 'Legal Help']
  },
  {
    id: 'ngo-2',
    name: 'SANGRAM',
    description: 'Empowering women in sex work through collective organizing, education, and health awareness, primarily focused on STI/HIV prevention.',
    website: 'https://www.sangram.org/',
    categories: ['Health Support']
  },
  {
    id: 'ngo-3',
    name: 'National Network of Sex Workers (NNSW)',
    description: 'A national network amplifying the voices of sex workers from different states and fighting against violence and stigma.',
    website: 'https://nnswindia.org/',
    categories: ['Legal Help', 'Counseling']
  },
  {
    id: 'ngo-4',
    name: 'All India Network of Sex Workers (AINSW)',
    description: 'A broad alliance fighting for the rights of sex workers in India, providing shelter connections and national advocacy.',
    website: 'https://www.ainsw.in/',
    categories: ['Legal Help', 'Shelter']
  }
];

// GET /api/ngo
// Fetch list of NGOs
router.get('/', (req, res) => {
    try {
        res.status(200).json({ success: true, count: ngoList.length, data: ngoList });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch NGO data' });
    }
});

module.exports = router;
