import { useState, useEffect, useContext } from 'react'
import HeadFile from '../components/head-file'
import Layout from '../components/layout'
import AuthContext from '../context/auth-context'
import { HomeCard } from '../components'
import { FC } from 'react'
import { navigate } from '../lib'
import {IUserData} from '../types'

const Blank: FC = () => {
  const { GLOBAL_OBJ, AUTH_LOGOUT } = useContext(AuthContext)
  const [ready, setReady] = useState<boolean>(false)
  const [stats, setStats] = useState<{ label: string; count: string }[]>([])
  const [userDetails, setUserDetails] = useState<IUserData>({})

  

  /** initialize page */
  const initialize = async () => {
    setReady(true)
  }

  useEffect(() => {
    // console.log('user logged in: ', GLOBAL_OBJ)
    setUserDetails(GLOBAL_OBJ.data);
    // !GLOBAL_OBJ?.isLoggedIn && navigate('login')
    initialize()
  }, [GLOBAL_OBJ])

  // console.log(userDetails)
  // console.log("load here")

  if (stats.length == 0) {
    return (
      <Layout pagename="home" userDetails={userDetails}>
        <HeadFile title="Home | Ananse Hub" />
        <div className="container sm:px-10 pt-20 px-50">
          <div className="w-auto border-b-2 mb-10">
            <h2 className="text-4xl font-bold">Home</h2>
          </div>
        {/* TODO: replce this with a nice not found image or text */}
          <p>Statistics Not Found</p>

        </div>
      </Layout>
    )
  }

  return (
    <Layout pagename="home" userDetails={userDetails}>
      <HeadFile title="Home | Ananse Hub" />
      <div className="container sm:px-10 pt-20 px-50">
        <div className="w-auto border-b-2 mb-10">
          <h2 className="text-4xl font-bold">Home</h2>
        </div>

        <div className="w-auto grid grid-flow-row grid-cols-4 gap-4 mb-10">
           {stats.map(stat => {
             return(<HomeCard key={stat.label} cardTitle={stat.label} cardDetails={stat.count} page="schools" />)
           })}
        </div>

      </div>
    </Layout>
  )
}

export default Blank
