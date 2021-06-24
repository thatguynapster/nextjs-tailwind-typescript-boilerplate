import { createContext, Dispatch } from 'react'
import { IAuth } from '../types'

const AuthContext = createContext<IAuth | any>({})

export default AuthContext
