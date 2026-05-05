const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const langs = ['en', 'hi', 'bn'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, lang, 'common.json');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (lang === 'en') {
            content = content.replace(/"trust_patients": "50,000\+ Satisfied Patients"/g, '"trust_patients": "200+ Satisfied Patients"');
        } else if (lang === 'hi') {
            content = content.replace(/"trust_patients": "50,000\+ संतुष्ट मरीज"/g, '"trust_patients": "200+ संतुष्ट मरीज"');
        } else if (lang === 'bn') {
            content = content.replace(/"trust_patients": "৫০,০০০\+ সন্তুষ্ট রোগী"/g, '"trust_patients": "২০০+ সন্তুষ্ট রোগী"');
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log("Updated patient numbers");
