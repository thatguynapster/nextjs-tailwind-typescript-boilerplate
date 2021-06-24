import AuthContext from '../context/auth-context'
import authReducer from '../reducers/auth-reducer'
import React, { useReducer, useState, useEffect, ReactNode, FC } from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader'
import { IAuthPayload } from '../types'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false, token: '', data: {} })
  const [ready, setReady] = useState<boolean>(false)

  const loginFunction = (payload: IAuthPayload) => {
    // console.log('Loggin in...')
    return dispatch({ type: 'LOGIN', payload: payload })
  }

  const logoutFunction = () => {
    // console.log('Loggin out...')
    return dispatch({ type: 'LOGOUT' })
  }

  const refreshFunction = (payload: IAuthPayload) => {
    // console.log('Refreshing session...')
    // console.log(payload)
    return dispatch({ type: 'REFRESH', payload: payload })
  }

  async function initialize() {
    try {
      const authCookie = Cookie.get('loggedIn')
      // const authCookie = sessionStorage.getItem('loggedIn')
      // const userSession = Cookie.get('client')
      const userSession = sessionStorage.getItem('client')
      // console.log(authCookie)
      // console.log(userSession)

      if (authCookie === 'true' && userSession) {
        // console.log('cookie mission successful: ', authCookie)
        const newState = {
          isLoggedIn: true,
          token: JSON.parse(userSession).token,
          data: {
            user_id: JSON.parse(userSession).data.user_id,
            name: JSON.parse(userSession).data.name,
            email: JSON.parse(userSession).data.email,
            phone_number: JSON.parse(userSession).data.phone_number,
            image: JSON.parse(userSession).data.image,
            role: JSON.parse(userSession).data.role
          }
        }

        refreshFunction(newState)
        setReady(true)
      } else {
        // console.log('cookie mission failed')
        setReady(true)
        throw 'Cookies not set'
      }
    } catch (error) {
      console.log(error)
      setReady(true)
    }
  }

  useEffect(() => {
    // console.log(state)
    initialize()
  }, [])

  return (
    <Loader loaded={ready}>
      <AuthContext.Provider
        value={{ GLOBAL_OBJ: state, AUTH_LOGIN: loginFunction, AUTH_LOGOUT: logoutFunction }}
      >
        {children}
      </AuthContext.Provider>
    </Loader>
  )
}

export default AuthProvider
