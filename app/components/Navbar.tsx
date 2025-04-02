"use client"
import React from 'react'
import ThemeToggle from './ThemeToggle';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { ROUTES } from '../utils/constant';

const Navbar = () => {

    const { data : session} = useSession()
    const router = useRouter()
    const signedInUSerName = session && session.user ? session.user.name : ""

    const handleLogout = async () => {
        await signOut({ redirect: false }); // Logs out without refreshing
        router.push(ROUTES.LOGIN); // Redirects to login page
      };

  return (
    <div>
      <header className="bg-blue-100 dark:bg-gray-800 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl dark:text-white font-bold">ChatHub</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center mr-16 gap-5">
             {signedInUSerName !== "" && <p className='dark:text-white font-semibold'>Singed in as <strong className="capitalize font-bold">{signedInUSerName}</strong></p>}
             {signedInUSerName !== "" && <div className='dark:text-white font-semibold cursor-pointer underline' onClick={handleLogout}>Logout</div>}
          </nav>

          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}

export default Navbar