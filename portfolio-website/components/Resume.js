import React from 'react'
import { HiDownload } from 'react-icons/hi'

const Resume = ( { url } ) => {
    console.log(url)
  return (
    <div className='resume animate__animated animate__bounceInRight'>
        <a href={`${url}?dl=GirishResume.pdf`} download="GirishResume.pdf">
            <p >Resume</p>
            <HiDownload />
        </a>
    </div>
  )
}

export default Resume