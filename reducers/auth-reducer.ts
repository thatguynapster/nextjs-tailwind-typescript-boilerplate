import Cookie from 'js-cookie'
import { IAuthState, IAuthAction, IAuthPayload } from '../types'

const authReducer = (state: IAuthState, action: IAuthAction) => {
  // console.log(state)
  switch (action.type) {
    case 'LOGIN':
      // console.log("login here")
      // console.log(action.payload)
      let authenticated
      let userData = ''
      /**Authentication requests done here */
      try {
        Cookie.set('loggedIn', 'true', { expires: 1, sameSite: 'lax' })
        // sessionStorage.setItem('loggedIn', 'true')
        userData = JSON.stringify(action.payload)
        // Cookie.set('client', userData, { expires: 1, sameSite: 'lax' })
        sessionStorage.setItem('client', userData)

        //check rememberMe
        if (action.payload?.rememberMe) {
          const encodedUserData = btoa(userData)
          localStorage.setItem('client', encodedUserData)
        }
        // console.log('Cookies set')
        authenticated = true
      } catch (error) {
        console.log(error)
        authenticated = false
        userData = ''
      }

      /** Always return state */
      return {
        ...state,
        isLoggedIn: authenticated,
        token: action?.payload && action.payload.token,
        data: JSON.parse(userData).data
      }

    case 'REFRESH':
      // console.log(action.payload)

      /** Always return state */
      return {
        ...state,
        isLoggedIn: action?.payload && action.payload?.isLoggedIn,
        token: action?.payload && action.payload?.token,
        data: action?.payload && action.payload?.data
      }

    case 'LOGOUT':
      // console.log('loggin out...')
      /** Destroy all cookies or storage */
      Cookie.remove('loggedIn', { sameSite: 'lax' })
      // Cookie.remove('user', { sameSite: 'lax' })
      // Cookie.remove('client', { sameSite: 'lax' })

      sessionStorage.removeItem('loggedIn')
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('client')

      //set login to false and save into localStorage
      let user = localStorage.getItem('client')
      if (user) {
        let decodedUserData: IAuthPayload = JSON.parse(atob(user as string))
        decodedUserData = { ...decodedUserData, isLoggedIn: false }
        let encodedUserData = btoa(JSON.stringify(decodedUserData))
        localStorage.setItem('client', encodedUserData)
      }

      return { ...state, isLoggedIn: false, token: '', data: null }
    default:
      /** Always return state */
      return state
  }
}

export default authReducer
