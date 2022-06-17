import React from 'react'
import { AiFillLinkedin } from 'react-icons/ai'
import { GrMail } from 'react-icons/gr'
import { BsGithub } from 'react-icons/bs';
import 'animate.css'

const OtherMediums = () => {
  return (
    <div className='other-mediums animate__animated animate__fadeIn'>
        <a href='https://www.linkedin.com/in/dama-girish-chandra/' target='_blank'><p className='icon linkedin-contact'><AiFillLinkedin /></p></a>
        <a href='mailto: girishchandra79179@gmail.com' target='_blank'><p className='icon gmail-contact'><GrMail/></p></a>
    </div>
  )
}

export default OtherMediums