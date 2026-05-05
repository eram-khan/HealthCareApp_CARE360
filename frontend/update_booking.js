const fs = require('fs');

const updateJson = (path, newObj) => {
  const data = JSON.parse(fs.readFileSync(path));
  data.bookingFlow = newObj;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/en/common.json', {
  choose_doctor: "Choose your doctor",
  find_perfect: "Find the perfect healthcare provider for your needs",
  search_placeholder: "Search doctors by name , specialization, or condition...",
  filters: "Filters",
  browse_category: "Browse by Category",
  all_categories: "All Categories",
  advanced_filters: "Advanced Filters",
  specialization: "Specialization",
  all_specializations: "All specializations",
  all_specializations_opt: "All Specializations",
  location: "Location",
  all_locations: "All locations",
  sort_by: "Sort by",
  experience: "Experience",
  fees: "Consultation Fee",
  name_az: "Name (A-Z)",
  newest: "Newest First",
  clear_all: "Clear All Filters",
  searching: "Seaching...",
  doctors_found: "doctor found",
  popular: "Popular",
  book_appointment: "Book Appointment",
  no_doctors_found: "No doctors found",
  adjust_filters: "Try adjusting your filters or search criteria",
  select_date_time: "Select Date & Time",
  choose_date: "Choose Date",
  available_slots: "Available Time Slots",
  slots_available: "slots avaiable",
  past: "Past",
  booked: "Booked",
  show_more: "show more",
  show_less: "Show Less",
  no_slots: "No slots available",
  diff_date: "Please Select a different date",
  select_to_view: "Please Select a date to view available slots",
  continue: "Continue",
  consultation_details: "Consultation Details",
  select_consultation: "Select Consultation Type",
  recommended: "Recommended",
  save: "Save",
  selected_consultation: "Selected Consultation:",
  describe_symptoms: "Describe your symptoms or concerns *",
  symptoms_placeholder: "Please describe what brings you to see the doctor today...",
  back: "Back",
  continue_payment: "Continue to Payment",
  booking_confirmation: "Booking & Confirmation",
  booking_summary: "Booking Summary",
  date_time: "Date & Time",
  consultation_type: "Consultation Type",
  doctor: "Doctor",
  duration: "Duration",
  minutes: "minutes",
  platform_fee: "Platform Fee",
  total_amount: "Total Amount",
  secure_booking: "Secure Booking",
  secure_desc: "Your appointment will be confirmed immediately",
  booking_progress: "Booking Appointment...",
  verified: "Verified",
  about: "About",
  hospital_clinic: "Hospital/Clinic",
  minutes_session: "minutes session",
  new_doctor: "New Doctor"
});

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/hi/common.json', {
  choose_doctor: "अपना डॉक्टर चुनें",
  find_perfect: "अपनी आवश्यकताओं के लिए सही स्वास्थ्य सेवा प्रदाता खोजें",
  search_placeholder: "नाम, विशेषज्ञता या स्थिति के अनुसार डॉक्टर खोजें...",
  filters: "फिल्टर",
  browse_category: "श्रेणी के अनुसार ब्राउज़ करें",
  all_categories: "सभी श्रेणियां",
  advanced_filters: "उन्नत फिल्टर",
  specialization: "विशेषज्ञता",
  all_specializations: "सभी विशेषज्ञता",
  all_specializations_opt: "सभी विशेषज्ञता",
  location: "स्थान",
  all_locations: "सभी स्थान",
  sort_by: "इसके अनुसार क्रमबद्ध करें",
  experience: "अनुभव",
  fees: "परामर्श शुल्क",
  name_az: "नाम (A-Z)",
  newest: "सबसे नया पहले",
  clear_all: "सभी फ़िल्टर साफ़ करें",
  searching: "खोज रहा है...",
  doctors_found: "डॉक्टर मिले",
  popular: "लोकप्रिय",
  book_appointment: "परामर्श बुक करें",
  no_doctors_found: "कोई डॉक्टर नहीं मिला",
  adjust_filters: "अपने फ़िल्टर या खोज मानदंड समायोजित करने का प्रयास करें",
  select_date_time: "दिनांक और समय चुनें",
  choose_date: "दिनांक चुनें",
  available_slots: "उपलब्ध समय स्लॉट",
  slots_available: "स्लॉट उपलब्ध",
  past: "अतीत",
  booked: "बुक किया गया",
  show_more: "और दिखाएं",
  show_less: "कम दिखाएं",
  no_slots: "कोई स्लॉट उपलब्ध नहीं है",
  diff_date: "कृपया एक अलग तारीख चुनें",
  select_to_view: "उपलब्ध स्लॉट देखने के लिए कृपया एक तारीख चुनें",
  continue: "जारी रखें",
  consultation_details: "परामर्श विवरण",
  select_consultation: "परामर्श प्रकार चुनें",
  recommended: "अनुशंसित",
  save: "बचत",
  selected_consultation: "चयनित परामर्श:",
  describe_symptoms: "अपने लक्षणों या चिंताओं का वर्णन करें *",
  symptoms_placeholder: "कृपया वर्णन करें कि आज आप डॉक्टर को क्यों दिखाना चाहते हैं...",
  back: "पीछे",
  continue_payment: "भुगतान के लिए जारी रखें",
  booking_confirmation: "बुकिंग और पुष्टि",
  booking_summary: "बुकिंग सारांश",
  date_time: "दिनांक और समय",
  consultation_type: "परामर्श का प्रकार",
  doctor: "डॉक्टर",
  duration: "अवधि",
  minutes: "मिनट",
  platform_fee: "प्लेटफ़ॉर्म शुल्क",
  total_amount: "कुल राशि",
  secure_booking: "सुरक्षित बुकिंग",
  secure_desc: "आपकी नियुक्ति की तुरंत पुष्टि की जाएगी",
  booking_progress: "परामर्श बुक हो रहा है...",
  verified: "सत्यापित",
  about: "के बारे में",
  hospital_clinic: "अस्पताल/क्लीनिक",
  minutes_session: "मिनट सत्र",
  new_doctor: "नए डॉक्टर"
});

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/bn/common.json', {
  choose_doctor: "আপনার ডাক্তার নির্বাচন করুন",
  find_perfect: "আপনার প্রয়োজনের জন্য সঠিক স্বাস্থ্যসেবা প্রদানকারী খুঁজুন",
  search_placeholder: "নাম, বিশেষত্ব বা অবস্থা অনুযায়ী ডাক্তার খুঁজুন...",
  filters: "ফিল্টার",
  browse_category: "বিভাগ দ্বারা ব্রাউজ করুন",
  all_categories: "সব বিভাগ",
  advanced_filters: "উন্নত ফিল্টার",
  specialization: "বিশেষত্ব",
  all_specializations: "সকল বিশেষত্ব",
  all_specializations_opt: "সকল বিশেষত্ব",
  location: "অবস্থান",
  all_locations: "সব অবস্থান",
  sort_by: "সাজান",
  experience: "অভিজ্ঞতা",
  fees: "পরামর্শ ফি",
  name_az: "নাম (A-Z)",
  newest: "সবচেয়ে নতুন আগে",
  clear_all: "সমস্ত ফিল্টার সাফ করুন",
  searching: "খোঁজা হচ্ছে...",
  doctors_found: "ডাক্তার পাওয়া গেছে",
  popular: "জনপ্রিয়",
  book_appointment: "অ্যাপয়েন্টমেন্ট বুক করুন",
  no_doctors_found: "কোন ডাক্তার পাওয়া যায়নি",
  adjust_filters: "আপনার ফিল্টার বা অনুসন্ধানের মানদণ্ড সামঞ্জস্য করার চেষ্টা করুন",
  select_date_time: "তারিখ এবং সময় নির্বাচন করুন",
  choose_date: "তারিখ নির্বাচন করুন",
  available_slots: "উপলব্ধ সময় স্লট",
  slots_available: "স্লট উপলব্ধ",
  past: "অতীত",
  booked: "বুক করা হয়েছে",
  show_more: "আরও দেখান",
  show_less: "কম দেখান",
  no_slots: "কোন স্লট উপলব্ধ নেই",
  diff_date: "অনুগ্রহ করে একটি ভিন্ন তারিখ নির্বাচন করুন",
  select_to_view: "উপলব্ধ স্লট দেখতে অনুগ্রহ করে একটি তারিখ নির্বাচন করুন",
  continue: "চালিয়ে যান",
  consultation_details: "পরামর্শের বিবরণ",
  select_consultation: "পরামর্শের ধরন নির্বাচন করুন",
  recommended: "প্রস্তাবিত",
  save: "সঞ্চয়",
  selected_consultation: "নির্বাচিত পরামর্শ:",
  describe_symptoms: "আপনার উপসর্গ বা উদ্বেগ বর্ণনা করুন *",
  symptoms_placeholder: "অনুগ্রহ করে বর্ণনা করুন কেন আপনি আজ ডাক্তার দেখাতে চান...",
  back: "পিছনে",
  continue_payment: "পেমেন্ট চালিয়ে যান",
  booking_confirmation: "বুকিং এবং নিশ্চিতকরণ",
  booking_summary: "বুকিং সারাংশ",
  date_time: "তারিখ এবং সময়",
  consultation_type: "পরামর্শের ধরন",
  doctor: "ডাক্তার",
  duration: "সময়কাল",
  minutes: "মিনিট",
  platform_fee: "প্ল্যাটফর্ম ফি",
  total_amount: "মোট পরিমাণ",
  secure_booking: "নিরাপদ বুকিং",
  secure_desc: "আপনার অ্যাপয়েন্টমেন্ট অবিলম্বে নিশ্চিত করা হবে",
  booking_progress: "অ্যাপয়েন্টমেন্ট বুক করা হচ্ছে...",
  verified: "যাচাইকৃত",
  about: "সম্পর্কে",
  hospital_clinic: "হাসপাতাল/ক্লিনিক",
  minutes_session: "মিনিট সেশন",
  new_doctor: "নতুন ডাক্তার"
});

