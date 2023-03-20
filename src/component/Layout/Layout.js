import React from 'react'
import Routers from '../../Router/Router'
import Footer from '../footer/footer'
import Header from '../Header/header'

import AdminNav from '../../admin/AdminNav'
import { useLocation } from 'react-router-dom'
const Layout = () => {

  const location = useLocation()
  return (
    <>
    {
      location.pathname.startsWith('/dashboard') ? <AdminNav/> : <Header/>
    }
    
    <div>
      <Routers/>
    </div>
    <Footer/>
    </>
  )
}

export default Layout
