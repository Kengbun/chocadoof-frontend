import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';  // ใช้ไฟล์ CSS เดียวกันสำหรับสไตล์

const Profile = () => {
    const apiUrl = process.env.REACT_APP_API;

    const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้
    const [isEditing, setIsEditing] = useState(false); // โหมดแก้ไข
    const [editedName, setEditedName] = useState(''); // ชื่อที่แก้ไข
    const [profile_picture, setprofile_picture] = useState(null); // รูปโปรไฟล์ใหม่
    const [previewImage, setPreviewImage] = useState(null); // ตัวอย่างรูป

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
            const res = await axios.get(`${apiUrl}/users/me`, {
                headers: { authToken: `Bearer ${token}` },
            });
            setUser(res.data);
            setEditedName(res.data.name);
            setPreviewImage(res.data.profile_picture || 'https://via.placeholder.com/150');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                console.error('Unauthorized access. Please log in again.');
            } else {
                console.error('Error loading profile:', err.message);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setprofile_picture(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl); // แสดงตัวอย่างรูปใหม่
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('name', editedName);
        if (profile_picture) {
            formData.append('profile_picture', profile_picture);
        }

        try {
            const res = await axios.put(`${apiUrl}/users/me`, formData, {
                headers: {
                    authToken: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('บันทึกโปรไฟล์สำเร็จ');
            setIsEditing(false);
            loadData(); // โหลดข้อมูลใหม่
        } catch (err) {
            console.error('Error saving profile:', err);
            alert('เกิดข้อผิดพลาดในการบันทึก');
        }
    };

    return (
        <div className="profile-container">
            {user && (
                <>
                    <div className="profile-header">
                        {/* รูปโปรไฟล์ */}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                src={previewImage}
                                alt="Profile Preview"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            />
                            {isEditing && (
                                <label
                                    htmlFor="profile_pictureInput"
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </label>
                            )}
                            <input
                                type="file"
                                id="profile_pictureInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <p className="profile-email">{user.email}</p>
                        <button
                            className="profile-edit-btn"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'ยกเลิก' : 'แก้ไขโปรไฟล์'}
                        </button>
                    </div>

                    {/* ข้อมูลบัญชี */}
                    <div className="profile-info">
                        <h3>ข้อมูลบัญชี</h3>
                        {!isEditing ? (
                            <div>
                                <p><strong>ชื่อ :</strong> {user.name}</p>
                                <p><strong>อีเมล :</strong> {user.email}</p>
                            </div>
                        ) : (
                            <div>
                                <p><strong>ชื่อ :</strong></p>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="edit-input"
                                />
                                <button className="save-btn" onClick={handleSave}>บันทึก</button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
