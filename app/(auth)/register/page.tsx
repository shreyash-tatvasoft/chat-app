"use client"

import AuthForm from '@/app/components/AuthForm';
import { ROUTES } from '@/app/utils/constant';
import { useRouter } from 'next/navigation';

export default function Register() {

  const router = useRouter()

  const handleRegister = async (email : string, password: string, username?: string)  => {

    const form = {
        username,
        email,
        password
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok){
      alert('Registered Successfully')
      router.push(ROUTES.LOGIN)
    }
    else alert('Error in Registration');
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
