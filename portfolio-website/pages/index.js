import React, {useState, useEffect} from 'react'
import { Project } from '../components'
import Link from 'next/link'
import { client } from '../lib/client'
import logoG from '../assets/logo-g.png'
import 'animate.css'
import {OtherMediums} from '../components'
import { UseSanityData } from '../context/SanityData'


const Home = ({aboutData, projects}) => {
  const heading = ['G','I','R','I','S','H']
  const { title } = aboutData
  const { storeData } = UseSanityData()
  
  useEffect(()=>{
    storeData({aboutData, projects})
  },[])

  const hoverHandler = (e)=>{
    e.currentTarget.className = e.currentTarget.className+" animate__rubberBand"
    e.currentTarget.style.color = '#f55139'
  }
  
  const leaveHandler = (e)=>{
        e.currentTarget.className = e.currentTarget.className.replace(" animate__rubberBand","")
        e.currentTarget.style.color = '#181818'
  }

  const Span = ({char, idx})=>{
    return (
      <span 
          onMouseEnter={hoverHandler} 
          onMouseLeave={leaveHandler}
          className='animate__animated animate__delay-0.2s' 
          key = {idx}
          >
          {char}
      </span>
    )
  }

  return (
      <div className='home-container'>
        <h1 className='animate__animated animate__bounceIn'>
        <Span char={'H'} idx={1} />
        <Span char={'I'} idx={2}/>
        <span>&nbsp;</span>
        <Span char={'I\''} idx={3}/>
        <Span char={'A'} idx={4}/>
        <Span char={'M'} idx={5}/>
        <span>&nbsp;</span>
        {heading.map((c,i)=>
          <Span char={c} key={i+6} idx={i+6}/>
          )
        }
        </h1>
        <p className='animate__animated animate__pulse'>{title || 'A Web Developer with a passion for learning new things and a desire to solve issues.'}</p>
        <Link href='/projects'><button className ='button' type='button'>Projects</button></Link>
        <OtherMediums />
      </div>
  )
}

export const getStaticProps = async()=>{
  const query1 = '*[_type == "about"]'
  const query2 = '*[_type == "project"]'
  const aboutData = await client.fetch(query1);
  const projects = await client.fetch(query2);

  return {
    props : {aboutData, projects}
  }
}

export default Home