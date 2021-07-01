import Link from 'next/link'
import Loader from 'react-loader'
import React, { ChangeEvent, FC, ReactNode, useContext, useEffect, useState, useRef } from 'react'
import { IUserProps } from '../types'
import { Autocomplete, LoadScriptNext } from '@react-google-maps/api'
import { toast } from 'react-toastify'
import API from '../lib/api'
import { navigate } from '../lib'
import AuthContext from '../context/auth-context'

/** Navbar component */
export const Navbar: FC<IUserProps> = ({ name, image }) => {
  const [show, setShow] = useState<boolean>(false)
  const { GLOBAL_OBJ, AUTH_LOGOUT } = useContext(AuthContext)

  useEffect(() => {
    !GLOBAL_OBJ?.isLoggedIn && navigate('./')
  }, [GLOBAL_OBJ])

  return (
    <nav className="py-2 px-1 fixed flex flex-row items-center w-full bg-white">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <div>{/*<img src={image} style={{width: '52px'}} />*/}</div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <small className="font-bold">{name}</small>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              borderRadius: '50%',
              marginLeft: '1em'
            }}
            onClick={() => setShow(!show)}
          ></div>
          {show ? (
            <ProfileContextMenu>
              <div className="py-1" role="none">
                <Link href={`/profile`}>
                  <p
                    className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    View Profile
                  </p>
                </Link>

                <p
                  className="block font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  style={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    AUTH_LOGOUT()
                    // navigate('./index-new')
                  }}
                >
                  Logout
                </p>
              </div>
            </ProfileContextMenu>
          ) : (
            ' '
          )}
        </div>
      </div>
    </nav>
  )
}

export const ProfileContextMenu: FC<ReactNode> = ({ children }) => {
  return (
    <div
      className="text-right origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      role="menu"
      style={{ top: '40px', right: '5px' }}
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      {children}
    </div>
  )
}
