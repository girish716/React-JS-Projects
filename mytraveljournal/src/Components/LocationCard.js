import React from 'react';
import './Styles/Location.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'

export default function Location(props){
    return (
        <div className='Location'>
            <img className='Location-image' src={props.imageUrl}></img>
            <div className='Details-Container'>
                <div className='Location-mapContainer'>
                    <FontAwesomeIcon icon = {faMapMarkerAlt} className='icon'></FontAwesomeIcon>
                    <p>{props.location}</p>
                    <a href={props.googleMapsUrl} target="_blank">View on Google Maps</a>
                </div>
                <h1>{props.title}</h1>
                <h4 className='Location-Duration'>{props.startDate} - {props.endDate}</h4>
                <p className='Location-description'>{props.description}</p>
            </div>
        </div>
    );
}