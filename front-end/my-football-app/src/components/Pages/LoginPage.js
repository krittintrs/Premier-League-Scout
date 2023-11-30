import React, { useState } from 'react';
import '../Login/Login.css'; 
import * as loginService from "../../services/loginService";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleSignUp = () => {
    // Perform sign-up logic (you can redirect to a sign-up page or show a modal)
    console.log('Redirect to sign-up page or show sign-up modal');
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
          <div className="button-container">
            <button type="submit">Login</button>
            <button type="button" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
