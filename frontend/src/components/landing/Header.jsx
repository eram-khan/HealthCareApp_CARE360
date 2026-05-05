"use client";
import {
  Bell,
  Calendar,
  LogOut,
  Settings,
  Stethoscope,
  User,
  MessageSquare,
  Menu } from
"lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
"../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { userAuthStore } from "@/store/authStore";
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from "react-i18next";

const Header = ({ showDashboardNav = false }) => {
  const { user, isAuthenticated, logout } = userAuthStore();
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getDashboardNavigation = () => {
    if (!user || !showDashboardNav) return [];

    if (user?.type === "patient") {
      return [
      {
        lable: t('navigation.appointments'),
        icon: Calendar,
        href: "/patient/dashboard",
        active: pathname?.includes("/patient/dashboard") || false
      },
      {
        lable: t('navigation.chats_ai'),
        icon: MessageSquare,
        href: "/patient/chat",
        active: pathname?.includes("/patient/chat") || false
      }];

    } else if (user?.type === "doctor") {
      return [
      {
        lable: t('navigation.dashboard'),
        icon: Calendar,
        href: "/doctor/dashboard",
        active: pathname?.includes("/doctor/dashboard") || false
      },
      {
        lable: t('navigation.appointments'),
        icon: Calendar,
        href: "/doctor/appointments",
        active: pathname?.includes("/doctor/appointments") || false
      },
      {
        lable: t('navigation.chat'),
        icon: MessageSquare,
        href: "/doctor/chat",
        active: pathname?.includes("/doctor/chat") || false
      }];

    }
    return [];
  };
  return (
    <header className="border-b bg-white/95 backdrop:blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side -> logo  + navigation */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/" className="flex items-center space-x-1 md:space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>

            <div className="text-xl md:text-2xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent hidden sm:block">
              CARE360
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center ml-2 space-x-1">
            <Link href="/clinics"><Button variant="ghost" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors px-2">{t('navigation.clinics')}</Button></Link>
            <Link href="/patient/chat"><Button variant="ghost" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors px-2">{t('navigation.chat')}</Button></Link>
            {(!isAuthenticated || user?.type !== 'doctor') && (
              <Link href="/emergency"><Button variant="ghost" className="text-gray-700 hover:text-red-600 font-medium text-sm transition-colors px-2">{t('navigation.emergency')}</Button></Link>
            )}
            <Link href="/ngos"><Button variant="ghost" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors px-2">{t('navigation.ngos')}</Button></Link>
            <Link href="/health-resources"><Button variant="ghost" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors px-2">{t('navigation.resources')}</Button></Link>
            {(!isAuthenticated || user?.type !== 'doctor') && (
              <Link href="/contact"><Button variant="ghost" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors px-2">{t('navigation.contact')}</Button></Link>
            )}
          </div>

          {/* Mobile Navigation Dropdown */}
          <div className="lg:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <Menu className="w-6 h-6 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 mt-2 rounded-xl shadow-lg border-gray-100">
                <DropdownMenuLabel className="text-xs text-gray-500 uppercase tracking-wider">Pages</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/clinics" className="w-full cursor-pointer py-2">{t('navigation.clinics')}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/patient/chat" className="w-full cursor-pointer py-2">{t('navigation.chat')}</Link></DropdownMenuItem>
                {(!isAuthenticated || user?.type !== 'doctor') && (
                  <DropdownMenuItem asChild><Link href="/emergency" className="w-full cursor-pointer py-2 text-red-600 font-medium">{t('navigation.emergency')}</Link></DropdownMenuItem>
                )}
                <DropdownMenuItem asChild><Link href="/ngos" className="w-full cursor-pointer py-2">{t('navigation.ngos')}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/health-resources" className="w-full cursor-pointer py-2">{t('navigation.resources')}</Link></DropdownMenuItem>
                {(!isAuthenticated || user?.type !== 'doctor') && (
                  <DropdownMenuItem asChild><Link href="/contact" className="w-full cursor-pointer py-2">{t('navigation.contact')}</Link></DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Dashboard navigation inline logic (if applicable) */}
          {isAuthenticated && showDashboardNav &&
          <nav className="hidden xl:flex items-center space-x-4 ml-6">
              {getDashboardNavigation().map((item) =>
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-1 transition-colors ${item.active ?
              "text-blue-600 font-semibold" :
              "text-gray-600 hover:text-blue-600"}`
              }>
              
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.lable}</span>
                </Link>
            )}
            </nav>
          }
        </div>

        {/* Right side -> User Actions / Auth */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <LanguageSelector />
          {isAuthenticated ? (
            <>
              {/* Notification Bell */}
              {showDashboardNav && (
                <Button variant="ghost" size="sm" className="relative hidden md:flex">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 hover:bg-red-600">4</Badge>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2 hover:bg-gray-100/50">
                    <Avatar className="w-8 h-8 md:w-9 md:h-9">
                      <AvatarImage src={user?.profileImage} alt={user?.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold">{user?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.type}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.profileImage} alt={user?.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">{user?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user?.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[140px]">{user?.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!showDashboardNav && (
                    <DropdownMenuItem asChild>
                      <Link href={`/${user?.type}/dashboard`} className="flex items-center cursor-pointer py-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {t('navigation.dashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href={`/${user?.type}/profile`} className="flex items-center cursor-pointer py-2">
                      <User className="w-4 h-4 mr-2" />
                      {t('auth.profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${user?.type}/settings`} className="flex items-center cursor-pointer py-2">
                      <Settings className="w-4 h-4 mr-2" />
                      {t('auth.settings')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer py-2 hover:bg-red-50 focus:bg-red-50">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('auth.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link href="/login/patient">
                <Button variant="ghost" className="text-blue-900 font-medium hover:text-blue-700 px-3 sm:px-4">
                  {t('auth.login')}
                </Button>
              </Link>
              <Link href="/signup/patient" className="hidden sm:block">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 font-medium hover:from-blue-700 hover:to-blue-800 rounded-full px-5 sm:px-6 shadow-sm hover:shadow-md transition-all">
                  {t('auth.book_consultation')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;