import React, { useState, useEffect } from 'react';
import '../Login/Login.css'; 
import * as loginService from "../../services/loginService";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signupSuccess = location.state?.signupSuccess;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(signupSuccess);

  useEffect(() => {
    // Hide the success popup after a delay (e.g., 5 seconds)
    const timer = setTimeout(() => {
      setShowSuccessPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [signupSuccess]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Reset error
    setError('');
    
    try {
      const userData = await loginService.login(username, password);
      console.log('User logged in:', userData);
      navigate('/');
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleGoToSignUp = () => {
    navigate('/SignUpPage');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {showSuccessPopup && (
            <div className="success-popup">
              <p>You have successfully signed up!</p>
            </div>
          )}
          <div className="button-container">
            <button type="submit">Login</button>
            <button type="button" onClick={handleGoToSignUp}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
