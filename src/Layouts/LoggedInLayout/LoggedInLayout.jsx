import React from 'react'
import Navbar from '../../components/molecules/Navbar'

export const LoggedInLayout = ({children}) => {
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}
