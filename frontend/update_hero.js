const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const langs = ['en', 'hi', 'bn'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, lang, 'common.json');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (lang === 'en') {
            content = content.replace(/"book_video_visit": "Book a video visit"/g, '"book_video_visit": "Book Consultation"');
        } else if (lang === 'hi') {
            content = content.replace(/"book_video_visit": "वीडियो परामर्श बुक करें"/g, '"book_video_visit": "परामर्श बुक करें"');
        } else if (lang === 'bn') {
            content = content.replace(/"book_video_visit": "ভিডিও ভিজিট বুক করুন"/g, '"book_video_visit": "পরামর্শ বুক করুন"');
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
    }
});

console.log("Updated 'book a video visit' to 'book consultation'");
