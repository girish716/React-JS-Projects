import React, {useEffect, useRef, useState} from 'react'
import logoG from '../assets/logo-g.png'
import logoSub from '../assets/logo_sub.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImHome } from 'react-icons/im'
import { BsFillPersonFill } from 'react-icons/bs'
import { TiContacts } from 'react-icons/ti'
import { GoMarkGithub } from 'react-icons/go'
import { GrMail } from 'react-icons/gr'
import { AiFillLinkedin } from 'react-icons/ai'
import { GoProject } from 'react-icons/go'
import { UseSanityData } from '../context/SanityData';
import { client } from '../lib/client'


const Sidebar = () => {
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const projectsRef = useRef(null)
  const router = useRouter()
  const sanityData = UseSanityData()
  const aboutData = sanityData && sanityData.data && sanityData.data.aboutData
  const [myData, setMyData] = useState(aboutData)
  const [gmail, setGmail] = useState(myData && myData[0] && myData[0].gmail || null)
  const [linkedin, setLinkedin] = useState(myData && myData[0] && myData[0].linkedin || null)
  const [showNotification, setShowNotification] = useState(false)
  const [shouldHighlight, setShouldHighlight] = useState(false)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(()=>{
    const validator = async ()=>{
      if(!myData){
        const query = '*[_type == "about"]'
        const data = await client.fetch(query)
        setMyData(data)
        setGmail(data && data[0] && data[0].gmail || null)
        setLinkedin(data && data[0] && data[0].linkedin || null)
      }
    }
    validator()
    
    // Show notification immediately when page loads (like AI chatbot)
    setShowNotification(true);
    
    // Start highlighting after 1 second (like AI chatbot)
    const highlightTimer = setTimeout(() => {
      setShouldHighlight(true);
      // Remove highlight after animation
      setTimeout(() => setShouldHighlight(false), 2000);
    }, 1000);

    // Hide notification after 5 seconds (like AI chatbot)
    const notificationTimer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => {
      clearTimeout(highlightTimer);
      clearTimeout(notificationTimer);
    }
  },[])


  useEffect(()=>{
    let path = router.pathname
    let ref = null
    switch(path){
      case '/':
        ref = homeRef.current
        aboutRef.current.className= aboutRef.current.className.replace(' active','')
        contactRef.current.className = contactRef.current.className.replace(' active','')
        projectsRef.current.className = projectsRef.current.className.replace(' active','')
        break
      case '/about':
        ref = aboutRef.current
        homeRef.current.className = homeRef.current.className.replace(' active','')
        contactRef.current.className = contactRef.current.className.replace(' active','')
        projectsRef.current.className = projectsRef.current.className.replace(' active','')
        break
      case '/contact':
        ref = contactRef.current
        aboutRef.current.className = aboutRef.current.className.replace(' active','')
        homeRef.current.className = homeRef.current.className.replace(' active','')
        projectsRef.current.className = projectsRef.current.className.replace(' active','')
        break
      case '/projects':
        ref = projectsRef.current
        aboutRef.current.className = aboutRef.current.className.replace(' active','')
        homeRef.current.className = homeRef.current.className.replace(' active','')
        contactRef.current.className = contactRef.current.className.replace(' active','')
        break
      default:
        contactRef.current.className = contactRef.current.className.replace(' active','')
        aboutRef.current.className = aboutRef.current.className.replace(' active','')
        homeRef.current.className = homeRef.current.className.replace(' active','')
        projectsRef.current.className = projectsRef.current.className.replace(' active','')
    }
    if(ref && !ref.className.includes('active'))ref.className = ref.className+" active"

  }, [router.pathname])


  return (
    <div className='sidebar-container'>
      <div className='logo-container'>
        <Link href='/'>
          <div>
            <img className='logoG' src={logoG.src}/>
            <img className='logoSub' src={logoSub.src}/>
          </div>
        </Link>
      </div>
      <nav className='nav-items'>
        <Link href='/'><p ref={homeRef}  className='icon home active'><ImHome /></p></Link>
        <Link href='/about'><p ref={aboutRef}  className='icon about'><BsFillPersonFill /></p></Link>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Link href='/contact'>
            <p 
              ref={contactRef}  
              className={`icon contact ${shouldHighlight ? 'highlight' : ''}`}
              style={{
                transition: 'all 0.3s ease',
                transform: shouldHighlight ? 'scale(1.1)' : 'scale(1)',
                filter: shouldHighlight ? 'drop-shadow(0 0 8px #f55139)' : 'none'
              }}
            >
              <TiContacts />
            </p>
          </Link>
          {/* Desktop only tooltip - AI chatbot style */}
          {showNotification && !isMobile && (
            <div 
              style={{
                position: 'absolute',
                left: '60px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#333',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                opacity: showNotification ? 1 : 0,
                transition: 'opacity 0.3s ease',
                border: '1px solid #555'
              }}
              className='contact-tooltip'
            >
              👋 Send Girish a message!
              {/* Arrow pointing to contact icon */}
              <div 
                style={{
                  position: 'absolute',
                  left: '-6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderRight: '6px solid #333'
                }}
              />
            </div>
          )}
        </div>
        <Link href='/projects'><p ref={projectsRef}  className='icon projects'><GoProject/></p></Link>
      </nav>
      <div className='social-media'>
        <a href={`mailto: ${gmail}`} target='_blank' rel="noreferrer"><p className='icon git'><GrMail /></p></a>
        <a href={linkedin} target='_blank' rel="noreferrer"><p className='icon linkedin'><AiFillLinkedin /></p></a>
      </div>
    </div>
  )
}

export default Sidebar