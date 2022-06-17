import React,{useRef, useState, useEffect} from 'react'
import 'animate.css'
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { OtherMediums } from '../components';
import { UseSanityData } from '../context/SanityData';
import { client } from '../lib/client';

const contact = () => {
  const formRef = useRef(null)
  const {data} = UseSanityData()
  const {aboutData} = data
  const [myData, setMyData] = useState(aboutData)
  const [description, setDescription] = useState(myData && myData[0] && myData[0].contact || null)

   
  useEffect(()=>{
    const validator = async ()=>{
      if(!myData){
        const query = '*[_type == "about"]'
        const data = await client.fetch(query)
        setMyData(data)
        setDescription(data && data[0] && data[0].contact || null)
      }
    }
    validator()
  },[])

  const sendEmail = (e)=>{
    e.preventDefault();
    const sendingToast = toast.loading('Sending...');
    emailjs
       .sendForm(
           'default_service',
           'template_5mkujo8',
           formRef.current,
           "ilnxhw59zWAU1w6tN"
       )
       .then(
           ()=>{
               toast.dismiss(sendingToast)
               toast.success("message sent successfully!");
               setTimeout(()=>{
                window.location.reload(false);
               },2000)
           },
           ()=>{
               toast.dismiss(sendingToast)
               toast.error("operation failed, please try again");
           }
       )
}

  return (
    <div className='contact-container'>
      <div className='contact-me'>
        <h1 className='animate__animated animate__bounceIn'>
          CONTACT
        </h1>
        <p className='animate__animated animate__pulse'>{description || "I am interested in Internships/FullTime Opportunities - especially ambitous or interesting projects"}</p>
        <div className='form-container animated__animate animate__animated animate__fadeIn'>
          <form ref={formRef} onSubmit={sendEmail}>
            <div>
              <label htmlFor='name'>Name</label><br/>
              <input type='text' name='name' placeholder='Enter your Name' required/><br/>
            </div>
            <div>
              <label htmlFor='email'>Email</label><br/>
              <input type='email' name='email' placeholder='Enter your Email' required/><br/>
            </div>
            <div>
              <label htmlFor='subject'>Subject</label><br/>
              <input type='text' name='subject' placeholder='Enter your Subject' required/><br/>
            </div>
            <div>
              <label htmlFor='description'>Message</label><br/>
              <textarea name='description' placeholder='Enter your Message'/>
            </div>
            <div>
              <input  className='button' type='submit' value='SEND'/>
            </div>
          </form>
        </div>
      </div>
      <OtherMediums />
    </div>
  )
}

export default contact