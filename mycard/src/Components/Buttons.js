import React from 'react';
import './Buttons.css';
import mail from '../images/maiil.png';
import linkedin from '../images/linkedin.png';


export default function Buttons(){
    return(
        <div className='buttons'>
             
             <button className='email_button'><img src={mail} className='mail'/>Email</button>
             <button className='linkedin_button'><img src={linkedin} className='linkedin'/>LinkedIn</button>
        </div>
        
    );
}