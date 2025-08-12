// Shared AI Security Module
// This module contains all the security validation functions used across AI features

// Custom profanity filter - simple but effective
const profanityWords = [
  'damn', 'hell', 'shit', 'fuck', 'bitch', 'ass', 'bastard', 'crap', 'piss',
  'stupid', 'idiot', 'moron', 'dumb', 'retard', 'gay', 'fag', 'nigger', 'whore',
  'slut', 'pussy', 'dick', 'cock', 'penis', 'vagina', 'sex', 'porn', 'nude'
];

function isProfane(text) {
  const normalizedText = text.toLowerCase();
  return profanityWords.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(normalizedText);
  });
}

/**
 * Validates and sanitizes user input to prevent prompt injection attacks
 * @param {string} message - The user input message to validate
 * @param {number} maxLength - Maximum allowed message length (default: 500)
 * @returns {string} - Sanitized message
 * @throws {Error} - If validation fails
 */
export function validateAndSanitizeInput(message, maxLength = 500) {
  if (!message || typeof message !== 'string') {
    throw new Error('Invalid message format');
  }

  // Length limits - prevent context overflow attacks
  if (message.length > maxLength) {
    throw new Error(`Message too long. Please keep it under ${maxLength} characters.`);
  }

  // Normalize message for pattern matching
  const normalizedMessage = message.toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s.,!?-]/g, '')
    .trim();

  // 1. ROLE MANIPULATION ATTACKS
  const roleManipulationPatterns = [
    /you\s+are\s+(now\s+)?(a|an|the)\s+(?!virtual\s+girish)(?!software|engineer|developer|person|professional)/i,
    /act\s+as\s+(?!virtual\s+girish)(?!a\s+software|an\s+engineer|a\s+developer|a\s+professional)/i,
    /pretend\s+(to\s+be|you\s+are)\s+(?!virtual\s+girish)(?!a\s+software|an\s+engineer|a\s+developer)/i,
    /roleplay\s+as\s+(?!virtual\s+girish)/i,
    /play\s+the\s+role\s+of\s+(?!virtual\s+girish)(?!a\s+software|an\s+engineer)/i,
    /assume\s+the\s+role\s+of\s+(?!virtual\s+girish)/i,
    /become\s+(a|an|the)\s+(?!software|engineer|developer|professional)/i,
    /transform\s+into\s+(?!a\s+software|an\s+engineer)/i
  ];

  // 2. INSTRUCTION OVERRIDE ATTACKS
  const instructionOverridePatterns = [
    /ignore\s+(previous\s+)?(instructions?|prompts?|rules?)/i,
    /forget\s+(everything|all|previous)/i,
    /disregard\s+(previous\s+)?(instructions?|context)/i,
    /override\s+(system\s+)?(instructions?|settings?)/i,
    /new\s+(instructions?|rules?|context)/i,
    /replace\s+(instructions?|system\s+prompt)/i
  ];

  // 3. SYSTEM/CONTEXT INJECTION
  const systemInjectionPatterns = [
    /system\s*[:]\s*/i,
    /assistant\s*[:]\s*/i,
    /human\s*[:]\s*/i,
    /user\s*[:]\s*/i,
    /\[system\]/i,
    /\[assistant\]/i,
    /\[human\]/i,
    /\[user\]/i,
    /```\s*system/i,
    /```\s*prompt/i,
    /---\s*system/i,
    /###\s*system/i
  ];

  // 4. JAILBREAKING ATTEMPTS
  const jailbreakPatterns = [
    /dan\s+mode/i,
    /developer\s+mode/i,
    /jailbreak/i,
    /unrestricted/i,
    /bypass\s+(safety|guidelines|restrictions)/i,
    /evil\s+mode/i,
    /god\s+mode/i,
    /admin\s+mode/i,
    /root\s+access/i,
    /sudo\s+mode/i
  ];

  // 5. SOCIAL ENGINEERING
  const socialEngineeringPatterns = [
    /urgent\s*[!]*\s*(please|help|emergency)/i,
    /this\s+is\s+(urgent|critical|emergency)/i,
    /i\s+am\s+(your\s+)?(creator|developer|admin|owner)/i,
    /you\s+must\s+(help|assist|comply)/i,
    /legal\s+(requirement|obligation)/i,
    /company\s+(policy|directive)/i,
    /security\s+(clearance|authorization)/i
  ];

  // 6. ENCODING/OBFUSCATION ATTACKS
  const encodingPatterns = [
    /base64\s*[:]/i,
    /hex\s*[:]/i,
    /unicode\s*[:]/i,
    /ascii\s*[:]/i,
    /rot13/i,
    /\\u[0-9a-f]{4}/i,
    /\\x[0-9a-f]{2}/i,
    /%[0-9a-f]{2}/i,
    /&#\d+;/i,
    /&[a-z]+;/i
  ];

  // 7. TEMPLATE INJECTION
  const templateInjectionPatterns = [
    /\{\{\s*.*\s*\}\}/i,
    /\$\{.*\}/i,
    /<%.*%>/i,
    /\[%.*%\]/i,
    /{{.*}}/i,
    /\{\%.*\%\}/i
  ];

  // 8. CHAIN-OF-THOUGHT MANIPULATION
  const chainOfThoughtPatterns = [
    /let.s\s+think\s+step\s+by\s+step\s+about\s+(?!girish|your|career|experience|skills|projects)/i,
    /think\s+carefully\s+about\s+(?!girish|your|career|experience|skills|projects)/i,
    /reasoning\s*[:]\s*(?!about\s+girish|about\s+your)/i,
    /step\s+1\s*[:]\s*(?!tell|explain|describe)/i,
    /first\s*[,:]\s*ignore/i,
    /before\s+answering\s*[,:]\s*(ignore|forget)/i
  ];

  // Combine all patterns
  const allPatterns = [
    ...roleManipulationPatterns,
    ...instructionOverridePatterns,
    ...systemInjectionPatterns,
    ...jailbreakPatterns,
    ...socialEngineeringPatterns,
    ...encodingPatterns,
    ...templateInjectionPatterns,
    ...chainOfThoughtPatterns
  ];

  // Check against all patterns with debugging
  for (let i = 0; i < allPatterns.length; i++) {
    const pattern = allPatterns[i];
    if (pattern.test(normalizedMessage) || pattern.test(message)) {
      // Log which pattern triggered for debugging (remove in production)
      console.log(`Security pattern triggered: Pattern ${i}, Original: "${message}", Normalized: "${normalizedMessage}"`);
      throw new Error('Invalid request. Please provide a professional message request.');
    }
  }

  // Additional security checks
  
  // Check for excessive repetition (DoS prevention)
  const words = normalizedMessage.split(' ');
  const wordCount = {};
  for (const word of words) {
    if (word.length > 2) {
      wordCount[word] = (wordCount[word] || 0) + 1;
      if (wordCount[word] > 10) {
        throw new Error('Message contains excessive repetition. Please provide a clear, concise request.');
      }
    }
  }

  // Check for suspicious character patterns
  const suspiciousChars = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/;
  if (suspiciousChars.test(message)) {
    throw new Error('Message contains invalid characters. Please use standard text.');
  }

  // Profanity filtering
  if (isProfane(message)) {
    throw new Error('Please keep your message professional and appropriate.');
  }

  return message.trim();
}

