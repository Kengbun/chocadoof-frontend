import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';  // ใช้ไฟล์ CSS เดียวกันสำหรับสไตล์

const Profile = () => {
    // กำหนดข้อมูลผู้ใช้งานใน state
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'user@example.com',
        avatar: 'https://picsum.photos/200/300',  // รูปโปรไฟล์เริ่มต้น
    });

    // กำหนด state สำหรับการแก้ไขข้อมูล
    const [isEditing, setIsEditing] = useState(false); // ใช้ตรวจสอบว่ากำลังแก้ไขหรือไม่
    const [editedName, setEditedName] = useState(user.name); // ชื่อที่แก้ไข

    // ฟังก์ชันบันทึกข้อมูล
    const handleSave = () => {
        setUser((prevUser) => ({
            ...prevUser,
            name: editedName, // อัปเดตชื่อใหม่
        }));
        setIsEditing(false); // ปิดโหมดแก้ไข
    };

    // ฟังก์ชันจัดการการเปลี่ยนรูปโปรไฟล์
    const handleAvatarUpdate = (newAvatarUrl) => {
        setUser((prevUser) => ({
            ...prevUser,
            avatar: newAvatarUrl, // อัปเดตรูปโปรไฟล์ใหม่
        }));
    };

    // ฟังก์ชันที่จัดการเมื่อเลือกไฟล์รูปโปรไฟล์ใหม่
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(user.avatar);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl); // อัปเดตตัวอย่างภาพ
        }
    };

    // ฟังก์ชันที่ส่งข้อมูลไปยังเซิร์ฟเวอร์
    const handleSubmit = async () => {
        if (!profileImage) {
            alert('กรุณาเลือกไฟล์ก่อนบันทึก!');
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', profileImage);

        try {
            const response = await axios.post('http://localhost:8000/profile/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('อัปเดตรูปโปรไฟล์สำเร็จ!');
            console.log('Response:', response.data);
            handleAvatarUpdate(response.data.avatarUrl); // อัปเดตรูปโปรไฟล์ที่ใหม่
        } catch (error) {
            console.error('Error uploading profile image:', error);
            alert('เกิดข้อผิดพลาดในการอัปเดตรูปโปรไฟล์');
        }
    };

    return (
        <div>
            <div className="profile-container">
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
                        {/* ปุ่มแก้ไขรูปโปรไฟล์ */}
                        {isEditing && (
                            <label
                                htmlFor="profileImageInput"
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
                        {/* Input สำหรับเลือกไฟล์ */}
                        <input
                            type="file"
                            id="profileImageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }} // ซ่อน Input ไว้
                        />
                    </div>
                    <p className="profile-email">{user.email}</p>
                    <button
                        className="profile-edit-btn"
                        onClick={() => setIsEditing(!isEditing)} // เปิด/ปิดโหมดแก้ไข
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
                                onChange={(e) => setEditedName(e.target.value)} // อัปเดตชื่อที่แก้ไข
                                className="edit-input"
                            />
                            <button className="save-btn" onClick={handleSave}>บันทึก</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
