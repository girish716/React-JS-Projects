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
  const projectsRef = useRef(null)
  const router = useRouter()
  const sanityData = UseSanityData()
  const aboutData = sanityData && sanityData.data && sanityData.data.aboutData
  const [myData, setMyData] = useState(aboutData)
  const [gmail, setGmail] = useState(myData && myData[0] && myData[0].gmail || null)
  const [linkedin, setLinkedin] = useState(myData && myData[0] && myData[0].linkedin || null)

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
        <Link href='/contact'><p ref={contactRef}  className='icon contact'><TiContacts /></p></Link>
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