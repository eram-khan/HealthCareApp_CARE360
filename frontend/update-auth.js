const fs = require('fs');

const updateJson = (path, newObj) => {
  const data = JSON.parse(fs.readFileSync(path));
  data.authForm = newObj;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/en/common.json', {
  create_account: 'Create a secure account',
  welcome_back: 'Welcome back',
  btn_create: 'Create account',
  btn_signin: 'Sign in',
  already_member: 'Already a member?',
  no_account: "Don't have an account?",
  sign_in: 'Sign in',
  sign_up: 'Sign up',
  full_name: 'Full Name',
  email: 'Email',
  password: 'Password',
  terms_text: "I confirm that I am over 18 years old and agree to CARE360's",
  terms: 'Terms',
  and: 'and',
  privacy: 'Privacy Policy',
  creating: 'Creating in...',
  signing: 'Signing in...',
  or: 'OR',
  sign_up_google: 'Sign up with Google',
  sign_in_google: 'Sign in with Google',
  access_anon: 'Access Anonymously (Emergency)'
});

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/hi/common.json', {
  create_account: 'एक सुरक्षित खाता बनाएं',
  welcome_back: 'वापसी पर स्वागत है',
  btn_create: 'खाता बनाएं',
  btn_signin: 'साइन इन करें',
  already_member: 'क्या आप पहले से सदस्य हैं?',
  no_account: 'क्या आपके पास खाता नहीं है?',
  sign_in: 'साइन इन करें',
  sign_up: 'साइन अप करें',
  full_name: 'पूरा नाम',
  email: 'ईमेल',
  password: 'पासवर्ड',
  terms_text: 'मैं पुष्टि करता हूँ कि मेरी आयु 18 वर्ष से अधिक है और मैं CARE360 की सहमति देता हूँ',
  terms: 'शर्तें',
  and: 'और',
  privacy: 'गोपनीयता नीति',
  creating: 'बन रहा है...',
  signing: 'साइन इन हो रहा है...',
  or: 'या',
  sign_up_google: 'Google के साथ साइन अप करें',
  sign_in_google: 'Google के साथ साइन इन करें',
  access_anon: 'गुमनाम रूप से पहुँचें (आपातकाल)'
});

updateJson('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/public/locales/bn/common.json', {
  create_account: 'একটি নিরাপদ অ্যাকাউন্ট তৈরি করুন',
  welcome_back: 'স্বাগতম ফিরে আসার জন্য',
  btn_create: 'অ্যাকাউন্ট তৈরি করুন',
  btn_signin: 'সাইন ইন করুন',
  already_member: 'ইতিমধ্যেই একজন সদস্য?',
  no_account: 'কোনো অ্যাকাউন্ট নেই?',
  sign_in: 'সাইন ইন করুন',
  sign_up: 'সাইন আপ করুন',
  full_name: 'পুরো নাম',
  email: 'ইমেইল',
  password: 'পাসওয়ার্ড',
  terms_text: 'আমি নিশ্চিত করছি যে আমার বয়স ১৮ বছরের বেশি এবং আমি CARE360-এর সম্মত হচ্ছি',
  terms: 'শর্তাবলী',
  and: 'এবং',
  privacy: 'গোপনীয়তা নীতি',
  creating: 'তৈরি করা হচ্ছে...',
  signing: 'সাইন ইন করা হচ্ছে...',
  or: 'অথবা',
  sign_up_google: 'Google এর সাথে সাইন আপ করুন',
  sign_in_google: 'Google এর সাথে সাইন ইন করুন',
  access_anon: 'বেনামে অ্যাক্সেস করুন (জরুরী অবস্থা)'
});

// Update AuthForm.jsx
let authContent = fs.readFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/auth/AuthForm.jsx', 'utf8');

if (!authContent.includes('useTranslation')) {
    authContent = authContent.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { useTranslation } from 'react-i18next';");
    authContent = authContent.replace("const AuthForm = ({ type, userRole }) => {", "const AuthForm = ({ type, userRole }) => {\n  const { t } = useTranslation();");
}

authContent = authContent.replace("const title = isSignup ? 'Create a secure account' : 'Welcome back';", "const title = isSignup ? t('authForm.create_account') : t('authForm.welcome_back');");
authContent = authContent.replace("const buttonText = isSignup ? 'Create account' : 'Sign in';", "const buttonText = isSignup ? t('authForm.btn_create') : t('authForm.btn_signin');");
authContent = authContent.replace(/const altLinkText = isSignup \? 'Already a member\?' : "Don't have an account\?";/, "const altLinkText = isSignup ? t('authForm.already_member') : t('authForm.no_account');");
authContent = authContent.replace("const altLinkAction = isSignup ? 'Sign in' : 'Sign up';", "const altLinkAction = isSignup ? t('authForm.sign_in') : t('authForm.sign_up');");

authContent = authContent.replace(/<Label htmlFor="name">Full Name<\/Label>/g, '<Label htmlFor="name">{t("authForm.full_name")}</Label>');
authContent = authContent.replace(/<Label htmlFor="email">Email<\/Label>/g, '<Label htmlFor="email">{t("authForm.email")}</Label>');
authContent = authContent.replace(/<Label htmlFor="password">Password<\/Label>/g, '<Label htmlFor="password">{t("authForm.password")}</Label>');

authContent = authContent.replace(/I confirm that I am over 18 years old and agree to CARE360's\{' '\}/, "{t('authForm.terms_text')} {' '}");
authContent = authContent.replace(/>Terms<\/Link> and\{' '\}/, ">{t('authForm.terms')}</Link> {t('authForm.and')} {' '}");
authContent = authContent.replace(/>Privacy Policy<\/Link>/, ">{t('authForm.privacy')}</Link>");

authContent = authContent.replace(/\{loading \? `\$\{type === 'signup' \? 'Creating' : 'Signing'\} in\.\.\.` : buttonText\}/, "{loading ? (type === 'signup' ? t('authForm.creating') : t('authForm.signing')) : buttonText}");

authContent = authContent.replace(/<span className="bg-white px-2 text-gray-500 text-sm">OR<\/span>/, '<span className="bg-white px-2 text-gray-500 text-sm">{t("authForm.or")}</span>');

authContent = authContent.replace(/\{isSignup \? 'Sign up' : 'Sign in'\} with Google/, "{isSignup ? t('authForm.sign_up_google') : t('authForm.sign_in_google')}");

authContent = authContent.replace(/Access Anonymously \(Emergency\)/, "{t('authForm.access_anon')}");

fs.writeFileSync('c:/Users/ERAM KHAN/OneDrive/Documents/CARE360/doctor-consultation-app/frontend/src/components/auth/AuthForm.jsx', authContent);

console.log("AuthForm Done");
