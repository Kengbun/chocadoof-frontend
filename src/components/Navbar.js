import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from "../assets/logo3.png";

const Navbar = () => {
    // สถานะการล็อกอิน (ตัวอย่าง: true ถ้าล็อกอิน, false ถ้ายังไม่ล็อกอิน)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        // ตัวอย่าง: กระบวนการล็อกเอาต์
        setIsLoggedIn(false);
        console.log("Logged out successfully");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/home">
                    <div className="logo">
                        <img src={Logo} alt="Chocadoof Logo" className="logo-image" />
                        <span>Chocadoof</span>
                    </div>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/">หน้าแรก</Link></li>
                    <li><Link to="/products">สินค้า</Link></li>
                    <li><Link to="/articles">บทความ</Link></li>
                    <li><Link to="/about">เกี่ยวกับเรา</Link></li>
                    <li><Link to="/contact">ติดต่อ</Link></li>
                </ul>
                <div className={isLoggedIn ? 'auth-links-login' : 'auth-links'} >
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="auth-button-login">โปรไฟล์</Link>
                            <button onClick={handleLogout} className="auth-button-login">ล็อกเอาต์</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="auth-button">เข้าสู่ระบบ</Link>
                            <Link to="/signup" className="auth-button">สมัครสมาชิก</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
