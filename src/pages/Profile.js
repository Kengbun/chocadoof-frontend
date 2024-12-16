import React, { useEffect, useState } from 'react';
import './Profile.css';
import Footer from '../components/Footer';
import ManageArticles from '../components/ManageArticles';
import axios from 'axios';
import { use } from 'react';
import Avatar from "../assets/avatar.png";

const apiUrl = process.env.REACT_APP_API;
const Profile = () => {

    const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้
    const [profilePicture, setProfilePicture] = useState(null); // เก็บรูปโปรไฟล์ผู้ใช้
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const token = localStorage.getItem('authToken'); // ดึง token จาก localStorage
        try {
            const res = await axios.get('/users/me', {
                headers: { authToken: `Bearer ${token}` }, // ส่ง token ใน header
            });
            // console.log("dkdkdkdk"+res);
            setUser(res.data); // ตั้งค่าผู้ใช้
            console.log(res.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        // <div>
        //     <div className="profile-container">
        //     //         {/* ส่วนโปรไฟล์ผู้ใช้ */}
        //     //         <div className="profile-header">
        //     //             <img src={user.profilePicture ? user.profilePicture : Avatar} alt="Profile" className="profile-avatar" />
        //     //             <p className="profile-email">{user.email}</p>
        //     //             {/* <button
        //     //                 className="profile-edit-btn"
        //     //                 onClick={() => setIsEditing(!isEditing)} // เปิด/ปิดโหมดแก้ไข
        //     //             >
        //     //                 {isEditing ? 'ยกเลิก' : 'แก้ไขโปรไฟล์'}
        //     //             </button> */}
        //     //         </div>

        //     //         {/* ข้อมูลบัญชี */}
        //     //         <div className="profile-info">
        //     //             <h3>ข้อมูลบัญชี</h3>
        //     //             {!isEditing ? (
        //     //                 // โหมดแสดงข้อมูล
        //     //                 <div>
        //     //                     <p><strong>ชื่อ :</strong> {user.name}</p>
        //     //                     <p><strong>อีเมล :</strong> {user.email}</p>
        //     //                 </div>
        //     //             ) : (
        //     //                 // โหมดแก้ไขข้อมูล
        //     //                 <p>123</p>
        //     //                 // <div>
        //     //                 //     <p><strong>ชื่อ :</strong></p>
        //     //                 //     <input
        //     //                 //         type="text"
        //     //                 //         value={editedName}
        //     //                 //         onChange={(e) => setEditedName(e.target.value)} // อัปเดตชื่อที่แก้ไข
        //     //                 //         className="edit-input"
        //     //                 //     />
        //     //                 //     <button className="save-btn" onClick={handleSave}>บันทึก</button>
        //     //                 // </div>
        //     //             )}
        //     //         </div>

        //     //         {/* การจัดการบทความ */}
        //     //         {/* <div className="article-management">
        //     //             <h3>จัดการบทความ</h3>
        //     //             <button className="add-article-btn">เพิ่มบทความใหม่</button>
        //     //             <table className="article-table">
        //     //                 <thead>
        //     //                     <tr>
        //     //                         <th>หัวข้อ</th>
        //     //                         <th>หมวดหมู่</th>
        //     //                         <th>วันที่</th>
        //     //                         <th>การจัดการ</th>
        //     //                     </tr>
        //     //                 </thead>
        //     //                 <tbody>
        //     //                     {articles.map((article, index) => (
        //     //                         <tr key={index}>
        //     //                             <td>{article.title}</td>
        //     //                             <td>{article.category}</td>
        //     //                             <td>{article.date}</td>
        //     //                             <td>
        //     //                                 <button className="edit-btn">แก้ไข</button>
        //     //                                 <button className="delete-btn">ลบ</button>
        //     //                             </td>
        //     //                         </tr>
        //     //                     ))}
        //     //                 </tbody>
        //     //             </table>
        //     //         </div> */}
        //     //         <ManageArticles />
                
        // </div>
        // </div >
        // <div>
        //     <div className="profile-container">
        //         {/* ส่วนโปรไฟล์ผู้ใช้ */}
        //         <div className="profile-header">
        //             <img src={user.avatar} alt="Profile" className="profile-avatar" />
        //             <p className="profile-email">{user.email}</p>
        //             {/* <button
        //                 className="profile-edit-btn"
        //                 onClick={() => setIsEditing(!isEditing)} // เปิด/ปิดโหมดแก้ไข
        //             >
        //                 {isEditing ? 'ยกเลิก' : 'แก้ไขโปรไฟล์'}
        //             </button> */}
        //         </div>

        //         {/* ข้อมูลบัญชี */}
        //         <div className="profile-info">
        //             <h3>ข้อมูลบัญชี</h3>
        //             {!isEditing ? (
        //                 // โหมดแสดงข้อมูล
        //                 <div>
        //                     <p><strong>ชื่อ :</strong> {user.name}</p>
        //                     <p><strong>อีเมล :</strong> {user.email}</p>
        //                 </div>
        //             ) : (
        //                 // โหมดแก้ไขข้อมูล
        //                 <p>123</p>
        //                 // <div>
        //                 //     <p><strong>ชื่อ :</strong></p>
        //                 //     <input
        //                 //         type="text"
        //                 //         value={editedName}
        //                 //         onChange={(e) => setEditedName(e.target.value)} // อัปเดตชื่อที่แก้ไข
        //                 //         className="edit-input"
        //                 //     />
        //                 //     <button className="save-btn" onClick={handleSave}>บันทึก</button>
        //                 // </div>
        //             )}
        //         </div>

        //         {/* การจัดการบทความ */}
        //         {/* <div className="article-management">
        //             <h3>จัดการบทความ</h3>
        //             <button className="add-article-btn">เพิ่มบทความใหม่</button>
        //             <table className="article-table">
        //                 <thead>
        //                     <tr>
        //                         <th>หัวข้อ</th>
        //                         <th>หมวดหมู่</th>
        //                         <th>วันที่</th>
        //                         <th>การจัดการ</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {articles.map((article, index) => (
        //                         <tr key={index}>
        //                             <td>{article.title}</td>
        //                             <td>{article.category}</td>
        //                             <td>{article.date}</td>
        //                             <td>
        //                                 <button className="edit-btn">แก้ไข</button>
        //                                 <button className="delete-btn">ลบ</button>
        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div> */}
        //         <ManageArticles />
        //     </div>
        //     <Footer />
        // </div>
    );
};

export default Profile;
