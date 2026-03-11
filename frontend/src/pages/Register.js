import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      setMessage('Registered successfully! Please login. ✅');
    } catch (err) {
      setMessage('Registration failed. Email may already exist.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }} />
      <button onClick={handleRegister}
        style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
        Register
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Register;