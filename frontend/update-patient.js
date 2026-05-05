const fs = require('fs');

const updateJson = (path, newObj) => {
  const data = JSON.parse(fs.readFileSync(path));
  data.patientDashboard = newObj;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/en/common.json', {
  my_appointment: 'My Appointment',
  manage_appointments: 'Manage your healthcare appointments',
  chats_ai: 'Chats & AI Bot',
  book_new: 'Book New Appointment',
  upcoming: 'Upcoming',
  past: 'Past',
  today: 'TODAY',
  fee: 'Fee:',
  symptoms: 'Symptoms',
  join_call: 'Join Call',
  view_prescription: 'View Prescription',
  no_upcoming_title: 'No Upcoming Appointments',
  no_upcoming_desc: 'You have no upcoming appointments scheduled.',
  no_past_title: 'No Past Appointments',
  no_past_desc: 'Your Completed consultations will appear here.',
  book_first: 'Book Your First Appointment'
});

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/hi/common.json', {
  my_appointment: 'मेरी नियुक्ति',
  manage_appointments: 'अपनी स्वास्थ्य नियुक्तियों का प्रबंधन करें',
  chats_ai: 'चैट और एआई बॉट',
  book_new: 'नई नियुक्ति बुक करें',
  upcoming: 'आने वाली',
  past: 'पिछली',
  today: 'आज',
  fee: 'शुल्क:',
  symptoms: 'लक्षण',
  join_call: 'कॉल में शामिल हों',
  view_prescription: 'पर्चे देखें',
  no_upcoming_title: 'कोई आगामी नियुक्ति नहीं',
  no_upcoming_desc: 'आपकी कोई आगामी नियुक्ति निर्धारित नहीं है।',
  no_past_title: 'कोई पिछली नियुक्ति नहीं',
  no_past_desc: 'आपके पूर्ण परामर्श यहां दिखाई देंगे।',
  book_first: 'अपनी पहली नियुक्ति बुक करें'
});

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/bn/common.json', {
  my_appointment: 'আমার অ্যাপয়েন্টমেন্ট',
  manage_appointments: 'আপনার স্বাস্থ্যসেবা অ্যাপয়েন্টমেন্টগুলি পরিচালনা করুন',
  chats_ai: 'চ্যাট এবং এআই বট',
  book_new: 'নতুন অ্যাপয়েন্টমেন্ট বুক করুন',
  upcoming: 'আসন্ন',
  past: 'অতীত',
  today: 'আজ',
  fee: 'ফি:',
  symptoms: 'লক্ষণ',
  join_call: 'কলে যোগ দিন',
  view_prescription: 'প্রেসক্রিপশন দেখুন',
  no_upcoming_title: 'কোনো আসন্ন অ্যাপয়েন্টমেন্ট নেই',
  no_upcoming_desc: 'আপনার কোনো আসন্ন অ্যাপয়েন্টমেন্ট নির্ধারিত নেই।',
  no_past_title: 'কোনো অতীত অ্যাপয়েন্টমেন্ট নেই',
  no_past_desc: 'আপনার সম্পূর্ণ পরামর্শ এখানে প্রদর্শিত হবে।',
  book_first: 'আপনার প্রথম অ্যাপয়েন্টমেন্ট বুক করুন'
});

let content = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/patient/PatientDashboardContent.jsx', 'utf8');

if (!content.includes('useTranslation')) {
    content = content.replace("import React, { useEffect, useState } from \"react\";", "import React, { useEffect, useState } from \"react\";\nimport { useTranslation } from 'react-i18next';");
    content = content.replace("const PatientDashboardContent = () => {", "const PatientDashboardContent = () => {\n  const { t } = useTranslation();");
}

content = content.replace(/My Appointment/, "{t('patientDashboard.my_appointment')}");
content = content.replace(/Manage your healthcare appointments/, "{t('patientDashboard.manage_appointments')}");
content = content.replace(/>Chats & AI Bot<\/span>/, ">{t('patientDashboard.chats_ai')}</span>");
content = content.replace(/Book <span className="hidden md:block">New Appointment<\/span>/, "Book <span className=\"hidden md:block\">{t('patientDashboard.book_new')}</span>");

content = content.replace(/<span>Upcoming \(\{tabCounts\.upcoming\}\)<\/span>/, "<span>{t('patientDashboard.upcoming')} ({tabCounts.upcoming})</span>");
content = content.replace(/<span>Past \(\{tabCounts\.past\}\)<\/span>/, "<span>{t('patientDashboard.past')} ({tabCounts.past})</span>");

content = content.replace(/TODAY/, "{t('patientDashboard.today')}");
content = content.replace(/<span className="font-semibold">Fee:<\/span>/, '<span className="font-semibold">{t("patientDashboard.fee")}</span>');
content = content.replace(/<span className="font-semibold">Symptoms<\/span>/, '<span className="font-semibold">{t("patientDashboard.symptoms")}</span>');

content = content.replace(/Join Call/, "{t('patientDashboard.join_call')}");
content = content.replace(/View Prescription/, "{t('patientDashboard.view_prescription')}");

content = content.replace(/title: "No Upcoming Appointments"/, 'title: t("patientDashboard.no_upcoming_title")');
content = content.replace(/description: "You have no upcoming appointments scheduled\."/, 'description: t("patientDashboard.no_upcoming_desc")');

content = content.replace(/title: "No Past Appointments"/, 'title: t("patientDashboard.no_past_title")');
content = content.replace(/description: "Your Completed consultations will appear here\."/, 'description: t("patientDashboard.no_past_desc")');

content = content.replace(/Book Your First Appointment/, "{t('patientDashboard.book_first')}");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/patient/PatientDashboardContent.jsx', content);

console.log("PatientDashboard Done");
