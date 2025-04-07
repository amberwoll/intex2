"use client";
import * as React from "react";

const SignupPage: React.FC = () => {
  return (
    <main className="login-container">
      <nav className="back-button" aria-label="Navigation">
        <button className="back-button-icon" aria-label="Go back">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="back-arrow"
          >
            <path
              d="M11.8606 22.2372L3.42738 13.7954M3.42738 13.7954L11.8691 5.36219M3.42738 13.7954L23.6774 13.8057"
              stroke="#EBFAFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>

      <div className="content-wrapper">
        <section className="login-section" aria-label="Signup form">
          <header className="welcome-header">
            <h1 className="welcome-title">Create Account</h1>
          </header>

          <nav className="auth-tabs" aria-label="Authentication options">
            <div className="tab-item">
              <span className="tab-text">LOGIN</span>
            </div>
            <div className="tab-item active">
              <span className="tab-text">SIGNUP</span>
              <div className="active-indicator" aria-hidden="true" />
            </div>
          </nav>

          <form className="login-form" aria-label="Signup form">
            {['User', 'Password', 'Age', 'Gender', 'Phone', 'City', 'State', 'Zip'].map((field, i) => (
              <div className="form-field" key={i}>
                <input
                  type={field === 'Password' ? 'password' : 'text'}
                  placeholder={field}
                  className="input-field"
                  aria-label={field}
                />
              </div>
            ))}

            <button type="submit" className="login-button">
              SIGN UP
            </button>
          </form>
        </section>

        <div className="background-wrapper" aria-hidden="true">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/64695fe3963cca30d781a469a70a792e374a17d3"
            alt="Signup background"
            className="background-image"
          />
        </div>
      </div>

      <style react-jsx>{`
        .login-container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(249deg, #030a1b 68.64%, #9747ff 206.69%);
          position: relative;
          font-family: "Lato", sans-serif;
          overflow: hidden;
        }

        .back-button {
          position: absolute;
          top: 13px;
          left: 21px;
          z-index: 10;
        }

        .back-arrow {
          width: 27px;
          height: 27px;
          transform: rotate(90deg);
        }

        .content-wrapper {
          display: flex;
          min-height: 100vh;
          padding: 20px;
          position: relative;
        }

        .login-section {
          padding: 87px 28px;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .welcome-header {
          width: 100%;
          text-align: center;
          margin-bottom: 26px;
        }

        .welcome-title {
          color: #ebfaff;
          font-size: 72px;
          font-weight: 700;
          margin: 0;
        }

        .auth-tabs {
          display: flex;
          justify-content: center;
          gap: 108px;
          margin-bottom: 85px;
        }

        .tab-item {
          position: relative;
          cursor: pointer;
        }

        .tab-text {
          color: #ebfaff;
          font-size: 24px;
          font-weight: 700;
        }

        .active-indicator {
          width: 100%;
          height: 4px;
          border-radius: 50px;
          filter: blur(3px);
          margin-top: 5px;
          position: absolute;
          background-color: #228ee5;
        }

        .login-form {
          width: 100%;
        }

        .form-field {
          position: relative;
          margin-bottom: 32px;
        }

        .input-field {
          width: 100%;
          padding: 22px 20px;
          background: transparent;
          border: 1px solid #ebfaff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 18px;
        }

        .login-button {
          width: 160px;
          height: 48px;
          border: 1px solid #fff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 16px;
          margin: 0 auto;
          cursor: pointer;
          background-color: #228ee5;
          display: block;
        }

        .background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.3;
          z-index: 1;
        }

        .background-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .login-container {
            max-width: 991px;
          }

          .content-wrapper {
            flex-direction: column;
          }

          .login-section {
            width: 100%;
            padding: 40px 20px;
          }
        }

        @media (max-width: 640px) {
          .login-container {
            max-width: 640px;
          }

          .welcome-title {
            font-size: 48px;
          }

          .auth-tabs {
            gap: 60px;
          }

          .tab-text {
            font-size: 20px;
          }

          .login-button {
            width: 100%;
          }

          .background-wrapper {
            display: none;
          }
        }
      `}</style>
    </main>
  );
};

export default SignupPage;
