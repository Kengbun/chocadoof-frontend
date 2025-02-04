import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axios from '../confix/axios';
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
        <div className="container card my-5 p-3 shadow">
            <div className="text-center rounded "
                style={{
                    backgroundColor: '#d9f0ff',
                }}>
                <div className='my-3'>
                    <img
                        className='rounded-circle'
                        style={{ width: 150, height: 150 }}
                        src={user.profile_picture || "https://picsum.photos/200/300"}
                        alt="Profile Preview"

                    />
                    <p className="mt-3">{user.email}</p>
                    <Link to="/profiledit">
                        <button className="btn btn-primary mb-3">แก้ไขโปรไฟล์</button>
                    </Link>
                </div>
            </div>
            {/* ข้อมูลบัญชี */}
            <div className="my-3">
                <h3>ข้อมูลบัญชี</h3>
                <div>
                    <p className='m-0'><strong>ชื่อ :</strong> {user.name}</p>
                    <p><strong>อีเมล :</strong> {user.email}</p>
                </div>
            </div>
            <ManageArticles />
        </div>
    );
};

export default Profile;
