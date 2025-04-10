// CookieConsentBanner.tsx
import React, { useState, useEffect } from 'react';

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 text-center z-50">
      This website uses cookies to enhance the user experience.{' '}
      <button
        onClick={acceptCookies}
        className="ml-2 bg-white text-black px-3 py-1 rounded"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsentBanner;
