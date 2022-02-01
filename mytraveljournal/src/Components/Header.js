import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlobeAsia} from '@fortawesome/free-solid-svg-icons'
import './Styles/Header.css';

export default function Header(){
    return (
        <header className='Header'>
            <div className='globe'>
            <FontAwesomeIcon icon = {faGlobeAsia}  size='lg' spin></FontAwesomeIcon>
            </div> 
           <p>My Travel Journal</p>
        </header>
    )
}