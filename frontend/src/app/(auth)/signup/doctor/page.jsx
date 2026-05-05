import AuthForm from "@/components/auth/AuthForm";


export const metadata = {
  title: 'Join CARE360 as Healthcare Provider',
  description: 'Register as a healthcare provider on CARE360 to offer online consultations.'
};


export default function DoctorSignUpPage() {
  return <AuthForm type='signup' userRole='doctor' />;
}