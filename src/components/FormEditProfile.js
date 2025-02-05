import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from '../confix/axios';
import { useNavigate } from 'react-router-dom';
// import "../pages/Articles.css"
import { useNotificationCustom } from '../functions/functions'



const FormEditProfile = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotificationCustom();

    const [data, setData] = useState({
        name: '',
        email: '',
        profile_picture: '',
    });

    const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);


    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            // alert('กรุณาเข้าสู่ระบบ');
            showNotification('error', 'เกิดข้อผิดพลาด', 'กรุณาเข้าสู่ระบบ');
            return;
        }

        try {
            const res = await axios.get(`/users/me`, {
                headers: {
                    authToken: `Bearer ${token}`,
                },
            });
            setData(res.data);
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedProfilePicture(file);
        }
    };

    const renderImagePreview = (image) => {
        if (image instanceof File) {
            return URL.createObjectURL(image);
        }
        return image || 'https://via.placeholder.com/150';
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append("name", data.name);

        if (selectedProfilePicture) {
            formData.append("profile_picture", selectedProfilePicture);
        }

        try {
            await axios.put(`/users/me`, formData, {
                headers: {
                    authToken: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            showNotification('success', 'อัปเดตสำเร็จ', 'อัปเดตข้อมูลโปรไฟล์สำเร็จ');
            // console.log(formData)
            navigate('/profile');
            // alert('อัปเดตข้อมูลโปรไฟล์สำเร็จ');

            loadProfile();
        } catch (error) {
            console.error("Error updating profile:", error);
            // alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูลโปรไฟล์');
            showNotification('error', 'เกิดข้อผิดพลาด', error.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลโปรไฟล์');
        }
    };

    return (
        <div className="container card my-5 p-5 shadow"
        style={{maxWidth: "600px"}}
        >
            <div>
                <h3>ตัวอย่างรูปโปรไฟล์:</h3>
                <img
                    className='border border-2 border-white  rounded-circle'
                    style={{ width: 150, height: 150 }}
                    src={renderImagePreview(selectedProfilePicture || data.profile_picture)}
                    alt="Profile Preview"
                />
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark'  htmlFor="profile_picture">รูปโปรไฟล์:</label>

                    <input
                        className='form-control'
                        type="file"
                        name="profile_picture"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <h2>ข้อมูลโปรไฟล์</h2>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark'  htmlFor="name">ชื่อ:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="name"
                        maxLength={100}   //กำหนดใส่ได้ไม่เกิน 100 ตัว
                        value={data.name}
                        onChange={handleChange}
                        placeholder="กรอกชื่อ"

                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark'  htmlFor="email">อีเมล:</label>
                    <input
                        className='form-control'
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="อีเมล"
                        disabled
                    />
                </div>


                <button className="custom-btn rounded" type="submit">อัปเดตข้อมูลโปรไฟล์</button>
            </form>
        </div>
    );
};

export default FormEditProfile;
