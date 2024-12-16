import React, { useEffect, useState } from "react";
import axios from "../confix/axios";
import "./Profile.css";
import Footer from "../components/Footer";
import avatar from "../assets/avatar.png";

const Profile = () => {
    const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้
    const [loading, setLoading] = useState(true); // สถานะการโหลด
    const [error, setError] = useState(null); // เก็บข้อผิดพลาด

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('authToken'); // ดึง token จาก localStorage
            if (!token) {
                setError('User is not authenticated.');
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get('/users/me', {
                    headers: { authToken: `Bearer ${token}` }, // ส่ง token ใน header
                });
                setUser(res.data); // ตั้งค่าผู้ใช้
            } catch (err) {
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
            console.log(user);
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className="profile-container">
                <div className="profile-header">
                    <img src={user.profile_picture ? user.profile_picture : avatar} alt="Profile Avatar" className="profile-avatar" />
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
