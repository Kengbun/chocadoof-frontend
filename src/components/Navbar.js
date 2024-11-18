import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from "../assets/logo3.png";

const Navbar = () => (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="logo">
                <img src={Logo} alt="Chocadoof Logo" className="logo-image" />
                <span>Chocadoof </span>
            </div>
            <ul className="nav-links">
                <li><Link to="/">หน้าแรก</Link></li>
                <li><Link to="/products">สินค้า</Link></li>
                <li><Link to="/articles">บทความ</Link></li>
                <li><Link to="/about">เกี่ยวกับเรา</Link></li>
                <li><Link to="/contact">ติดต่อ</Link></li>
            </ul>
            <div className="auth-links">
                <Link to="/login" className="auth-button">เข้าสู่ระบบ</Link>
                <Link to="/signup" className="auth-button">สมัครสมาชิก</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;
