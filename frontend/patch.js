const fs = require('fs');
let content = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/landing/LandingHero.jsx', 'utf8');

// Insert useTranslation hook import
content = content.replace("import { userAuthStore } from '@/store/authStore';", "import { userAuthStore } from '@/store/authStore';\nimport { useTranslation } from 'react-i18next';");

// Insert t into component
content = content.replace("const { isAuthenticated } = userAuthStore();", "const { isAuthenticated } = userAuthStore();\n  const { t } = useTranslation();");

// Replace texts
content = content.replace(/The place where <br \/>\s+<span className='text-blue-900'>\s+doctors listen - to you\s+<\/span>/, "{t('landing.hero.title_part1')} <br />\n                    <span className='text-blue-900'>\n                        {t('landing.hero.title_part2')}\n                    </span>");

content = content.replace(/Online primary care that's affordable with or without insurance\. Quality healthcare, accessible anytime, anywhere\./, "{t('landing.hero.subtitle')}");

content = content.replace(/>\s*Book a video visit\s*</, ">\n                        {t('landing.hero.book_video_visit')}\n                    <");

content = content.replace(/<span>Login as Doctor<\/span>/, "<span>{t('landing.hero.login_as_doctor')}</span>");

content = content.replace(/<span>500\+ Certified Doctors<\/span>/, "<span>{t('landing.hero.trust_doctors')}</span>");
content = content.replace(/<span>50,000\+ Satisfied Patients<\/span>/, "<span>{t('landing.hero.trust_patients')}</span>");
content = content.replace(/<span>24\/7 Available<\/span>/, "<span>{t('landing.hero.trust_available')}</span>");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/landing/LandingHero.jsx', content);
