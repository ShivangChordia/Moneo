import { push as Menu } from 'react-burger-menu'; 
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <Menu>
    <Link to="/dashboard" className="menu-item">Dashboard</Link>
    <Link to="/portfolio" className="menu-item">Portfolio</Link>
    <Link to="/profile" className="menu-item">Profile</Link>
  </Menu>
);

export default Sidebar;
