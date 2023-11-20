'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

import React from 'react'

const Nav = () => {
  // logIn/SignIn logic with auth providers like google
  const { data: session } = useSession();
  const [providers, setProviders ] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
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
        {session?.user ?(
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
                src={session?.user.image}
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
            {providers && 
              Object.values(providers).map((provider) => (
                  <button type='button' key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                  >
                    Sign In
                  </button>
                )
              )
            }
          </>
        )}
        </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((prev) => 
                !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link 
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link 
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ): (
          <>
          {providers && 
            Object.values(providers).map((provider) => (
                <button type='button' key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
                >
                  Sign In
                </button>
              ))
          }
        </>
        )}
      </div>
    </nav>
  )
}

export default Nav