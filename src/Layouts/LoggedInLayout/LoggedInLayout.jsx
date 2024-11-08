import React from 'react'
import Navbar from '../../components/molecules/Navbar/Navbar'

export const LoggedInLayout = ({children}) => {
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}
