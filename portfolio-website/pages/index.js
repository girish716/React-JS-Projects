import React, {useEffect} from 'react'
import Link from 'next/link'
import { client } from '../lib/client'
import {OtherMediums} from '../components'
import { UseSanityData } from '../context/SanityData'
import Resume from '../components/Resume'
import dynamic from 'next/dynamic'

// Dynamically import animate.css only when needed
if (typeof window !== 'undefined') {
  import('animate.css');
}


const Home = ({aboutData, projects, resumeURL}) => {
  const heading = ['G','I','R','I','S','H']
  const { title, gmail, linkedin} = aboutData[0]
  const { storeData} = UseSanityData()
  
  useEffect(()=>{
    storeData({aboutData, projects})
    
    // Trigger snake effect after page load with a delay
    setTimeout(() => {
      triggerSnakeEffect();
    }, 1500); // Wait 1.5 seconds after page load
  },[])

  const hoverHandler = (e)=>{
    e.currentTarget.className = e.currentTarget.className+" animate__rubberBand"
    e.currentTarget.style.color = '#f55139'
  }
  
  const leaveHandler = (e)=>{
        e.currentTarget.className = e.currentTarget.className.replace(" animate__rubberBand","")
        e.currentTarget.style.color = '#181818'
  }

  const triggerSnakeEffect = () => {
    const spans = document.querySelectorAll('.home-container h1 span:not(.space)');
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.transform = 'translateY(-10px)';
        span.style.color = '#f55139';
        setTimeout(() => {
          span.style.transform = 'translateY(0)';
          span.style.color = '#181818';
        }, 200);
      }, index * 100);
    });
  }

  const Span = ({char, idx})=>{
    return (
      <span 
          onMouseEnter={hoverHandler} 
          onMouseLeave={leaveHandler}
          className='animate__animated animate__delay-0.2s letter-span' 
          key = {idx}
          style={{
            transition: 'transform 0.3s ease, color 0.3s ease',
            display: 'inline-block'
          }}
          >
          {char}
      </span>
    )
  }

  return (
      <div className='home-container'>
        <h1 className='animate__animated animate__bounceIn' onMouseEnter={triggerSnakeEffect}>
        <Span char={'H'} idx={1} />
        <Span char={'I'} idx={2}/>
        <span className="space">&nbsp;</span>
        <Span char={'I\''} idx={3}/>
        <Span char={'A'} idx={4}/>
        <Span char={'M'} idx={5}/>
        <span className="space">&nbsp;</span>
        {heading.map((c,i)=>
          <Span char={c} key={i+6} idx={i+6}/>
          )
        }
        </h1>
        <p className='animate__animated animate__pulse'>{title || 'A Web Developer with a passion for learning new things and a desire to solve issues.'}</p>
        <Link href='/projects'><button className ='button' type='button'>Projects</button></Link>
        <OtherMediums gmail={gmail} linkedin={linkedin} />
        <Resume url={resumeURL[0].resumeURL}/>

      </div>
  )
}

export const getStaticProps = async()=>{
  // Optimized single query to fetch all data at once
  const optimizedQuery = `{
    "aboutData": *[_type == "about"],
    "projects": *[_type == "project"],
    "resumeURL": *[_type == "about"] { "resumeURL": resume.asset->url }
  }`
  
  try {
    const data = await client.fetch(optimizedQuery);
    
    return {
      props: {
        aboutData: data.aboutData,
        projects: data.projects,
        resumeURL: data.resumeURL
      },
      // Add revalidation for better performance
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        aboutData: [],
        projects: [],
        resumeURL: []
      }
    }
  }
}

export default Home