import React, { useEffect, useState } from 'react'
import { Project } from '../components'
import { client } from '../lib/client'
import 'animate.css'
import { UseSanityData } from '../context/SanityData'

const projects = () => {
  const {data} = UseSanityData()
  const {projects} = data
  const [projectsData, setProjectsData] = useState(projects)
  
  useEffect(()=>{
    const validator = async ()=>{
      if(!projects){
        const query = '*[_type == "project"]'
        const data = await client.fetch(query)
        setProjectsData(data)
        console.log(data)
      }
    }
    validator()
  },[])
  
  return (
    <div className='projects-container animate__animated animate__fadeInRight animate__faster'>
     {
      projectsData && projectsData.sort((p1,p2)=>p1.order-p2.order).map(project=><Project key={project._id} data={project}/>
      )
     }
    </div>
  )
}



export default projects