'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    age: '',
    gender: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    streamingServices: [] as string[],
  });
  const [error, setError] = useState('');
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const { checked } = e.target;
      setFormData((prev) => {
        const newServices = checked
          ? [...prev.streamingServices, value]
          : prev.streamingServices.filter((s) => s !== value);
        return { ...prev, streamingServices: newServices };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      email,
      password,
      confirmPassword,
      name,
      age,
      gender,
      phone,
      city,
      state,
      zip,
      streamingServices,
    } = formData;
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !age ||
      !gender ||
      !phone ||
      !city ||
      !state ||
      !zip
    ) {
      return setError('Please fill in all fields.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError('Please enter a valid email address.');
    }
    if (password.length <= 18) {
      return setError('Password must be longer than 18 characters.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (!/^\d{1,3}$/.test(age)) {
      return setError('Age must be a number with up to 3 digits.');
    }
    if (!/^\d+$/.test(zip)) {
      return setError('Zip must be a numeric value.');
    }
    try {
      const registerResponse = await fetch(
        'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/register',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
          }),
        }
      );
      if (!registerResponse.ok) {
        return setError(
          'Failed to register user. Email might already be taken.'
        );
      }
      const addDetailsResponse = await fetch(
        'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/MoviesUser/AddUserDetails',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            age: parseInt(age, 10) || null,
            gender,
            city,
            state,
            zip: parseInt(zip, 10) || null,
            privilegeLevel: 0,
            netflix: streamingServices.includes('Netflix') ? 1 : 0,
            hulu: streamingServices.includes('Hulu') ? 1 : 0,
            disney: streamingServices.includes('Disney+') ? 1 : 0,
            amazonPrime: streamingServices.includes('Prime Video') ? 1 : 0,
            max: streamingServices.includes('HBO Max') ? 1 : 0,
            appleTv: streamingServices.includes('Apple TV+') ? 1 : 0,
            peacock: streamingServices.includes('Peacock') ? 1 : 0,
            paramount: streamingServices.includes('Paramount+') ? 1 : 0,
          }),
        }
      );
      if (!addDetailsResponse.ok) {
        return setError('User registered but details failed to save.');
      }
      setError('');
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again later.');
    }
  };
  return (
    <main className="signup-container">
      <div className="content-wrapper">
        <section className="signup-section" aria-label="Signup form">
          <header className="welcome-header">
            <h1 className="welcome-title">Create Account</h1>
          </header>
          <nav className="auth-tabs" aria-label="Authentication options">
            <div className="tab-item" onClick={handleLoginClick}>
              <span className="tab-text">LOGIN</span>
            </div>
            <div className="tab-item active">
              <span className="tab-text">SIGNUP</span>
              <div className="active-indicator" aria-hidden="true" />
            </div>
          </nav>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="input-field"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="number"
                  placeholder="Age"
                  name="age"
                  className="input-field"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <select
                  name="gender"
                  className="input-field"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  className="input-field"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="input-field"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  className="input-field"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  className="input-field"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="checkbox-section">
              <p className="disclaimer">
                We are collecting this info to ensure we are giving you unique
                value compared to other streaming services.
              </p>
              <div className="checkbox-grid">
                {[
                  'Netflix',
                  'Hulu',
                  'Disney+',
                  'Prime Video',
                  'HBO Max',
                  'Apple TV+',
                ].map((service) => (
                  <label key={service} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="streamingServices"
                      value={service}
                      checked={formData.streamingServices.includes(service)}
                      onChange={handleChange}
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="signup-button">
              SIGN UP
            </button>
            {error && (
              <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
            )}
          </form>
        </section>
      </div>
      <style>{`
        .login-container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(249deg, #030A1B 68.64%, #9747FF 206.69%);
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
           background-color: #002244;
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
          color: #EBFAFF;
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
          color: #EBFAFF;
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
          background-color: #228EE5;
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
          border: 1px solid #EBFAFF;
          border-radius: 12px;
          color: #EBFAFF;
          font-size: 18px;
        }
        .field-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
        }
        .forgot-password {
          color: #B1B7BA;
          font-size: 16px;
          text-align: center;
          width: 100%;
          margin: 26px 0 44px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .login-button {
          width: 160px;
          height: 48px;
          border: 1px solid #fff;
          border-radius: 12px;
          color: #EBFAFF;
          font-size: 16px;
          margin: 0 auto;
          cursor: pointer;
          background-color: #228EE5;
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
