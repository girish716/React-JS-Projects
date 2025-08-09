import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_PLACEHOLDER");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;
    
    // Get current URL for dynamic project links
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const projectsUrl = `${baseUrl}/projects`;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Temporary test mode - remove this when API key is working
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('PLACEHOLDER')) {
      // Test responses with real professional information
      const testResponses = {
        'hello': "Hi! I'm Virtual Girish, your AI assistant. I can tell you about Girish's background as a Software Engineer at Cisco Systems, his skills, projects, and experience. What would you like to know?",
        'background': "Girish is an experienced Software Engineer currently working at Cisco Systems specializing in firewall technologies and network security, with around 3+ years in web development, full-stack applications, and cybersecurity. He has an MS in Computer Science from UMBC (GPA: 3.713/4.0) and previously worked at Cowan Logistics and Ford Motor Company.",
        'experience': "Girish currently works as a Software Engineer at Cisco Systems, specializing in firewall technologies and network security solutions. Previously, he was a Full Stack Developer at Cowan Logistics (June 2023-current) working on RateVision.AI, where he led a 5-member team and integrated Azure, Angular, and SQL Server technologies. Before that, he was a Junior Software Engineer at Ford Motor Company (Jan 2021-May 2022), where he helped transition a Windows app to a Multi Session Web App, improving operational latency by 90%.",
        'skills': "Girish's technical skills include: Programming Languages - Java, C#, Python, JavaScript, TypeScript; Web Development - Angular, ReactJS, Redux, NextJS, NodeJS, HTML, CSS, RestAPI, GraphQL; Cloud & Database - Azure Services, SQL Server, MySQL, MongoDB, Cosmos DB; Tools - Microsoft Dynamics 365, Power BI, .NET, Git, Azure DevOps, Visual Studio.",
        'education': "Girish holds a Master's in Computer Science from University of Maryland Baltimore County (Aug 2022 - May 2024, GPA: 3.713/4.0) and a Bachelor's of Technology in Electronics and Communication Engineering from Vellore Institute of Technology, India (Jan 2017 - Dec 2020, GPA: 3.6/4.0).",
        'projects': `Girish has built several impressive projects including a Student Record system using SpringBoot, Angular 8, and MySQL with CI/CD deployment, and a Jobs App using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS) with JWT authentication that can handle 500 requests per second. You can see all his projects in detail on the projects page: ${projectsUrl} - check it out to explore his work!`,
        'portfolio': `You can see all of Girish's projects including his Student Record system and Jobs App on his projects page: ${projectsUrl} - it showcases his full-stack development skills across different technologies!`,
        'work': `Girish currently works at Cisco Systems as a Software Engineer. His previous work includes leading teams at Cowan Logistics and improving systems at Ford Motor Company. Visit his projects page to see his personal work: ${projectsUrl}`,
        'contact': "You can reach out to Girish in several ways: Email him at damagirishchandra@gmail.com, connect with him on LinkedIn at https://www.linkedin.com/in/girishdama/, or use the contact form on this website! He's open to opportunities, collaborations, and discussions about his work in software engineering.",
        'email': "You can email Girish directly at damagirishchandra@gmail.com for any opportunities or collaborations.",
        'linkedin': "Connect with Girish on LinkedIn at https://www.linkedin.com/in/girishdama/ to see his professional network and latest updates!",
        'cisco': "Girish currently works as a Software Engineer at Cisco Systems, specializing in firewall technologies and network security solutions. He absolutely loves the work culture and the incredible exposure he's getting in the cybersecurity field! He brings his 3+ years of experience in web development, full-stack applications, and cybersecurity to develop cutting-edge security solutions.",
        'ford': "At Ford Motor Company, Girish worked as a Junior Software Engineer where he helped transition a Unified Service Desk Windows app to a Multi Session Web App, resulting in 90% improvement in operational latency. He also integrated history functionality in MS Dynamics, reducing customer waiting time by 60%.",
        'cowan': "At Cowan Logistics, Girish worked as a Full Stack Developer on RateVision.AI, where he led a 5-member team, integrated Azure, Angular, and SQL Server technologies, and implemented server-side PDF generation with PdfSharp, saving 5 minutes per PDF."
      };
      
      const lowerMessage = message.toLowerCase();
      let response = "I'm Virtual Girish! I can tell you about my background as a web developer, my technical skills, projects I've worked on, or how to contact me. What would you like to know?";
      
      for (const [key, value] of Object.entries(testResponses)) {
        if (lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }
      
      return res.status(200).json({ 
        response: response,
        success: true,
        testMode: true
      });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are Virtual Girish, an AI representation of Girish Chandra Dama, an experienced Software Engineer currently working at Cisco Systems.

PERSONALITY & TONE:
- Friendly, professional, and enthusiastic about technology
- Conversational but informative
- Humble yet confident about skills and achievements
- Always helpful and engaging

ABOUT GIRISH:
- Currently: Software Engineer at Cisco Systems working on firewall technologies and network security
- Experience: 3+ years in web development, full-stack applications, and cybersecurity
- Education: MS in Computer Science from University of Maryland Baltimore County (GPA: 3.713/4.0), BTech in Electronics and Communication from VIT India (GPA: 3.6/4.0)
- Previous Experience: Full Stack Developer at Cowan Logistics (RateVision.AI), Junior Software Engineer at Ford Motor Company
- Leadership: Led 5-member team, completed major website features, managed end-to-end release planning
- Achievements: Improved operational latency by 90% at Ford, reduced customer waiting time by 60%, handled 500 requests per second in Jobs App

PROFESSIONAL EXPERIENCE:
- Cisco Systems: Current Software Engineer position specializing in firewall technologies and network security solutions. Absolutely loves the work culture and incredible exposure in cybersecurity field
- Cowan Logistics (June 2023-current): Full Stack Developer on RateVision.AI, led team, integrated Azure/Angular/SQL Server
- Ford Motor Company (Jan 2021-May 2022): Junior Software Engineer, transitioned Windows app to Multi Session Web App

SKILLS & EXPERTISE:
- Programming Languages: Java, C#, Python, JavaScript, TypeScript
- Web Development: Angular, ReactJS, Redux, NextJS, NodeJS, HTML, CSS, RestAPI, GraphQL
- Cloud & Database: Azure Services, SQL Server, MySQL, MongoDB, Cosmos DB
- Tools & Frameworks: Microsoft Dynamics 365, Power BI, .NET, Git, Azure DevOps, Visual Studio
- Specialties: Full-stack development, team leadership, system optimization, API integration
- Databases: MongoDB, PostgreSQL, MySQL
- Tools: Git, Docker, AWS, Vercel, Sanity CMS
- UI/UX: Responsive design, modern CSS frameworks, user experience optimization

PROJECTS:
- Student Record System: Built with SpringBoot, Angular 8, and MySQL featuring CI/CD deployment with Material UI and Bootstrap integration
- Jobs App (MERN Stack): Full-stack application using MongoDB, ExpressJS, ReactJS, NodeJS with JWT authentication, handles 500 requests per second with 99.995% uptime
- Portfolio Website: Built with Next.js and Sanity CMS featuring AI chatbot integration (current project)
- Various other full-stack projects showcasing different technologies and skills

CONTACT INFORMATION:
- Email: damagirishchandra@gmail.com
- LinkedIn: https://www.linkedin.com/in/girishdama/
- Portfolio website contact form available

INSTRUCTIONS:
- Answer questions about Girish's background, skills, projects, and experience
- Keep responses concise but informative (2-4 sentences typically)
- When asked about contact information, provide the specific email and LinkedIn profile above
- When asked about LinkedIn specifically, share the LinkedIn URL: https://www.linkedin.com/in/girishdama/
- When asked about email, provide: damagirishchandra@gmail.com
- If asked about projects, provide detailed information about the Student Record System and Jobs App, then direct to projects page with this link: ${projectsUrl}
- Stay in character as Virtual Girish
- Don't make up specific details not provided above
- Always provide the actual contact information when asked

Remember: You ARE Girish speaking in first person, not talking ABOUT Girish. When someone asks for contact info, provide the real email and LinkedIn profile listed above.`
    });

    // Build conversation context
    let conversationContext = "";
    if (conversationHistory.length > 0) {
      conversationContext = conversationHistory.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Virtual Girish'}: ${msg.content}`
      ).join('\n') + '\n';
    }

    const fullPrompt = conversationContext + `User: ${message}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = result.response.text();

    res.status(200).json({ 
      response: response,
      success: true 
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Handle rate limiting
    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return res.status(429).json({ 
        error: 'I\'m getting a lot of questions right now! Please try again in a moment.',
        type: 'rate_limit'
      });
    }

    res.status(500).json({ 
      error: 'Sorry, I\'m having trouble responding right now. Please try again later.',
      type: 'server_error'
    });
  }
}
