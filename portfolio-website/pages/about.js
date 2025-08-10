import React, {useState, useEffect} from 'react'
import 'animate.css'
import { client, urlFor } from '../lib/client'
import { UseSanityData } from '../context/SanityData'

const About = () => {
  const {data} = UseSanityData()
  const {aboutData} = data
  const [myData, setMyData] = useState(aboutData)
  const [skills, setSkills] = useState(myData && myData[0] && myData[0].skills || null)
  const [myImage, setMyImage] = useState(myData && myData[0] && myData[0].myImage || null)
  const [about, setAbout] = useState(myData && myData[0] && myData[0].about || null)
   
  useEffect(()=>{
    const validator = async ()=>{
      if(!myData){
        const query = '*[_type == "about"]'
        const data = await client.fetch(query)
        setMyData(data)
        setSkills(data && data[0] && data[0].skills || null)
        setMyImage(data && data[0] && data[0].myImage|| null)
        setAbout(data && data[0] && data[0].about || null)
      }
    }
    validator()
  },[])

  return (
    <div className='about-container'>
    <h1 className='animate__animated animate__bounceIn'>ABOUT ME</h1>
      <div className='about-data'>
        <div className='information animate__animated animate__fadeIn'>
          <div>
            <h2>Get to know me!</h2>
            <img className='mobile-image' src={myImage && urlFor(myImage)} width='200px'/>
            {about && Array.isArray(about) ? (
              about.map((paragraph, index) => (
                <p key={index} className='animate__animated animate__pulse'>{paragraph}</p>
              ))
            ) : (
              <>
                <p className='animate__animated animate__pulse'>I'm a Software Engineer with experience in network security and full-stack web development. I enjoy building secure, user-friendly applications and exploring how emerging technologies like AI can enhance development practices.</p>
                <p className='animate__animated animate__pulse'>My skills include modern web frameworks, security protocols, and database management. I focus on creating responsive applications while maintaining strong security measures and exploring innovative solutions.</p>
                <p className='animate__animated animate__pulse'>I believe in continuous learning, especially in cybersecurity and AI technologies. I'm excited about contributing to projects that combine solid technical fundamentals with innovative approaches.</p>
              </>
            )}
          </div>
          <img className='browser-image' src={myImage && urlFor(myImage)} width='200px'/>
        </div>
        <div className='skills animate__animated animate__fadeIn'>
          <h2>My Skills</h2>
          <div className='tags-container tags-container-about'>
              {skills && skills.map((tag, index)=><span key={index}>{tag}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}



export default About