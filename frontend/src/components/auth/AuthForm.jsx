// src/components/auth/AuthForm.tsx
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';
import { userAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthForm = ({ type, userRole }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    registerPatient,
    registerDoctor,
    loginPatient,
    loginAnonymousPatient,
    loginDoctor,
    loading,
    error
  } = userAuthStore();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'signup' && !agreeToTerms) return;

    try {
      if (type === 'signup') {
        if (userRole === 'doctor') {
          await registerDoctor({
            name: formData.name,
            email: formData.email,
            password: formData.password
          });
        } else {
          await registerPatient({
            name: formData.name,
            email: formData.email,
            password: formData.password
          });
        }
        router.push(`/onboarding/${userRole}`);
      } else {
        if (userRole === 'doctor') {
          await loginDoctor(formData.email, formData.password);
          router.push('/doctor/dashboard');
        } else {
          await loginPatient(formData.email, formData.password);
          router.push('/patient/dashboard');
        }
      }
    } catch (err) {
      console.log(err);
      console.error(`${type} failed:`, err);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${BASE_URL}/auth/google?type=${userRole}`;
  };

  const handleAnonymousLogin = async () => {
    try {
      await loginAnonymousPatient();
      router.push('/patient/dashboard');
    } catch (err) {
      console.error('Anonymous login failed:', err);
    }
  };

  const isSignup = type === 'signup';
  const title = isSignup ? t('authForm.create_account') : t('authForm.welcome_back');
  const buttonText = isSignup ? t('authForm.btn_create') : t('authForm.btn_signin');
  const altLinkText = isSignup ? t('authForm.already_member') : t('authForm.no_account');
  const altLinkAction = isSignup ? t('authForm.sign_in') : t('authForm.sign_up');
  const altLinkPath = isSignup ? `/login/${userRole}` : `/signup/${userRole}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900">CARE360</h1>
      </div>

      <Card className="border-0 shadow-xl">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

          {error &&
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          }

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field for signup */}
            {isSignup &&
            <div className="space-y-2">
                <Label htmlFor="name">{t("authForm.full_name")}</Label>
                <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-600 focus-visible:ring-0"
                required />
              
              </div>
            }

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("authForm.email")}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-600 focus-visible:ring-0"
                required />
              
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("authForm.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-600 focus-visible:ring-0 pr-10"
                  required />
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}>
                  
                  {showPassword ?
                  <EyeOff className="h-4 w-4 text-gray-400" /> :

                  <Eye className="h-4 w-4 text-gray-400" />
                  }
                </Button>
              </div>
            </div>

            {/* Terms checkbox for signup */}
            {isSignup &&
            <div className="flex items-start space-x-2">
                <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked)} />
              
                <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
                  {t('authForm.terms_text')} {' '}
                  <Link href="#" className="text-blue-600 hover:underline">{t('authForm.terms')}</Link> {t('authForm.and')} {' '}
                  <Link href="#" className="text-blue-600 hover:underline">{t('authForm.privacy')}</Link>.
                </label>
              </div>
            }

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-full py-3"
              disabled={loading || isSignup && !agreeToTerms}>
              
              {loading ? (type === 'signup' ? t('authForm.creating') : t('authForm.signing')) : buttonText}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex justify-center">
                <span className="bg-white px-2 text-gray-500 text-sm">{t("authForm.or")}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full border-gray-300"
                onClick={handleGoogleAuth}>
                
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {isSignup ? t('authForm.sign_up_google') : t('authForm.sign_in_google')}
              </Button>

              {userRole === 'patient' && (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium border border-gray-200 mt-2"
                  onClick={handleAnonymousLogin}
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500"><path d="M2 12a10 10 0 0 1 17.3-7.1L12 12l7.1 7.1A10 10 0 1 1 2 12z"/></svg>
                  {t('authForm.access_anon')}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-600">{altLinkText} </span>
            <Link
              href={altLinkPath}
              className="text-blue-600 hover:underline font-medium">
              
              {altLinkAction}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;