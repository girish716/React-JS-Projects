import './index.scss';
import AnimatedLetters from '../AnimatedLetters'
import { Fragment, useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' 
import {faAngular, faCss3, faGitAlt, faHtml5, faJsSquare, faReact, faTs} from '@fortawesome/free-brands-svg-icons';
import {Loader} from 'react-loaders';

const About = ()=>{
    const [letterClass, setLetterClass] = useState("text-animate");

    useEffect(()=>{
         setTimeout(()=>{
            setLetterClass("text-animate-hover");
        }, 3000);
    },[]);

    return(
        <Fragment>
            <div className='container about-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters 
                            letterClass={letterClass}
                            strArray={['A','b','o','u','t',' ','m','e']}
                            idx={15}
                        />
                    </h1>
                    <p>
                        I'm very ambitious front-end developer looking for a role in established IT company with the oppurtunnity to work with the latest technologies on challenging and diverse projects.
                    </p>
                    <p>
                        I'm quietly confident, naturally cusrious, and perpetually working on improving my chops one problem at a time.
                    </p>
                    <p>
                        If i need to define myself in one sentense that would be a family person, a food lover, and tech-obsessed!!
                    </p>
                </div>
                <div className='stage-cube-cont'>
                    <div className='cubespinner'>
                        <div className='face1'>
                            <FontAwesomeIcon icon={faAngular} color="#DD0031"/>
                        </div>
                        <div className='face2'>
                            <FontAwesomeIcon icon={faHtml5} color="#F06529"/>
                        </div>
                        <div className='face3'>
                            <FontAwesomeIcon icon={faCss3} color="#28A4D9"/>
                        </div>
                        <div className='face4'>
                            <FontAwesomeIcon icon={faReact} color="#5ED4F4"/>
                        </div>
                        <div className='face5'>
                            <FontAwesomeIcon icon={faJsSquare} color="#EFD810"/>
                        </div>
                        <div className='face6'>
                            <FontAwesomeIcon icon={faGitAlt} color="#EC4D28"/>
                        </div>
                    </div>
                </div>
            
            
            </div>
            <Loader type="pacman" />
        </Fragment>
    ); 
}

export default About;