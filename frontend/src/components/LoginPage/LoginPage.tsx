'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSignupClick = () => {
    navigate('/create-account');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      return setError('Please fill in all fields.');
    }

    try {
      const response = await fetch(
        'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/login?useCookies=true',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      const contentLength = response.headers.get('content-length');
      let data = null;
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/movies');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Network error. Please try again.');
    }
  };

  return (
    <main className="signup-container">
            
      <div className="content-wrapper">
                
        <section className="signup-section" aria-label="Login form">
                    
          <header className="welcome-header">
                        <h1 className="welcome-title">Welcome Back</h1>
                      
          </header>
                    
          <nav className="auth-tabs" aria-label="Authentication options">
                        
            <div className="tab-item active">
                            <span className="tab-text">LOGIN</span>
                            
              <div className="active-indicator" aria-hidden="true" />
                          
            </div>
                        
            <div className="tab-item" onClick={handleSignupClick}>
                            <span className="tab-text">SIGNUP</span>
                          
            </div>
                      
          </nav>
                    
          <form className="signup-form" onSubmit={handleSubmit}>
                        
            <div className="form-grid">
                            
              <div className="form-field">
                                
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input-field"
                  value={email}
                  onChange={handleChange}
                />
                              
              </div>
                            
              <div className="form-field">
                                
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input-field"
                  value={password}
                  onChange={handleChange}
                />
                              
              </div>
                            
              <div className="form-field">
                                
                <label className="checkbox-label">
                                    
                  <input
                    type="checkbox"
                    name="rememberme"
                    checked={rememberme}
                    onChange={handleChange}
                  />
                                    Remember me                 
                </label>
                              
              </div>
                          
            </div>
                        
            <button type="submit" className="signup-button">
                            LOGIN             
            </button>
                        
            {error && (
              <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
            )}
                      
          </form>
                  
        </section>
              
      </div>
            
      <style>{`
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
          grid-template-columns: 1fr;
          gap: 30px;
          margin-bottom: 32px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
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
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #ebfaff;
        }
        @media (max-width: 640px) {
          .welcome-title {
            font-size: 36px;
          }
          .auth-tabs {
            gap: 40px;
          }
          .signup-button {
            width: 100%;
          }
        }
      `}</style>
          
    </main>
  );
};

export default LoginPage;