console.log("JSON done");

// 1. DoctorListPage
let doctorList = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/patient/DoctorListPage.jsx', 'utf8');
if (!doctorList.includes('useTranslation')) {
    doctorList = doctorList.replace('import React, { useEffect, useState } from "react";', 'import React, { useEffect, useState } from "react";\nimport { useTranslation } from "react-i18next";');
    doctorList = doctorList.replace('const categoryParams = searchParams.get("category");', 'const categoryParams = searchParams.get("category");\n  const { t } = useTranslation();');
}

doctorList = doctorList.replace(/>\s*Choose your doctor\s*<\/h1>/g, ">{t('bookingFlow.choose_doctor')}</h1>");
doctorList = doctorList.replace(/>\s*Find the perfect healthcare provider for your needs\s*<\/p>/g, ">{t('bookingFlow.find_perfect')}</p>");
doctorList = doctorList.replace(/placeholder="Search doctors by name , specialization, or condition..."/g, "placeholder={t('bookingFlow.search_placeholder')}");
doctorList = doctorList.replace(/>\s*Filters\s*/g, ">\n              {t('bookingFlow.filters')}\n              ");
doctorList = doctorList.replace(/>\s*Browse by Category\s*<\/h3>/g, ">{t('bookingFlow.browse_category')}</h3>");
doctorList = doctorList.replace(/>\s*All Categories\s*<\/Button>/g, ">\n                {t('bookingFlow.all_categories')}\n              </Button>");
doctorList = doctorList.replace(/>Advanced Filters<\/h3>/g, ">{t('bookingFlow.advanced_filters')}</h3>");

