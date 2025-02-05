import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Logo from "../assets/logo3.png";
// import Avatar from "https://picsum.photos/200/300";
import axios from 'axios';
import Role from '../functions/role';
import '../styles/global.css'
// import axios from '../confix/axios';
import { useNotificationCustom } from '../functions/functions';

// import role from '../functions/role';

const Avatar = "https://picsum.photos/200/300"
const Navbar = () => {
    const navigate = useNavigate();
    // สถานะการล็อกอิน 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatar, setAvatar] = useState(Avatar); // เก็บข้อมูลผู้ใช้
    const { showNotification } = useNotificationCustom();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            getAvatar();
        } else {
            setAvatar(Avatar);
        }
    }, [isLoggedIn]);

    const getAvatar = async () => {
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


    const checkLoginStatus = () => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token); // แปลง Token ให้เป็น Boolean
    }

    const handleLogout = () => {
        // ลบ token เมื่อผู้ใช้ทำการล็อกเอาต์
        localStorage.removeItem('authToken');
        showNotification("success", "ออกจากระบบสำเร็จ", "ออกจากระบบสำเร็จ");
        setIsLoggedIn(false);
        console.log('Logged out successfully');
        window.location.reload();
        // navigate("/"); 
    };
    // const a = role.getRole()
    // console.log(a);

    const token = localStorage.getItem('authToken');

    const role = Role.getRole(token);

    const url = role === 'admin' ? '/admin/dashboard' : '/profile';
    console.log(url);



    return (
        

        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={Logo} alt="Logo" className="logo-image" />
                    <span className="logo-text">Chocadoof</span>
                </Link>

                {/* ปุ่ม Hamburger */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* เมนูที่ซ่อน */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-3">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">หน้าแรก</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">สินค้า</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/articles">บทความ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">เกี่ยวกับเรา</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">ติดต่อเรา</Link>
                        </li>

                        {/* ปุ่มเข้าสู่ระบบและสมัครสมาชิก (ย้ายมาอยู่ภายใน Hamburger menu) */}

                        {isLoggedIn ? (
                            <div className="navbar-nav gap-2">

                                <li className="nav-item">
                                    <Link to={url} className="">
                                        <img src={avatar.profile_pcture ? avatar.profile_pcture : Avatar}
                                            className='nav-avatar border border-2 border-white  rounded-circle'
                                        />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={handleLogout} className="btn btn-auth w-100">ออกจากระบบ</Link>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav gap-2">
                                <li className="nav-item">
                                    <Link to="/login" className="btn btn-auth w-100">เข้าสู่ระบบ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="btn btn-auth w-100">สมัครสมาชิก</Link>
                                </li>
                            </div>
                        )}


                    </ul>
                </div>
            </div>
        </nav>


    );
};

export default Navbar;