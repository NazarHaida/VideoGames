import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.module.css'; // Ensure you link to the correct CSS file

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <div className="container">
      <div className="top-panel">
        <Link to="/home">Home</Link>
        <Link to="/register">Register</Link>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="header">
          <div className="title-container">
            <h1 className="title">Login</h1>
          </div>
        </div>

        <div className="form-row">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-row">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-row">
          <button type="submit" className="apply-button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
