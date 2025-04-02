"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import AuthForm from '@/app/components/AuthForm';
import { ROUTES } from '@/app/utils/constant';



export default function Login() {
  const router = useRouter();

  const handleLogin = async (email : string, password : string) => {
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.ok) router.push(ROUTES.DASHBOARD);
    else alert('Invalid credentials');
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
