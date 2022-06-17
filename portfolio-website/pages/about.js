import React, {useState, useEffect} from 'react'
import 'animate.css'
import { client, urlFor } from '../lib/client'
import { UseSanityData } from '../context/SanityData'

const about = () => {
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
            <p className='animate__animated animate__pulse'>{about && about[0] || "I'm very ambitious web developer looking for a position in a established IT firm. My background in web development stems from my prior job as a Software Engineer, where I had the opportunity to deal with Java Script and HTML."}</p>
            <p className='animate__animated animate__pulse'>{about && about[1] || "I'm quiet, confident, naturally curious, and always working to improve my skills one problem at a time."}</p>
            <p className='animate__animated animate__pulse'>{about && about[2] || "I'm looking for a job where I can contribute, learn, and grow. Please do not hesitate to contact me if you have a good opportunity that matches my talents and expertise."}</p>
          </div>
          <img className='browser-image' src={myImage && urlFor(myImage)} width='200px'/>
        </div>
        <div className='skills animate__animated animate__fadeIn'>
          <h2>My Skills</h2>
          <div className='tags-container'>
              {skills && skills.map((tag, index)=><span key={index}>{tag}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}



export default about