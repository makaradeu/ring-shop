import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RingDetail() {
  const { id } = useParams();
  const [ring, setRing] = useState(null);
  const [message, setMessage] = useState('');
  const [loveMessage, setLoveMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rings/${id}`)
      .then(res => setRing(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return setMessage('Please login first!');
    try {
      await axios.post('http://localhost:5000/api/orders', {
        user_id: user.id,
        ring_id: id,
        message: loveMessage
      });
      setMessage('Order placed successfully! 💍');
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (!ring) return <p style={{ padding: '20px' }}>Loading...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>{ring.name}</h2>
      <p>{ring.description}</p>
      <p style={{ color: '#ff6b6b', fontSize: '24px', fontWeight: 'bold' }}>${ring.price}</p>
      <hr />
      <h3>💌 Add a Love Message</h3>
      <p>Send a special message with your ring to strengthen your relationship!</p>
      <textarea
        placeholder="Write your love message here..."
        value={loveMessage}
        onChange={e => setLoveMessage(e.target.value)}
        style={{ width: '100%', padding: '10px', height: '100px', marginBottom: '10px' }}
      />
      <button onClick={handleOrder}
        style={{ background: '#ff6b6b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
        Order Now 💍
      </button>
      <p>{message}</p>
    </div>
  );
}

export default RingDetail;