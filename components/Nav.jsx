"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);


  useEffect(() => {
    const setUpProviders = async() => {
        const reponse = await getProviders();
        setProviders(reponse);
    }

    setUpProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
        src='/assets/images/logo.svg'
        width={50}
        height={50}
        className='object-contain'
        alt='an_image'
        />

        <p className='logo_text'>Next js Demo</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'> 
            <Link href = 'create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button
              type='button'
              onClick = {signOut}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href = '/profile'>
              <Image
                src={session?.user.image}
                width={50}
                height={50}
                className='rounded-full'
                alt = 'an_image'
              />
            </Link>
          </div>
        ): (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type = 'button'
                  key = {provider.name}
                  onClick={()=> signIn(provider.id)}
                  className='black_btn'>
                  Sign in with {provider.name}
                </button>
              ))
            }
          </>
        )
        }
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
              <Image
                src={session?.user.image}
                width={50}
                height={50}
                className='rounded-full'
                onClick={() => setToggleDropdown((prev) => !prev)}
                alt = 'an_image'
              />

              {toggleDropdown && (
                <div className='dropdown'> 
                  <Link
                    href = '/profile'
                    class= 'dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href = '/create-prompt'
                    class= 'dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>

                  <button
                    type = 'button'
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sign out
                  </button>
                </div>
              )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type = 'button'
                  key = {provider.name}
                  onClick={()=> signIn(provider.id)}
                  className='black_btn'>
                  Sign in (mobile)
                </button>
              ))
              }
          </> 
        ) 
          }
      </div>
    </nav>
  )
}

export default Nav