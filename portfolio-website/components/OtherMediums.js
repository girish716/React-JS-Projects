import React from 'react'
import { AiFillLinkedin } from 'react-icons/ai'
import { GrMail } from 'react-icons/gr'
import { BsGithub } from 'react-icons/bs';
import 'animate.css'

const OtherMediums = ( {gmail, linkedin} ) => {
  return (
    <div className='other-mediums animate__animated animate__fadeIn'>
        <a href={linkedin} target='_blank' rel="noreferrer"><p className='icon linkedin-contact'><AiFillLinkedin /></p></a>
        <a href={`mailto: ${gmail}`} target='_blank' rel="noreferrer"><p className='icon gmail-contact'><GrMail/></p></a>
    </div>
  )
}

export default OtherMediums