import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homeadmin.css';
import { Link } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleClick = (path) => {
    setClicked(true);
    setTimeout(() => {
      navigate(path);
      setClicked(false);
    }, 300); // Adjust timing to match your animation duration
  };

  return (
    <div className="background-container rounded-lg">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        `}
      </style>
      <form 
        className="animated-form"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.6)', 
          padding: '20px', 
          borderRadius: '15px',
          width: '500px', // adjust this value as needed
          height: '300px', // adjust this value as needed
          marginTop: '-10%'
        }}
      >
        <div className="text-container">
          <p className="min-heading" style={{ fontFamily: 'Prompt, sans-serif', fontWeight: 400 }}>ยินดีต้อนรับ</p>
          <h1 className="main-heading" style={{ fontFamily: 'Prompt, sans-serif' }}>Adminpage</h1><br /><br /><br/>
          <p className="sub-heading" style={{ fontFamily: 'Prompt, sans-serif' }}>คลีนิกฟันสวย</p>
        </div>
      </form>
    </div>
  );
}
