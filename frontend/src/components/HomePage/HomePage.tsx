'use client';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Cookie consent state
  const [isCookieConsentVisible, setIsCookieConsentVisible] =
    React.useState<boolean>(false);

  // Check for stored cookie consent when the component mounts
  React.useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent');
    const consentExpiration = localStorage.getItem('cookieConsentExpiration');

    // If consent has been given, check if it's expired
    if (consentGiven && consentExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(consentExpiration)) {
        // If expired (after 5 minutes), reset the cookie consent and show the popup again
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieConsentExpiration');
        setIsCookieConsentVisible(true);
      }
    } else {
      setIsCookieConsentVisible(true); // Show popup if no consent found
    }
  }, []);

  // Handle the consent button click
  const handleCookieConsent = () => {
    const expirationTime = new Date().getTime() + 5 * 60 * 1000; // Set expiry to 5 minutes
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentExpiration', expirationTime.toString()); // Store expiration time
    setIsCookieConsentVisible(false); // Hide consent notification
  };

  // Handle the decline button click
  const handleCookieDecline = () => {
    const expirationTime = new Date().getTime() + 5 * 60 * 1000; // Set expiry to 5 minutes
    localStorage.setItem('cookieConsent', 'false');
    localStorage.setItem('cookieConsentExpiration', expirationTime.toString()); // Store expiration time
    setIsCookieConsentVisible(false); // Hide consent notification
  };

  // Handle button click for Create Account
  const handleCreateClick = () => {
    navigate('/create-account');
  };

  // Handle button click for Login
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <main className="home-container">
      <div className="background-image" aria-hidden="true"></div>
      <div className="content-wrapper">
        <section className="home-section">
          <header className="home-header">
            <h1 className="home-title">CineNiche</h1>
            <p className="home-subtitle">
              Discover the movies you were meant to love
            </p>
          </header>

          <div className="action-box">
            <button className="action-button" onClick={handleCreateClick}>
              Create
            </button>
            <button className="action-button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </section>
      </div>

      {isCookieConsentVisible && (
        <div className="cookie-consent">
          <p>
            We use cookies to enhance your browsing experience. By clicking
            "Accept All" you consent to our use of cookies.{' '}
            <a href="/privacy" className="privacy-link">
              Policy
            </a>
            <br />
            <br />
            <button onClick={handleCookieConsent}>Accept All</button>
            <button onClick={handleCookieDecline}>Reject All</button>
          </p>
        </div>
      )}

      <style react-jsx>{`
        .home-container {
          height: 100vh;
          width: 100vw;
          position: relative;
          font-family: "Lato", sans-serif;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/dist/assets/Home.png');
          background-size: cover;
          background-position: center;
          background-color: rgba(0, 0, 0, 0.2); /* dark overlay */
          background-blend-mode: darken;
          z-index: 1;
        }

        .content-wrapper {
          max-width: 1000px;
          padding: 20px;
          width: 100%;
          z-index: 2;
        }

        .home-section {
          text-align: center;
          color: #ebfaff;
        }

        .home-title {
          font-size: 72px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .home-subtitle {
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 60px;
        }

        .action-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .action-button {
          width: 240px;
          height: 64px;
          border: 1px solid #fff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 20px;
          cursor: pointer;
          background-color: #228ee5;
          transition: background-color 0.3s ease;
        }

        .action-button:hover {
          background-color: #1a6bb9;
        }

        .cookie-consent {
          position: fixed;
          bottom: 20px;
          right: 20px;  /* Change to 'left' for bottom-left corner */
          background-color: #333;
          color: white;
          text-align: center;
          padding: 16px;
          width: 280px;
          border-radius: 10px;
          z-index: 3;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cookie-consent p {
          margin: 0 0 12px 0; /* spacing between text and buttons */
          line-height: 1.4;
        }

        .cookie-consent button {
          background-color: #228ee5;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          margin: 0 10px;
        }

        .cookie-consent a {
          color: #a4d4ff;
          text-decoration: underline;
        }

        .cookie-consent button:hover {
          background-color: #1a6bb9;
        }

        .privacy-link {
          color: #7ec9ff;
          text-decoration: underline;
          margin-left: 6px;
          cursor: pointer;
        }

        .privacy-link:hover {
          color: #a6dcff;
        }

        @media (max-width: 640px) {
          .home-title {
            font-size: 48px;
          }

          .home-subtitle {
            font-size: 18px;
            margin-bottom: 40px;
          }

          .action-button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
};

export default HomePage;
