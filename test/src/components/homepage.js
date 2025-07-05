import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('login') === 'success') {
      toast.success('Login successful');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout successful");
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Welcome to the WebSphere Solution!</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '4px 10px',
            backgroundColor: 'black',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '80px',    
            height: '35px',
          }}

        >
          Logout
        </button>
      </div>
      <img
  src="/images/websphere-logo.JPG"
  alt="Websphere Logo"
  style={{
    marginTop: '80px',
    borderRadius: '8px',
    maxWidth: '400px',
    height: 'auto'
  }}
  
/>
<img src="/images/qr-code.jpg" alt="QR Code" width={200}  />
    </div>
  );
};

export default Homepage;
