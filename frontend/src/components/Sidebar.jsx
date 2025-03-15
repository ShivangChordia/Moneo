import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <Menu>
    <Link to="/" className="menu-item">Dashboard</Link>
    <Link to="/portfolio" className="menu-item">Portfolio</Link>
    <Link to="/stocks" className="menu-item">Stocks</Link>
    <Link to="/settings" className="menu-item">Settings</Link>
  </Menu>
);

export default Sidebar;
