import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axios from '../confix/axios';
import './Profile.css';  // ใช้ไฟล์ CSS เดียวกันสำหรับสไตล์
import { Link } from 'react-router-dom';
import ManageArticles from '../components/ManageArticles';

const Profile = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        profile_picture: ""
    }); // เก็บข้อมูลผู้ใช้

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Token not found. Please log in again.');
            return;
        }

        try {
            const res = await axios.get(`/users/me`, {
                headers: { authToken: `Bearer ${token}` },
            });
            console.log(res.data);
            setUser(res.data);

        } catch (err) {
            if (err.response && err.response.status === 401) {
                console.error('Unauthorized access. Please log in again.');
            } else {
                console.error('Error loading profile:', err.message);
            }
        }
    };


    return (
        <div className="profile-container">
            <div className="profile-header">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        src={user.profile_picture || "https://picsum.photos/200/300"}
                        alt="Profile Preview"
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                    <p className="profile-email">{user.email}</p>
                    <Link to="/profiledit">
                        <button className="profile-edit-btn">แก้ไขโปรไฟล์</button>
                    </Link>
                </div>
            </div>
            {/* ข้อมูลบัญชี */}
            <div className="profile-info">
                <h3>ข้อมูลบัญชี</h3>
                <div>
                    <p><strong>ชื่อ :</strong> {user.name}</p>
                    <p><strong>อีเมล :</strong> {user.email}</p>
                </div>
            </div>
            <ManageArticles />
        </div>
    );
};

export default Profile;
