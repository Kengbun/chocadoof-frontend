import React, { useState } from 'react';
import './Profile.css';
import Footer from '../components/Footer';

const Profile = () => {
    // กำหนดข้อมูลผู้ใช้งานใน state
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'user@example.com',
        avatar: 'https://picsum.photos/200/300',
    });

    // กำหนด state สำหรับการแก้ไขข้อมูล
    const [isEditing, setIsEditing] = useState(false); // ใช้ตรวจสอบว่ากำลังแก้ไขหรือไม่
    const [editedName, setEditedName] = useState(user.name); // ชื่อที่แก้ไข

    const articles = [
        {
            title: 'การดูแลสัตว์เลี้ยงในฤดูหนาว',
            category: 'การดูแลสัตว์',
            date: '2024-11-25',
        },
    ];

    // ฟังก์ชันบันทึกข้อมูล
    const handleSave = () => {
        setUser((prevUser) => ({
            ...prevUser,
            name: editedName, // อัปเดตชื่อใหม่
        }));
        setIsEditing(false); // ปิดโหมดแก้ไข
    };

    return (
        <div>
            <div className="profile-container">
                {/* ส่วนโปรไฟล์ผู้ใช้ */}
                <div className="profile-header">
                    <img src={user.avatar} alt="Profile" className="profile-avatar" />
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
                        // โหมดแสดงข้อมูล
                        <div>
                            <p><strong>ชื่อ :</strong> {user.name}</p>
                            <p><strong>อีเมล :</strong> {user.email}</p>
                        </div>
                    ) : (
                        // โหมดแก้ไขข้อมูล
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

                {/* การจัดการบทความ */}
                <div className="article-management">
                    <h3>จัดการบทความ</h3>
                    <button className="add-article-btn">เพิ่มบทความใหม่</button>
                    <table className="article-table">
                        <thead>
                            <tr>
                                <th>หัวข้อ</th>
                                <th>หมวดหมู่</th>
                                <th>วันที่</th>
                                <th>การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article, index) => (
                                <tr key={index}>
                                    <td>{article.title}</td>
                                    <td>{article.category}</td>
                                    <td>{article.date}</td>
                                    <td>
                                        <button className="edit-btn">แก้ไข</button>
                                        <button className="delete-btn">ลบ</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
