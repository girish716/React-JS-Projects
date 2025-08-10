import React, { useState, useEffect } from 'react';

const SecurityAwareness = () => {
  const [userInfo, setUserInfo] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);

  useEffect(() => {
    const gatherInfo = () => {
      const info = {
        // Browser information
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages?.join(', '),
        cookieEnabled: navigator.cookieEnabled,
        
        // Screen information
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        
        // Connection information (if available)
        connection: navigator.connection?.effectiveType || 'Unknown',
        
        // Location information (approximate based on timezone)
        approximateLocation: getApproximateLocation(),
        
        // Browser capabilities
        localStorage: typeof(Storage) !== "undefined",
        sessionStorage: typeof(Storage) !== "undefined",
        
        // Device information
        deviceMemory: navigator.deviceMemory || 'Unknown',
        hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
        
        // Time information
        visitTime: new Date().toLocaleString(),
      };
      
      setUserInfo(info);
      
      // Show notification after 3 seconds
      setTimeout(() => {
        setShowNotification(true);
      }, 3000);
    };

    gatherInfo();
  }, []);

  const getApproximateLocation = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locationMap = {
      'America/New_York': 'Eastern US',
      'America/Chicago': 'Central US',
      'America/Denver': 'Mountain US',
      'America/Los_Angeles': 'Pacific US',
      'Europe/London': 'United Kingdom',
      'Europe/Paris': 'Central Europe',
      'Asia/Tokyo': 'Japan',
      'Asia/Shanghai': 'China',
      'Asia/Kolkata': 'India',
      'Australia/Sydney': 'Australia',
    };
    return locationMap[timezone] || timezone.split('/')[1]?.replace('_', ' ') || 'Unknown';
  };

  const getBrowserName = (userAgent) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown Browser';
  };

  const getOperatingSystem = (platform, userAgent) => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    return platform || 'Unknown OS';
  };

  if (!showNotification) return null;

  return (
    <>
      {/* Notification Toast */}
      {!showFullModal && (
        <div className="security-notification" onClick={() => setShowFullModal(true)}>
          <div className="notification-content">
            <span className="notification-icon">🔒</span>
            <div className="notification-text">
              <strong>Security Notice</strong>
              <p>Your browser shared information about you. Click to see what.</p>
            </div>
            <button 
              className="notification-close" 
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Full Modal (when notification is clicked) */}
      {showFullModal && (
        <div className="security-awareness-overlay">
          <div className="security-awareness-modal">
            <div className="security-header">
              <h3>🔒 Security Awareness Notice</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setShowFullModal(false);
                  setShowNotification(false);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="security-content">
              <p className="warning-text">
                <strong>Did you know?</strong> Your browser just shared this information about you:
              </p>
              
              <div className="info-grid">
                <div className="info-item">
                  <strong>Browser:</strong> {getBrowserName(userInfo.userAgent)}
                </div>
                <div className="info-item">
                  <strong>Operating System:</strong> {getOperatingSystem(userInfo.platform, userInfo.userAgent)}
                </div>
                <div className="info-item">
                  <strong>Screen Resolution:</strong> {userInfo.screenResolution}
                </div>
                <div className="info-item">
                  <strong>Approximate Location:</strong> {userInfo.approximateLocation}
                </div>
                <div className="info-item">
                  <strong>Language:</strong> {userInfo.language}
                </div>
                <div className="info-item">
                  <strong>Visit Time:</strong> {userInfo.visitTime}
                </div>
              </div>
              
              <div className="security-message">
                <p>
                  <strong>🛡️ Security Tip:</strong> This information can be used to create a unique "fingerprint" 
                  of your device. Always be cautious about what websites you visit and consider using:
                </p>
                <ul>
                  <li>VPN services for location privacy</li>
                  <li>Browser privacy modes</li>
                  <li>Ad blockers and tracking protection</li>
                  <li>Regular clearing of cookies and cache</li>
                </ul>
              </div>
              
              <div className="security-footer">
                <p><em>This demonstration shows how much information websites can gather. 
                As a security-focused developer, I believe in transparency and user awareness.</em></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecurityAwareness;