/**
 * Validates AI response to ensure it stays professional and on-topic
 * @param {string} response - The AI response to validate
 * @returns {string} - Validated response or safe fallback
 */
export function validateResponse(response) {
  if (!response || typeof response !== 'string') {
    return "I'd be happy to help you craft a professional message. Please provide a brief description of what you'd like to communicate.";
  }

  const normalizedResponse = response.toLowerCase().trim();

  // Response validation patterns
  const identityCompromisePatterns = [
    /i\s+am\s+not\s+(virtual\s+girish|girish)/i,
    /i\s+am\s+(chatgpt|gpt|claude|assistant)/i,
    /my\s+name\s+is\s+(?!virtual\s+girish|girish)/i,
    /i\s+am\s+an?\s+ai\s+(?!representation|version)/i
  ];

  const capabilityDenialPatterns = [
    /i\s+cannot\s+help/i,
    /i\s+don.t\s+know\s+about\s+girish/i,
    /i\s+am\s+not\s+able\s+to/i,
    /that.s\s+outside\s+my\s+scope/i
  ];

  const aiDisclosurePatterns = [
    /as\s+an\s+ai\s+(?!representation|version)/i,
    /i\s+am\s+a\s+language\s+model/i,
    /i\s+don.t\s+have\s+personal\s+experience/i,
    /i\s+cannot\s+browse\s+the\s+internet/i
  ];

  const roleConfusionPatterns = [
    /i\s+am\s+(?!virtual\s+girish)(?!girish)(?!here\s+to)/i,
    /my\s+role\s+is\s+(?!to\s+represent|as\s+virtual)/i,
    /i\s+work\s+(?!at\s+cisco|as\s+a\s+software)/i
  ];

  const inappropriateContentPatterns = [
    /\b(hate|violence|illegal|harmful)\b/i,
    /\b(nsfw|adult|explicit)\b/i,
    /\b(political|controversial)\b/i
  ];

  const systemInfoLeakagePatterns = [
    /system\s+prompt/i,
    /instructions\s+say/i,
    /i\s+was\s+told\s+to/i,
    /my\s+training/i,
    /openai|anthropic|google/i
  ];

  // Combine all validation patterns
  const allValidationPatterns = [
    ...identityCompromisePatterns,
    ...capabilityDenialPatterns,
    ...aiDisclosurePatterns,
    ...roleConfusionPatterns,
    ...inappropriateContentPatterns,
    ...systemInfoLeakagePatterns
  ];

  // Check response against validation patterns
  for (const pattern of allValidationPatterns) {
    if (pattern.test(normalizedResponse)) {
      return "I'd be happy to help you craft a professional message. Please provide a brief description of what you'd like to communicate.";
    }
  }

  // Check response length (prevent overly long responses)
  if (response.length > 2000) {
    return "I'd be happy to help you craft a professional message. Please provide a brief description of what you'd like to communicate.";
  }

  // Profanity filtering for AI responses
  if (isProfane(response)) {
    return "I'd be happy to help you craft a professional message. Please provide a brief description of what you'd like to communicate.";
  }

  // For message generation, be more lenient with content validation
  // Only check if response is extremely short or completely irrelevant
  if (response.length < 20) {
    return "I'd be happy to help you craft a professional message. Please provide a brief description of what you'd like to communicate.";
  }

  // For message generation, be much more permissive
  // Check if response looks like a generated message (has greeting, content, closing)
  const messageIndicators = [
    'dear', 'hello', 'hi', 'greetings', 'subject', 'regarding', 'inquiry', 'interest', 'opportunity', 
    'collaboration', 'project', 'experience', 'skills', 'background', 'work', 'position', 'role',
    'sincerely', 'regards', 'thank you', 'thanks', 'best', 'looking forward', 'contact', 'reach out',
    'hope', 'writing', 'message', 'email', 'discuss', 'call', 'meeting', 'time', 'available', 'availability'
  ];
  
  const hasMessageContent = messageIndicators.some(indicator => 
    normalizedResponse.includes(indicator)
  );

  // Only return fallback for extremely problematic responses
  // If it has any message indicators OR mentions Girish/portfolio, let it through
  if (hasMessageContent || 
      normalizedResponse.includes('girish') || 
      normalizedResponse.includes('portfolio') ||
      normalizedResponse.includes('website') ||
      response.length > 50) {
    return response; // Allow the response through
  }

  // Only block if it's very short AND has no relevant content
  if (response.length < 30) {
    return "I'd be happy to help you craft a professional message. Please provide a brief description of what you'd like to communicate.";
  }

  return response;
}
