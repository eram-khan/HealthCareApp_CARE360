const fs = require('fs');

const updateJson = (path, newObj) => {
  const data = JSON.parse(fs.readFileSync(path));
  data.doctorDashboard = newObj;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/en/common.json', {
  good_evening: 'Good evening',
  chats: 'Chats',
  update_availability: 'Update Availability',
  total_patients: 'Total Patients',
  todays_appointments: "Today's Appointments",
  total_revenue: 'Total Revenue',
  completed_stats: 'Completed',
  from_last_year: 'from last year',
  todays_schedule: "Today's Schedule",
  appointments: 'appointments',
  view_all: 'View All',
  age: 'Age:',
  start: 'Start',
  no_appt_today: 'No appointment today',
  enjoy_free_day: 'Enjoy your free day!',
  upcoming_header: 'Upcoming',
  no_upcoming_appts: 'No upcoming appointments',
  performance: 'Performance',
  patient_satisfaction: 'Patient Satisfaction',
  completion_rate: 'Completion Rate',
  response_time: 'Response Time'
});

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/hi/common.json', {
  good_evening: 'शुभ संध्या',
  chats: 'चैट',
  update_availability: 'उपलब्धता अपडेट करें',
  total_patients: 'कुल मरीज',
  todays_appointments: 'आज की नियुक्तियाँ',
  total_revenue: 'कुल राजस्व',
  completed_stats: 'पूरी हो चुकी',
  from_last_year: 'पिछले वर्ष से',
  todays_schedule: 'आज का कार्यक्रम',
  appointments: 'नियुक्तियाँ',
  view_all: 'सभी देखें',
  age: 'आयु:',
  start: 'शुरू करें',
  no_appt_today: 'आज कोई नियुक्ति नहीं',
  enjoy_free_day: 'अपने खाली दिन का आनंद लें!',
  upcoming_header: 'आने वाली',
  no_upcoming_appts: 'कोई आगामी नियुक्ति नहीं',
  performance: 'प्रदर्शन',
  patient_satisfaction: 'मरीज की संतुष्टि',
  completion_rate: 'पूरा होने की दर',
  response_time: 'प्रतिक्रिया समय'
});

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/bn/common.json', {
  good_evening: 'শুভ সন্ধ্যা',
  chats: 'চ্যাট',
  update_availability: 'উপলব্ধতা আপডেট করুন',
  total_patients: 'মোট রোগী',
  todays_appointments: 'আজকের অ্যাপয়েন্টমেন্ট',
  total_revenue: 'মোট আয়',
  completed_stats: 'সম্পন্ন',
  from_last_year: 'গত বছর থেকে',
  todays_schedule: 'আজকের সময়সূচী',
  appointments: 'অ্যাপয়েন্টমেন্ট',
  view_all: 'সব দেখুন',
  age: 'বয়স:',
  start: 'শুরু করুন',
  no_appt_today: 'আজ কোন অ্যাপয়েন্টমেন্ট নেই',
  enjoy_free_day: 'আপনার ফাঁকা দিন উপভোগ করুন!',
  upcoming_header: 'আসন্ন',
  no_upcoming_appts: 'কোনো আসন্ন অ্যাপয়েন্টমেন্ট নেই',
  performance: 'কর্মক্ষমতা',
  patient_satisfaction: 'রোগীর সন্তুষ্টি',
  completion_rate: 'সম্পূর্ণ হওয়ার হার',
  response_time: 'প্রতিক্রিয়া সময়'
});

let content = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/doctor/DoctorDashboardContent.jsx', 'utf8');

if (!content.includes('useTranslation')) {
    content = content.replace('import React, { useEffect, useState } from "react";', 'import React, { useEffect, useState } from "react";\nimport { useTranslation } from "react-i18next";');
    content = content.replace('const searchParams = useSearchParams();', 'const searchParams = useSearchParams();\n  const { t } = useTranslation();');
}

content = content.replace(/Good evening, /g, "{t('doctorDashboard.good_evening')}, ");
content = content.replace(/>\s*Chats\s*<\/Button>/g, ">\n                    {t('doctorDashboard.chats')}\n                  </Button>");
content = content.replace(/Update Availability/g, "{t('doctorDashboard.update_availability')}");

content = content.replace(/title: "Total Patients"/g, "title: t('doctorDashboard.total_patients')");
content = content.replace(/title: "Today's Appointments"/g, "title: t('doctorDashboard.todays_appointments')");
content = content.replace(/title: "Total Revenue"/g, "title: t('doctorDashboard.total_revenue')");
content = content.replace(/title: "Completed"/g, "title: t('doctorDashboard.completed_stats')");
content = content.replace(/from last year/g, "{t('doctorDashboard.from_last_year')}");

content = content.replace(/<span>Today's Schedule<\/span>/g, "<span>{t('doctorDashboard.todays_schedule')}</span>");
content = content.replace(/appointments\s*<\/Badge>/g, " {t('doctorDashboard.appointments')}\n                  </Badge>");
content = content.replace(/View All/g, "{t('doctorDashboard.view_all')}");
content = content.replace(/Age: /g, "{t('doctorDashboard.age')} ");
content = content.replace(/Start\s*<\/Button>/g, "{t('doctorDashboard.start')}\n                              </Button>");
content = content.replace(/No appointment today/g, "{t('doctorDashboard.no_appt_today')}");
content = content.replace(/Enjoy your free day!/g, "{t('doctorDashboard.enjoy_free_day')}");

content = content.replace(/<span>Upcoming<\/span>/g, "<span>{t('doctorDashboard.upcoming_header')}</span>");
content = content.replace(/No upcoming appointments/g, "{t('doctorDashboard.no_upcoming_appts')}");

content = content.replace(/<span>Performance<\/span>/g, "<span>{t('doctorDashboard.performance')}</span>");
content = content.replace(/Patient Satisfaction/g, "{t('doctorDashboard.patient_satisfaction')}");
content = content.replace(/Completion Rate/g, "{t('doctorDashboard.completion_rate')}");
content = content.replace(/Response Time/g, "{t('doctorDashboard.response_time')}");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/doctor/DoctorDashboardContent.jsx', content);

console.log("DoctorDashboard Done");
