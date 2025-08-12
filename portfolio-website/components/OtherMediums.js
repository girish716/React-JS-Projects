import React from 'react'
import { AiFillLinkedin } from 'react-icons/ai'
import { GrMail } from 'react-icons/gr'
import { BsGithub } from 'react-icons/bs';
import 'animate.css'

const OtherMediums = ( {gmail, linkedin} ) => {
  return (
    <div className='other-mediums animate__animated animate__fadeIn'>
        <a href={linkedin} target='_blank' rel="noreferrer"><p className='icon linkedin-contact'><AiFillLinkedin /></p></a>
        <a href={`mailto: ${gmail}`} target='_blank' rel="noreferrer">
          <p className='icon gmail-contact' style={{ position: 'relative' }}>
            <GrMail/>
            {/* Email notification badge */}
            <span 
              className='animate__animated animate__pulse animate__infinite'
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#ff4444',
                color: 'white',
                borderRadius: '50%',
                width: '12px',
                height: '12px',
                fontSize: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                zIndex: 10
              }}
              title="Send me an email!"
            >
              !
            </span>
          </p>
        </a>
    </div>
  )
}

export default OtherMediums