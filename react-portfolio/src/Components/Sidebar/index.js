import './index.scss'
import LogoS from '../../assets/images/logo-s.png'
import LogoSubtitle from '../../assets/images/logo_sub.png'
import {Link, NavLink} from 'react-router-dom' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faUser, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faLinkedin, faGithub} from  "@fortawesome/free-brands-svg-icons"

const SideBar = ()=>{
    return( 
    <div className='nav-bar'>
        <Link to='/' className = 'logo'>
            <img src = {LogoS} alt="logo"/>
            <img className="sub-logo" src = {LogoSubtitle} alt="logo"/>
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} color="#4d4d4e"/>
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faUser} color="#4d4d4e"/>
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e"/>
            </NavLink>
        </nav>
        <ul>
            <li>
                <a
                    target='_blank'
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/dama-girish-chandra"
                >
                    <FontAwesomeIcon icon={faLinkedin} color='#4d4d4e'/>
                </a>
            </li>
            <li>
                <a
                    target='_blank'
                    rel="noreferrer"
                    href="www.google.com"
                >
                    <FontAwesomeIcon icon={faGithub} color='#4d4d4e'/>
                </a>
            </li>
        </ul>
    </div>)
}

export default SideBar;