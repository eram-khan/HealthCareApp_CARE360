const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const langs = ['en', 'hi', 'bn'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, lang, 'common.json');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (lang === 'en') {
            content = content.replace(/"trust_doctors": "500\+ Certified Doctors"/g, '"trust_doctors": "100+ Certified Doctors"');
            content = content.replace(/"trust_patients": "5,000\+ Happy Patients"/g, '"trust_patients": "200+ Happy Patients"');
        } else if (lang === 'hi') {
            content = content.replace(/"trust_doctors": "500\+ प्रमाणित डॉक्टर"/g, '"trust_doctors": "100+ प्रमाणित डॉक्टर"');
            content = content.replace(/"trust_patients": "5,000\+ खुश मरीज"/g, '"trust_patients": "200+ खुश मरीज"');
        } else if (lang === 'bn') {
            content = content.replace(/"trust_doctors": "৫০০\+ প্রত্যয়িত ডাক্তার"/g, '"trust_doctors": "100+ প্রত্যয়িত ডাক্তার"');
            content = content.replace(/"trust_patients": "৫,০০০\+ খুশি রোগী"/g, '"trust_patients": "200+ খুশি রোগী"');
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log("Updated trust indicators in locales");
