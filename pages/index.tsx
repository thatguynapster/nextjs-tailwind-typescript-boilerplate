import HeadFile from '../components/head-file'
import React, { FC, useState, useContext, useEffect } from 'react'
import AuthContext from '../context/auth-context'
import { toast } from 'react-toastify'
import API from '../lib/api'
import { navigate } from '../lib'
import Layout from '../components/layout'

export const Login: FC = () => {
  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext)

  const initialize = () => {}

  useEffect(() => {
    initialize()
    GLOBAL_OBJ?.isLoggedIn && navigate('home')
  }, [GLOBAL_OBJ])

  return (
    <>
      <HeadFile title="PROJECT NAME" />

      {/* PAGE CONTENT HERE... */}
      <p className="text-swooveBlue">Some text</p>
    </>
  )
}

export default Login
