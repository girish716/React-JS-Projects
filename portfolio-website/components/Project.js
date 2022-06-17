import React from 'react'
import { FaShareSquare } from 'react-icons/fa'
import { GrGithub } from 'react-icons/gr'
import { urlFor } from '../lib/client'

const Product = ({data}) => {
  const {image, liveURL, name, slug, sourceCode, tags }= data
  return (
    <div className='product-container'>
        <div className='image-container'>
          <img src={image && urlFor(image)} alt='img'/>
          <a 
          href={liveURL}
          target='_blank' 
          className='live'
          rel="noreferrer"
          >
            <FaShareSquare className='link-icon'/>
          </a>
        </div>
      <div className='product-details'>
        <p>{name}</p>
        <div className='tags-container'>
          {
            tags.map((tag, index)=><span key={index}>{tag}</span>)
          }
        </div>
      </div>
      <div className='product-footer'>
        <p className='github-icon'>
          <GrGithub/>
        </p>
        <a href={sourceCode} target='_blank' rel="noreferrer">Source Code</a>
      </div>
    </div>
  ) 
}

export default Product