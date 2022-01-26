import React from 'react';
import './Footer.css';
import Twitter from '../images/Twitter Icon.png';
import Facebook from '../images/Facebook Icon.png';
import Insta from '../images/Instagram Icon.png';
import Git from '../images/GitHub Icon.png';


export default function (){
    return(
        <div className='Footer'>
          <img src={Twitter}></img>
          <img src={Facebook}></img>
          <img src={Insta}></img>
          <img src={Git}></img>
        </div>
    );
}