doctorList = doctorList.replace(/>\s*Specialization\s*<\/label>/g, ">{t('bookingFlow.specialization')}</label>");
doctorList = doctorList.replace(/placeholder="All specializations"/g, "placeholder={t('bookingFlow.all_specializations')}");
doctorList = doctorList.replace(/>All Specializations<\/SelectItem>/g, ">{t('bookingFlow.all_specializations_opt')}</SelectItem>");

doctorList = doctorList.replace(/>\s*Location\s*<\/label>/g, ">{t('bookingFlow.location')}</label>");
doctorList = doctorList.replace(/placeholder="All locations"/g, "placeholder={t('bookingFlow.all_locations')}");
doctorList = doctorList.replace(/>All locations<\/SelectItem>/g, ">{t('bookingFlow.all_locations')}</SelectItem>");

doctorList = doctorList.replace(/>\s*Sort by\s*<\/label>/g, ">{t('bookingFlow.sort_by')}</label>");
doctorList = doctorList.replace(/>Experience<\/SelectItem>/g, ">{t('bookingFlow.experience')}</SelectItem>");
doctorList = doctorList.replace(/>Consultation Fee<\/SelectItem>/g, ">{t('bookingFlow.fees')}</SelectItem>");
doctorList = doctorList.replace(/>Name \(A-Z\)<\/SelectItem>/g, ">{t('bookingFlow.name_az')}</SelectItem>");
doctorList = doctorList.replace(/>Newest First<\/SelectItem>/g, ">{t('bookingFlow.newest')}</SelectItem>");

