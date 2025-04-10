'use client';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Handle button click for Create Account
const handleSignupClick = (navigate: ReturnType<typeof useNavigate>) => {
  navigate('/create-account');
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
  
    const loginUrl = 'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/login';
  
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const text = await response.text(); // Always read once
      if (!response.ok) {
        // Try to parse error if it's JSON
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData?.message || 'Invalid email or password.');
        } catch {
          throw new Error(text || 'Login failed.');
        }
      }
  
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Invalid server response format.');
      }
  
      const accessToken = data.accessToken;
      if (!accessToken) throw new Error('No token received');
  
      localStorage.setItem('accessToken', accessToken);
      navigate('/movies');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Login error:', error);
    }
  };
  

  return (
    <main className="login-container">
      <div className="content-wrapper">
        <section className="login-section" aria-label="Login form">
          <header className="welcome-header">
            <h1 className="welcome-title">Welcome</h1>
          </header>

          <nav className="auth-tabs" aria-label="Authentication options">
            <div className="tab-item active">
              <span className="tab-text">LOGIN</span>
              <div className="active-indicator" aria-hidden="true" />
            </div>
            <div className="tab-item" onClick={() => handleSignupClick(navigate)}>
              <span className="tab-text">SIGNUP</span>
            </div>
          </nav>

          <form className="login-form" aria-label="Login form" onSubmit={handleSubmit}>
            <div className="form-field">
              <input
                type="text"
                placeholder="Email"
                className="input-field"
                aria-label="Email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                aria-label="Password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberme"
                name="rememberme"
                checked={rememberme}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberme">
                Remember me?
              </label>
              <br />
              <br />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>
        </section>

        <div className="background-wrapper" aria-hidden="true">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/64695fe3963cca30d781a469a70a792e374a17d3"
            alt="Login background"
            className="background-image"
          />
        </div>
      </div>

      <style>{`
        .login-container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(249deg, #030a1b 68.64%, #9747ff 206.69%);
          position: relative;
          font-family: "Lato", sans-serif;
          overflow: hidden;
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
          margin-bottom: 48px;
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

        .form-check-label {
          color: #ebfaff;
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

export default LoginPage;
