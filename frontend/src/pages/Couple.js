import React, { useState } from 'react';
import axios from 'axios';

function Couple() {
  const [partnerId, setPartnerId] = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [message, setMessage] = useState('');

  const handleLink = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return setMessage('Please login first!');
    try {
      await axios.post('http://localhost:5000/api/couples/link', {
        user1_id: user.id,
        user2_id: partnerId,
        anniversary_date: anniversary
      });
      setMessage('You are now linked as a couple! 💍');
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>💑 Link With Your Partner</h2>
      <p>Connect with your partner to receive anniversary reminders and special ring recommendations!</p>
      <input placeholder="Partner's User ID" value={partnerId} onChange={e => setPartnerId(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }} />
      <input type="date" value={anniversary} onChange={e => setAnniversary(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }} />
      <button onClick={handleLink}
        style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
        Link With Partner 💍
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Couple;