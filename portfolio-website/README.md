
## My Portfolio Website

Made with Next JS and using Sanity as my backend to manage the data.

Open [https://www.girishdama.com](https://www.girishdama.com) with your browser to see the website.

## Tech Stack

This portfolio is built using modern web technologies to deliver a fast, secure, and interactive experience:

### **⚡ Next.js**
A React-based framework that provides server-side rendering, static site generation, and optimized performance. Enables fast page loads and excellent SEO while maintaining a smooth single-page application experience.

### **⚛️ React**
A powerful JavaScript library for building user interfaces with component-based architecture. Provides dynamic, interactive UI components and efficient state management for a responsive user experience.

### **🤖 Google Gemini LLM**
Google's advanced large language model powering the AI chatbot and message generator features. Provides intelligent, context-aware responses and natural language processing capabilities for enhanced user interaction.

### **📧 EmailJS**
A client-side email service that enables sending emails directly from the contact form without requiring a backend server. Provides secure, reliable email delivery with Gmail integration.

### **🎨 Sanity CMS**
A headless content management system that serves as the backend for portfolio data. Enables easy content updates, project management, and dynamic data fetching while maintaining fast performance.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. **Environment Variables Setup:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your actual API keys and configuration values to the `.env` file:
     - **Sanity Token**: Get your Sanity token from [Sanity.io](https://sanity.io) dashboard → API → Tokens
     - **Gemini API Key**: Get your Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. Run the development server:
   ```bash
   npm run dev
   ```

## Features

### 🤖 AI Chatbot - "Virtual Girish"
The portfolio includes an AI-powered chatbot that acts as a virtual version of Girish, powered by Google Gemini API.

**Key Features:**
- Interactive chat interface with modern popup UI
- Answers questions about Girish's professional background, skills, and experience
- Provides contact information and project details
- Integrated with the portfolio's design aesthetic

**🔒 Enhanced Security Features:**
- **Advanced Prompt Injection Protection**: Research-based defense against 8 categories of attacks:
  - Role manipulation attacks ("act as", "you are now")
  - Instruction override attempts ("ignore previous instructions")
  - System/context injection (system prompts, delimiters)
  - Jailbreaking attempts ("DAN mode", "developer mode")
  - Social engineering tactics (urgency, authority claims)
  - Encoding/obfuscation attacks (Base64, Unicode manipulation)
  - Template injection attempts
  - Chain-of-thought manipulation
- **Multi-Layer Input Validation**: 
  - Message normalization and sanitization
  - Character pattern analysis (control chars, Unicode specials)
  - Repetition attack prevention (DoS protection)
  - Length limits (500 character max)
- **Advanced Response Validation**: 
  - Identity compromise detection
  - AI disclosure prevention
  - Role confusion detection
  - Inappropriate content filtering
  - System information leakage prevention
  - Professional context verification
- **Conversation Security**: Context window limited to 10 messages with content filtering
- **Zero-Trust Architecture**: Every input and output is validated against security patterns

The chatbot is designed to be secure, reliable, and provide accurate information about Girish's professional journey.

### ✨ AI Message Generator
The contact form includes an AI-powered message generator to help visitors craft professional messages.

**Key Features:**
- **Smart Message Generation**: Uses Google Gemini API to create personalized, professional messages
- **Popup Modal Interface**: Clean, focused UI that opens when clicking "Generate with AI"
- **Keyboard Support**: Press Enter to generate messages for improved accessibility
- **Prompt-Based Generation**: Users describe what they want to communicate, AI creates the message
- **Direct Integration**: Generated messages automatically populate the contact form textarea

**Example Usage:**
- User enters: "asking about job opportunities"
- AI generates: "Hi Girish, I hope this message finds you well. I'm reaching out to inquire about potential job opportunities and would love to discuss how my skills might align with your projects. Looking forward to hearing from you!"

**🔒 Security Features:**
- **Shared Security Module**: Uses the same robust validation system as the AI chatbot
- **Input Validation**: Client-side and server-side prompt validation
- **Content Filtering**: Profanity detection and inappropriate content prevention
- **Professional Output**: AI instructions ensure concise, professional messaging (30-80 words)
- **Response Validation**: Output filtering to maintain quality and appropriateness

The AI message generator helps visitors overcome writer's block and ensures professional communication while maintaining the same security standards as other AI features.

