const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const langs = ['en', 'hi', 'bn'];

langs.forEach(lang => {
    const filePath = path.join(localesDir, lang, 'common.json');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let data = JSON.parse(content);
        
        if (lang === 'en') {
            data.landing.hero.title_part1 = "Safe, stigma-free healthcare";
            data.landing.hero.title_part2 = "for sex workers";
            data.landing.hero.subtitle = "Confidential online primary care tailored for vulnerable communities. Quality healthcare and emergency support, accessible anytime, anywhere.";
        } else if (lang === 'hi') {
            data.landing.hero.title_part1 = "सुरक्षित और कलंक-मुक्त स्वास्थ्य सेवा";
            data.landing.hero.title_part2 = "यौनकर्मियों के लिए";
            data.landing.hero.subtitle = "कमजोर समुदायों के लिए तैयार की गई गोपनीय ऑनलाइन प्राथमिक देखभाल। गुणवत्तापूर्ण स्वास्थ्य सेवा और आपातकालीन सहायता, कभी भी, कहीं भी सुलभ।";
        } else if (lang === 'bn') {
            data.landing.hero.title_part1 = "নিরাপদ এবং কলঙ্কমুক্ত স্বাস্থ্যসেবা";
            data.landing.hero.title_part2 = "যৌনকর্মীদের জন্য";
            data.landing.hero.subtitle = "অরক্ষিত সম্প্রদায়ের জন্য তৈরি গোপনীয় অনলাইন প্রাথমিক যত্ন। মানসম্মত স্বাস্থ্যসেবা এবং জরুরি সহায়তা, যে কোনো সময়, যে কোনো জায়গায় অ্যাক্সেসযোগ্য।";
        }
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
});

console.log("Updated landing hero text to emphasize sex workers");
