import { Fragment,React, useEffect, useRef, useState } from 'react';
import './index.scss';
import {Loader} from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import emailjs from '@emailjs/browser';
import { MapContainer, TileLayer, useMap,Popup, Marker } from 'react-leaflet'


const Contact = ()=>{
    const [letterClass, setLetterClass] = useState("text-animate");
    const refForm = useRef();

    useEffect(()=>{
        setTimeout(()=>{
            setLetterClass("text-animate-hover");
        }, 4000);
    },[]);


    const sendEmail = (e)=>{
         e.preventDefault();
         emailjs
            .sendForm(
                'default_service',
                'template_5mkujo8',
                refForm.current,
                "ilnxhw59zWAU1w6tN"
            )
            .then(
                ()=>{
                    alert("message sent successfully!");
                    window.location.reload(false);
                },
                ()=>{
                    alert("operation failed, please try again");
                }
            )
    }

    return(
        <Fragment>
            <div className="container contact-page">
                <div className='text-zone'>
                    <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={['C','o','n','t','a','c','t',' ','m','e']} idx={15} />
                    </h1>
                    <p>
                        I am interested in Internships/FullTime Oppurtunnities - especially ambitous or interesting projects
                    </p>
                    <div className='contact-form'>
                        <form ref={refForm} onSubmit={sendEmail}>
                            <ul>
                               <li className='half'>
                                    <input type="text" name="name" placeholder='Name' required></input>
                               </li> 
                               <li className='half'>
                                    <input type="email" name="email" placeholder='Email' required></input>
                               </li>
                               <li >
                                    <input type="text" name="subject" placeholder='Subject' required></input>
                               </li>  
                               <li >
                                    <textarea name="message" placeholder='Message' required></textarea>
                               </li> 
                               <li >
                                    <input type="submit" className="flat-button" value='SEND' ></input>
                               </li> 
                            </ul>
                        </form>
                    </div>
                </div>
                <div className='info-map'>
                    Girish Chandra,
                    <br/>
                    Ongole, India
                    <br/>
                    <span>girishchandra79179@gmail.com</span>

                </div>
                <div className='map-wrap'>
                  <MapContainer center={[16.08333, 80.16667]} zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Marker position={[16.08333, 80.16667]}>
                        <Popup>Girish lives here, come over for a cup of coffe :)</Popup>
                    </Marker>
                  </MapContainer>
                </div>
            </div>
            <Loader type="pacman"/>
        </Fragment>
    );
}

export default Contact;