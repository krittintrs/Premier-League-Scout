import React, { useState } from 'react';
import '../SignUp/SignUp.css'; // Create a new CSS file for SignUp styles
import * as signUpService from '../../services/signUpService';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/signUpApi';

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Reset error
    setError('');

    try {
      const userData = await signUpService.signup(username, password);
      console.log('User signed up:', userData);
      // Handle successful login, e.g., redirect to another page
      
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleGoBackLogin = async (e) => {
    navigate('/LoginPage');
  }

  return (
    <div className="signup-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleGoBackLogin}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