doctorList = doctorList.replace(/>\s*Clear All Filters\s*<\/Button>/g, ">\n                    {t('bookingFlow.clear_all')}\n                  </Button>");

doctorList = doctorList.replace(/loading \? "Seaching..." : `\$\{doctors\.length\} doctor found`/g, "loading ? t('bookingFlow.searching') : `${doctors.length} ${t('bookingFlow.doctors_found')}`");

doctorList = doctorList.replace(/>\s*years experience\s*<\/p>/g, "> {t('bookingFlow.experience')}</p>");
doctorList = doctorList.replace(/>\s*Popular\s*<\/Badge>/g, ">\n                      <Star className=\"w-3 h-3 mr-1\" />\n                      {t('bookingFlow.popular')}\n                    </Badge>");
doctorList = doctorList.replace(/>\s*Consultation Fee:\s*<\/p>/g, ">{t('bookingFlow.fees')}:</p>");
doctorList = doctorList.replace(/>\s*Book Appointment\s*<\/Button>/g, ">\n                        {t('bookingFlow.book_appointment')}\n                    </Button>");

doctorList = doctorList.replace(/>No doctors found<\/h3>/g, ">{t('bookingFlow.no_doctors_found')}</h3>");
doctorList = doctorList.replace(/>Try adjusting your filters or search criteria<\/p>/g, ">{t('bookingFlow.adjust_filters')}</p>");
doctorList = doctorList.replace(/>Clear Filters<\/Button>/g, ">{t('bookingFlow.clear_all')}</Button>");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/patient/DoctorListPage.jsx', doctorList);
console.log("DoctorList done");

// 2. CalendarStep
let calendarStep = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/BookingSteps/CalendarStep.jsx', 'utf8');
if (!calendarStep.includes('useTranslation')) {
    calendarStep = calendarStep.replace('import React, { useState } from "react";', 'import React, { useState } from "react";\nimport { useTranslation } from "react-i18next";');
    calendarStep = calendarStep.replace('const [showMoreSlots, setShowMoreSlots] = useState(false);', 'const { t } = useTranslation();\n  const [showMoreSlots, setShowMoreSlots] = useState(false);');
}

