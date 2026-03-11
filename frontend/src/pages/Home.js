import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RingCard from '../components/RingCard';

function Home() {
  const [rings, setRings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rings')
      .then(res => setRings(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>💍 Ring Shop</h1>
        <p style={{ fontSize: '18px' }}>Find the perfect ring to strengthen your love!</p>
      </div>

      {/* Rings Section */}
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Our Collection</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {rings.map(ring => (
            <RingCard key={ring.id} ring={ring} />
          ))}
        </div>
      </div>

      {/* Feature Section */}
      <div style={{ background: '#fff5f5', padding: '40px 20px', textAlign: 'center' }}>
        <h2>💑 Why Choose Us?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
          <div style={{ maxWidth: '200px' }}>
            <h3>💍 Unique Rings</h3>
            <p>Handcrafted rings that symbolize your unique love story</p>
          </div>
          <div style={{ maxWidth: '200px' }}>
            <h3>💌 Love Messages</h3>
            <p>Send a personal message with every ring purchase</p>
          </div>
          <div style={{ maxWidth: '200px' }}>
            <h3>📅 Anniversary Reminders</h3>
            <p>Never forget your special day with our reminder system</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;