import React from 'react';
import { BellOutlined, BarChartOutlined,MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  
  return (
    <div className="navbar">
      <div className="icons-container">
        <button className="icon-button">
          <Link to="/admin">
            <div className='icon'>
            <BellOutlined/>
            </div>
          </Link>
        </button>
        <button className="icon-button">
          <Link to="/admin/usersStadistics">
            <div className="icon" >
            <BarChartOutlined />
            </div>
          </Link>
        </button>
        <button className="icon-button">
          <Link to="/admin/menu">
            <div className="icon">
            <MenuOutlined />
            </div>
          </Link>
        </button>
        <button className="icon-button">
          <Link to="/admin/profile">
            <div className="icon">
            <FaUserCircle />
            </div>
          </Link>
        </button>
        
      </div>
    </div>
  );
};


export default AdminNavbar;