calendarStep = calendarStep.replace(/>\s*Select Date & Time\s*<\/h3>/g, ">{t('bookingFlow.select_date_time')}</h3>");
calendarStep = calendarStep.replace(/>Choose Date<\/Label>/g, ">{t('bookingFlow.choose_date')}</Label>");
calendarStep = calendarStep.replace(/>\s*Available Time Slots\s*/g, ">\n                  {t('bookingFlow.available_slots')}\n                  ");
calendarStep = calendarStep.replace(/\(.*\s*slots avaiable\)/g, "({availableSlots.length} {t('bookingFlow.slots_available')})");
calendarStep = calendarStep.replace(/\(Past\)/g, "({t('bookingFlow.past')})");
calendarStep = calendarStep.replace(/\(Booked\)/g, "({t('bookingFlow.booked')})");
calendarStep = calendarStep.replace(/'Show Less' : `\+ \$\{availableSlots\.length - 10\} show more`/g, "t('bookingFlow.show_less') : `+ ${availableSlots.length - 10} ${t('bookingFlow.show_more')}`");

calendarStep = calendarStep.replace(/>\s*No slots available\s*<\/h4>/g, ">\n                                 {t('bookingFlow.no_slots')}\n                      </h4>");
calendarStep = calendarStep.replace(/>Please Select a different date<\/p>/g, ">{t('bookingFlow.diff_date')}</p>");
calendarStep = calendarStep.replace(/>Please Select a date to view available slots<\/p>/g, ">{t('bookingFlow.select_to_view')}</p>");
calendarStep = calendarStep.replace(/>\s*Continue\s*<\/Button>/g, ">\n            {t('bookingFlow.continue')}\n          </Button>");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/BookingSteps/CalendarStep.jsx', calendarStep);
console.log("CalendarStep done");

// 3. ConsultationStep
let consultationStep = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/BookingSteps/ConsultationStep.jsx', 'utf8');
if (!consultationStep.includes('useTranslation')) {
    consultationStep = consultationStep.replace('import React from "react";', 'import React from "react";\nimport { useTranslation } from "react-i18next";');
    consultationStep = consultationStep.replace('const getConsultationPrice = (selectedType = consultationType) => {', 'const { t } = useTranslation();\n  const getConsultationPrice = (selectedType = consultationType) => {');
}

consultationStep = consultationStep.replace(/>\s*Consultation Details\s*<\/h3>/g, ">\n          {t('bookingFlow.consultation_details')}\n        </h3>");
consultationStep = consultationStep.replace(/>\s*Select Consultation Type\s*<\/Label>/g, ">\n            {t('bookingFlow.select_consultation')}\n          </Label>");
consultationStep = consultationStep.replace(/>\s*Recommended\s*<\/Badge>/g, ">\n                        {t('bookingFlow.recommended')}\n                      </Badge>");
consultationStep = consultationStep.replace(/Save /g, "{t('bookingFlow.save')} ");
consultationStep = consultationStep.replace(/>\s*Selected Consultation:\s*<\/span>/g, ">\n              {t('bookingFlow.selected_consultation')}\n            </span>");
consultationStep = consultationStep.replace(/>\s*Describe your symptoms or concerns \*\s*<\/Label>/g, ">\n            {t('bookingFlow.describe_symptoms')}\n          </Label>");
consultationStep = consultationStep.replace(/placeholder="Please describe what brings you to see the doctor today..."/g, "placeholder={t('bookingFlow.symptoms_placeholder')}");
consultationStep = consultationStep.replace(/>\s*Back\s*<\/Button>/g, ">\n          {t('bookingFlow.back')}\n        </Button>");
consultationStep = consultationStep.replace(/>\s*Continue to Payment\s*<\/Button>/g, ">\n          {t('bookingFlow.continue_payment')}\n        </Button>");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/BookingSteps/ConsultationStep.jsx', consultationStep);
console.log("ConsultationStep done");

// 4. PayementStep
let payementStep = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/BookingSteps/PayementStep.jsx', 'utf8');
if (!payementStep.includes('useTranslation')) {
    payementStep = payementStep.replace('import React from "react";', 'import React from "react";\nimport { useTranslation } from "react-i18next";');
    payementStep = payementStep.replace('const platformFees = Math.round(consultationFee * 0.1);', 'const { t } = useTranslation();\n  const platformFees = Math.round(consultationFee * 0.1);');
}

