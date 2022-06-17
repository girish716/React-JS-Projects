import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import Footer from './Footer'


const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Girish Portfolio</title>
        <link rel="icon" href="/logo-g.png" />
      </Head>
      <Sidebar />
      <main className='main-container'>{children}</main>
    </div>
  )
}

export default Layout