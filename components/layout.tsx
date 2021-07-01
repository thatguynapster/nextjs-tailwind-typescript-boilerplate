import Sidebar from './sidebar'
import React, { FC } from 'react'
import { Navbar } from '.'
import { ILayoutProps } from '../types'

const Layout: FC<ILayoutProps> = ({ pagename, children, userDetails }) => {
  // console.log(userDetails)
  // console.log("data in layout")

  return (
    <div className="layout-main-root">
      <div className="layout-main">
        <Navbar
          name={userDetails?.name || 'some user'}
          image={userDetails?.image || '/icons/some.svg'}
        ></Navbar>
        <div
          className="container-fluid min-h-screen overflow-y-auto"
          style={{ backgroundColor: '#F9F9F9' }}
        >
          <div className="flex flex-row justify-start">
            <Sidebar pagename={pagename} />
            <div className="" style={{ paddingTop: '56px' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
