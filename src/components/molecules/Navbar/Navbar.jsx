import React from 'react';
import { BellOutlined, BarChartOutlined,MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
const token = localStorage.getItem('token');

  return (
    <div className="navbar">
      <div className="icons-container">
        <button className="icon-button">
          <Link to="/main">
            <div className='icon'>
            <BellOutlined/>
            </div>
          </Link>
        </button>
        <button className="icon-button">
          <Link to="/usersStadistics">
            <div className="icon" >
            <BarChartOutlined />
            </div>
          </Link>
        </button>
        <button className="icon-button">
          <Link to="/menu">
            <div className="icon">
            <MenuOutlined />
            </div>
          </Link>
        </button>
        <button className="icon-button">
          <Link to="/user">
            <div className="icon">
            <FaUserCircle />
            </div>
          </Link>
        </button>
        
      </div>
    </div>
  );
};

export default Navbar;
