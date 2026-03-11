import React from 'react';
import { Link } from 'react-router-dom';

function RingCard({ ring }) {
  return (
    <div style={{
      border: '1px solid #ffcdd2',
      borderRadius: '15px',
      padding: '20px',
      width: '220px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(255,107,107,0.2)',
      transition: 'transform 0.2s',
    }}
      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ fontSize: '50px', marginBottom: '10px' }}>💍</div>
      <h3 style={{ color: '#ff6b6b' }}>{ring.name}</h3>
      <p style={{ color: '#888', fontSize: '14px' }}>{ring.description}</p>
      <p style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '20px' }}>${ring.price}</p>
      <Link to={`/ring/${ring.id}`}>
        <button style={{
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '25px',
          cursor: 'pointer',
          width: '100%',
          marginTop: '10px'
        }}>
          View Ring 💍
        </button>
      </Link>
    </div>
  );
}

export default RingCard;