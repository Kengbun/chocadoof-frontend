import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from "../assets/logo3.png";
import Avatar from "../assets/avatar.png";
import axios from 'axios';

// const Avatar = "https://picsum.photos/200/300" 
const Navbar = () => {
    const navigate = useNavigate();
    // สถานะการล็อกอิน 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatar, setAvatar] = useState(Avatar); // เก็บข้อมูลผู้ใช้

    useEffect(() => {
        
        // console.log(token);

        checkLoginStatus();
        
        const avatar = async () => {
            const token = localStorage.getItem('authToken'); // ดึง token จาก localStorage
            try {
                const res = await axios.get('/users/me', {
                    headers: { authToken: `Bearer ${token}` }, // ส่ง token ใน header
                });
                // console.log("dkdkdkdk"+res);
                setAvatar(res.data); // ตั้งค่าผู้ใช้
                // console.log(res.data);
            } 
            catch (err) {
                console.log(err);
            }
        };

        avatar();
        
    }, []);
    const checkLoginStatus = () => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token); // แปลง Token ให้เป็น Boolean
    }

    const handleLogout = () => {
        // ลบ token เมื่อผู้ใช้ทำการล็อกเอาต์
        localStorage.removeItem('authToken');
        // sessionStorage.removeItem('authToken');
        setIsLoggedIn(false);
        console.log('Logged out successfully');
        navigate("/"); 
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
                <div className={isLoggedIn ? 'nav-login' : 'nav-links'} >
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="nav-button-login">
                                <img src={avatar.profile_picture ? avatar.profile_picture:Avatar}
                                    className='nav-avatar'
                                    />
                            </Link>
                            <button onClick={handleLogout} className="nav-button">ออกจากระบบ</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-button" >เข้าสู่ระบบ</Link>
                            <Link to="/signup" className="nav-button">สมัครสมาชิก</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
