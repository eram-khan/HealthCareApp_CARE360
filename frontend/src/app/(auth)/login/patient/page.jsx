import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: 'Patient Login - CARE360',
  description: 'Sign in to your CARE360 account to access healthcare consultations.'
};

export default function PatientLoginPage() {
  return <AuthForm type='login' userRole='patient' />;
}