import React from 'react';
import { BellOutlined, BarChartOutlined,MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="icons-container">
        <button className="icon-button">
          <Link to="/loggedIn/main">
            <div className='icon'>
            <BellOutlined/>
            </div>
          </Link>
        </button>
        <button className="icon-button">
          <Link to="/loggedIn/crudBrigradist">
            <div className="icon" >
            <BarChartOutlined />
            </div>
          </Link>
        </button>
        <button className="icon-button">
        <Link to="/main/report">
            <div className="icon">
            <MenuOutlined />
            </div>
        </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
