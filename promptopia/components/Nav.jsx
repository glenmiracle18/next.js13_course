'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

import React from 'react'

const Nav = () => {
  // logIn/SignIn logic with auth providers like google
  const isUserLoggedIn = true;
  const [providers, setProviders ] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-4'>
      <Link href='/' className='flex gap-2 flex-center'>
        {/* logo image */}
        <Image 
          src='/assets/images/logo.svg'
          alt='Promptopia Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        {/* logo text */}
        <p className="logo_text">
          Promptopia
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          // This is the condition for when a user is already signedIn
          <div className="flex gap-3 md:gap-5">
            {/* create post btn */}
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            {/* cign out btn */}
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            {/* profile image */}
            <Link href='/profile'>
              <Image 
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ): ( 
          // this is condition for when the isUserLoggedIn is false
          <>

          </>
        )}
      </div>
    </nav>
  )
}

export default Nav