"use client";
import * as React from "react";

const SignupPage: React.FC = () => {
  return (
    <main className="signup-container">
      <div className="content-wrapper">
        <section className="signup-section" aria-label="Signup form">
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

          <form className="signup-form" aria-label="Signup form">
            <div className="form-grid">
              <div className="form-field">
                <input
                  type="text"
                  placeholder="User"
                  className="input-field"
                  aria-label="User"
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Name"
                  className="input-field"
                  aria-label="Name"
                />
              </div>
              <div className="form-field">
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  aria-label="Password"
                />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  aria-label="Email"
                />
              </div>
              <div className="form-field">
                <input
                  type="number"
                  placeholder="Age"
                  className="input-field"
                  aria-label="Age"
                />
              </div>
              <div className="form-field">
                <select className="input-field" aria-label="Gender" defaultValue="">
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Phone"
                  className="input-field"
                  aria-label="Phone"
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="City"
                  className="input-field"
                  aria-label="City"
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="State"
                  className="input-field"
                  aria-label="State"
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Zip"
                  className="input-field"
                  aria-label="Zip"
                />
              </div>
            </div>

            <div className="checkbox-section">
              <p className="disclaimer">
                We are collecting this info to ensure we are giving you unique value compared to other streaming services.
              </p>
              <div className="checkbox-grid">
                {['Netflix', 'Hulu', 'Disney+', 'Prime Video', 'HBO Max', 'Apple TV+'].map((service) => (
                  <label key={service} className="checkbox-label">
                    <input type="checkbox" name="streamingServices" value={service} /> {service}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="signup-button">
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
        .signup-container {
          height: 100vh;
          width: 100vw;
          background: linear-gradient(249deg, #030a1b 68.64%, #9747ff 206.69%);
          font-family: "Lato", sans-serif;
          overflow: hidden;
          position: relative;
        }

        .content-wrapper {
          display: flex;
          height: 100vh;
          padding: 20px;
          position: relative;
        }

        .signup-section {
          padding: 40px 20px;
          max-width: 1000px;
          width: 100%;
          margin: auto;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .welcome-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .welcome-title {
          color: #ebfaff;
          font-size: 48px;
          font-weight: 700;
          margin: 0;
        }

        .auth-tabs {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-bottom: 40px;
        }

        .tab-item {
          position: relative;
          cursor: pointer;
        }

        .tab-text {
          color: #ebfaff;
          font-size: 20px;
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

        .signup-form {
          width: 100%;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 30px 40px;
          margin-bottom: 32px;
        }

        .form-field {
          position: relative;
          width: 100%;
        }

        .input-field {
          width: 100%;
          padding: 16px;
          background: transparent;
          border: 1px solid #ebfaff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 16px;
          box-sizing: border-box;
        }

        .signup-button {
          width: 160px;
          height: 48px;
          border: 1px solid #fff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 16px;
          margin: 32px auto 0;
          cursor: pointer;
          background-color: #228ee5;
          display: block;
        }

        .checkbox-section {
          margin-top: 16px;
          color: #ebfaff;
          width: 100%;
        }

        .disclaimer {
          margin-bottom: 16px;
          font-size: 14px;
          text-align: center;
        }

        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          justify-items: center;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
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

        @media (max-width: 640px) {
          .welcome-title {
            font-size: 36px;
          }

          .auth-tabs {
            gap: 40px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .signup-button {
            width: 100%;
          }

          .checkbox-grid {
            grid-template-columns: 1fr;
            justify-items: start;
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
