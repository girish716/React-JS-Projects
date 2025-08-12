import React,{useRef, useState, useEffect} from 'react'
import 'animate.css'
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { OtherMediums } from '../components';
import { UseSanityData } from '../context/SanityData';
import { client } from '../lib/client';
import { validateAndSanitizeInput } from '../lib/aiSecurity';

const Contact = () => {
  const formRef = useRef(null)
  const {data} = UseSanityData()
  const {aboutData} = data
  const [myData, setMyData] = useState(aboutData)
  const [description, setDescription] = useState(myData && myData[0] && myData[0].contact || null)
  const [gmail, setGmail] = useState(myData && myData[0] && myData[0].gmail || null)
  const [linkedin, setLinkedin] = useState(myData && myData[0] && myData[0].linkedin || null)
  
  // AI Message Generator states
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

   
  useEffect(()=>{
    const validator = async ()=>{
      if(!myData){
        const query = '*[_type == "about"]'
        const data = await client.fetch(query)
        setMyData(data)
        setDescription(data && data[0] && data[0].contact || null)
        setGmail(data && data[0] && data[0].gmail || null)
        setLinkedin(data && data[0] && data[0].linkedin || null)
      }
    }
    validator()
  },[])

  const generateAIMessage = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Please enter a prompt for message generation');
      return;
    }

    // Client-side validation using shared security module
    try {
      validateAndSanitizeInput(aiPrompt, 200); // 200 char limit for prompts
    } catch (error) {
      toast.error(error.message || 'Please provide a professional message request. For example: "asking about job opportunities" or "inquiry about collaboration"');
      return;
    }

    setIsGenerating(true);
    const generatingToast = toast.loading('Generating message with AI...');

    try {
      const response = await fetch('/api/generate-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the message textarea with the generated content
        const messageTextarea = formRef.current.querySelector('textarea[name="description"]');
        if (messageTextarea) {
          messageTextarea.value = data.message;
        }
        
        toast.dismiss(generatingToast);
        toast.success('Message generated successfully! ✨');
        
        // Clear the AI prompt and hide the modal
        setAiPrompt('');
        setShowAIModal(false);
      } else {
        throw new Error(data.error || 'Failed to generate message');
      }
    } catch (error) {
      toast.dismiss(generatingToast);
      toast.error(error.message || 'Failed to generate message. Please try again.');
      console.error('AI message generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

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
               
               // Clear form data instead of reloading page
               formRef.current.reset();
               
               // Optional: Show success message for a bit longer
               setTimeout(()=>{
                 toast.success("Ready for your next message! 😊");
               }, 1500)
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
        <p className='animate__animated animate__pulse'>{"Let's connect and explore opportunities to collaborate on exciting projects together!"}</p>
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
              <div style={{ position: 'relative' }}>
                <textarea name='description' placeholder='Enter your Message'/>
                
                {/* AI Message Generator Button */}
                <button 
                  type='button' 
                  onClick={() => setShowAIModal(true)}
                  className='ai-generator-btn'
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'linear-gradient(135deg, #f55139, #ff6b4a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(245, 81, 57, 0.3)',
                    transition: 'all 0.3s ease',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(245, 81, 57, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(245, 81, 57, 0.3)';
                  }}
                >
                  ✨ Generate with AI
                </button>
              </div>
            </div>
            <div>
              <input  className='button' type='submit' value='SEND'/>
            </div>
          </form>
        </div>
      </div>
      <OtherMediums gmail={gmail} linkedin={linkedin}/>
      
      {/* AI Message Generator Modal */}
      {showAIModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            animation: 'slideIn 0.3s ease'
          }}>
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAIModal(false);
                setAiPrompt('');
              }}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                padding: '5px',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.color = '#333';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#666';
              }}
            >
              ×
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '25px', textAlign: 'center' }}>
              <h2 style={{ 
                margin: '0 0 10px 0', 
                color: '#333',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                ✨ AI Message Generator
              </h2>
              <p style={{ 
                margin: 0, 
                color: '#666',
                fontSize: '16px'
              }}>
                Describe what kind of message you want to generate
              </p>
            </div>

            {/* Input Section */}
            <div style={{ marginBottom: '25px' }}>
              <input
                type='text'
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isGenerating && aiPrompt.trim()) {
                    e.preventDefault();
                    generateAIMessage();
                  }
                }}
                placeholder='e.g., "asking about job opportunities" or "inquiry about collaboration"'
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f55139';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                }}
                disabled={isGenerating}
                autoFocus
              />
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                type='button'
                onClick={generateAIMessage}
                disabled={isGenerating || !aiPrompt.trim()}
                style={{
                  background: isGenerating || !aiPrompt.trim() 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #f55139, #ff6b4a)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: isGenerating || !aiPrompt.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '140px'
                }}
                onMouseEnter={(e) => {
                  if (!isGenerating && aiPrompt.trim()) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 12px rgba(245, 81, 57, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {isGenerating ? '🔄 Generating...' : '✨ Generate'}
              </button>
              
              <button
                type='button'
                onClick={() => {
                  setShowAIModal(false);
                  setAiPrompt('');
                }}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '100px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a6268';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                }}
              >
                Cancel
              </button>
            </div>

            {/* Tips Section */}
            <div style={{
              marginTop: '25px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <p style={{ 
                margin: '0 0 10px 0', 
                fontWeight: 'bold',
                color: '#495057',
                fontSize: '14px'
              }}>
                💡 Example prompts:
              </p>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '20px',
                color: '#6c757d',
                fontSize: '13px'
              }}>
                <li>"asking about job opportunities"</li>
                <li>"inquiry about collaboration"</li>
                <li>"professional introduction"</li>
                <li>"requesting a meeting"</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact