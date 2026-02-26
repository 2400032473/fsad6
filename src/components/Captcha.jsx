import { useState, useEffect } from 'react';
import '../styles/captcha.css';

function Captcha({ onVerify }) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
    setUserInput('');
    setIsVerified(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    
    if (value === captchaText) {
      setIsVerified(true);
      onVerify(true);
    } else {
      setIsVerified(false);
      onVerify(false);
    }
  };

  const renderCaptchaCanvas = () => {
    return (
      <div className="captcha-display">
        {captchaText.split('').map((char, index) => (
          <span
            key={index}
            style={{
              transform: `rotate(${(Math.random() - 0.5) * 20}deg)`,
              color: `hsl(${Math.random() * 360}, 70%, 50%)`,
              fontSize: `${20 + Math.random() * 8}px`,
              marginLeft: `${2 + Math.random() * 3}px`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="captcha-container">
      <div className="captcha-box">
        {renderCaptchaCanvas()}
        <button
          type="button"
          className="captcha-refresh"
          onClick={generateCaptcha}
          title="Refresh Captcha"
        >
          ↻
        </button>
      </div>
      <div className="captcha-input-group">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter the code above"
          className={`captcha-input ${isVerified ? 'verified' : ''}`}
        />
        {isVerified && <span className="captcha-check">✓</span>}
      </div>
    </div>
  );
}

export default Captcha;
