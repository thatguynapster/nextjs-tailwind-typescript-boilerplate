import { ReactNode, Dispatch, SetStateAction } from 'react'

export interface IHeaderProps {
  title: string
  canonical?: string
}

export interface ICropper {
  callback: () => void
  aspectRatio: number
  src: string | null
  status: boolean
  setDisplay: Dispatch<SetStateAction<boolean>>
  setCropResult: Dispatch<SetStateAction<any>>
}

export interface IAuthState {
  isLoggedIn?: boolean
  token?: string
  data: any
  rememberMe?: boolean
}

export interface IAuthPayload {
  isLoggedIn?: boolean
  token?: string
  data: any
  rememberMe?: boolean
}

export interface IAuthAction {
  type: string
  payload?: IAuthPayload
}

export interface IAuth {
  GLOBAL_OBJ: IAuthState
  AUTH_LOGIN?: (payload: IAuthPayload) => Dispatch<IAuthState>
  AUTH_LOGOUT?: () => Dispatch<IAuthState>
}