payementStep = payementStep.replace(/>\s*Booking & Confirmation\s*<\/h3>/g, ">\n          {t('bookingFlow.booking_confirmation')}\n        </h3>");
payementStep = payementStep.replace(/>Booking Summary<\/h4>/g, ">{t('bookingFlow.booking_summary')}</h4>");
payementStep = payementStep.replace(/>Date & Time<\/span>/g, ">{t('bookingFlow.date_time')}</span>");
payementStep = payementStep.replace(/>Consultation Type<\/span>/g, ">{t('bookingFlow.consultation_type')}</span>");
payementStep = payementStep.replace(/>Doctor<\/span>/g, ">{t('bookingFlow.doctor')}</span>");
payementStep = payementStep.replace(/>Duration<\/span>/g, ">{t('bookingFlow.duration')}</span>");
payementStep = payementStep.replace(/>\{slotDuration\} minutes<\/span>/g, ">{slotDuration} {t('bookingFlow.minutes')}</span>");
payementStep = payementStep.replace(/>Consultation Fee<\/span>/g, ">{t('bookingFlow.fees')}</span>");
payementStep = payementStep.replace(/>Platform Fee<\/span>/g, ">{t('bookingFlow.platform_fee')}</span>");
payementStep = payementStep.replace(/>Total Amount<\/span>/g, ">{t('bookingFlow.total_amount')}</span>");
payementStep = payementStep.replace(/>Secure Booking<\/p>/g, ">{t('bookingFlow.secure_booking')}</p>");
payementStep = payementStep.replace(/>Your appointment will be confirmed immediately<\/p>/g, ">{t('bookingFlow.secure_desc')}</p>");
payementStep = payementStep.replace(/>\s*Back\s*<\/Button>/g, ">\n          {t('bookingFlow.back')}\n        </Button>");
payementStep = payementStep.replace(/>\s*Booking Appointment...\s*<\/span>/g, ">\n                {t('bookingFlow.booking_progress')}\n              </span>");
payementStep = payementStep.replace(/>Book Appointment<\/span>/g, ">{t('bookingFlow.book_appointment')}</span>");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/BookingSteps/PayementStep.jsx', payementStep);
console.log("PayementStep done");

// 5. DoctorProfile
let doctorProfile = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/BookingSteps/DoctorProfile.jsx', 'utf8');
if (!doctorProfile.includes('useTranslation')) {
    doctorProfile = doctorProfile.replace('import React from "react";', 'import React from "react";\nimport { useTranslation } from "react-i18next";');
    doctorProfile = doctorProfile.replace('const DoctorProfile = ({ doctor }) => {', 'const DoctorProfile = ({ doctor }) => {\n  const { t } = useTranslation();');
}

doctorProfile = doctorProfile.replace(/>\s*years experience\s*<\/p>/g, "> {t('bookingFlow.experience')}</p>");
doctorProfile = doctorProfile.replace(/>New Doctor<\/div>/g, ">{t('bookingFlow.new_doctor')}</div>");
doctorProfile = doctorProfile.replace(/>\s*Verified\s*<\/Badge>/g, ">\n                <Award className=\"w-3 h-3 mr-1\" />\n                {t('bookingFlow.verified')}\n              </Badge>");
doctorProfile = doctorProfile.replace(/>About<\/h3>/g, ">{t('bookingFlow.about')}</h3>");
doctorProfile = doctorProfile.replace(/>\s*Hospital\/Clinic\s*<\/h3>/g, ">\n                {t('bookingFlow.hospital_clinic')}\n              </h3>");
doctorProfile = doctorProfile.replace(/>\s*Consultation Fee\s*<\/p>/g, ">\n                {t('bookingFlow.fees')}\n              </p>");
doctorProfile = doctorProfile.replace(/>\s*\{doctor.slotDurationMinutes\} minutes session\s*<\/p>/g, ">\n                {doctor.slotDurationMinutes} {t('bookingFlow.minutes_session')}\n              </p>");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/BookingSteps/DoctorProfile.jsx', doctorProfile);
console.log("DoctorProfile done");

