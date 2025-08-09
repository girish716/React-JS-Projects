import React, { useState } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import Resume from './Resume'
import ChatBot from './ChatBot/ChatBot'
import ChatFloatButton from './ChatBot/ChatFloatButton'



const Layout = ({children}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className='layout'>
      <Head>
        <title>Girish Portfolio</title>
        <link rel="icon" href="/logo-g.png" />
      </Head>
      <Sidebar />
      <main className='main-container'>{children}</main>
      
      {/* Chatbot Components */}
      <ChatFloatButton 
        onClick={handleChatToggle}
        isOpen={isChatOpen}
      />
      <ChatBot 
        isOpen={isChatOpen}
        onClose={handleChatClose}
      />
    </div>
  )
}

export default Layout