import React, { FC, ReactNode } from 'react'

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
