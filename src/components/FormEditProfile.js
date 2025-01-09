import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios from '../confix/axios';
import { useNavigate } from 'react-router-dom';
import "../pages/Articles.css"


const FormEditProfile = () => {
    const navigate = useNavigate();

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
            alert('กรุณาเข้าสู่ระบบ');
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
            console.log(formData)
            navigate('/profile');
            alert('อัปเดตข้อมูลโปรไฟล์สำเร็จ');

            loadProfile();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูลโปรไฟล์');
        }
    };

    return (
        <div className="form-container">
            <div>
                <h3>ตัวอย่างรูปโปรไฟล์:</h3>
                <img
                    src={renderImagePreview(selectedProfilePicture || data.profile_picture)}
                    alt="Profile Preview"
                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div className="form-group">
                    <label htmlFor="profile_picture">รูปโปรไฟล์:</label>

                    <input
                        type="file"
                        name="profile_picture"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <h2>ข้อมูลโปรไฟล์</h2>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label htmlFor="name">ชื่อ:</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="กรอกชื่อ"

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">อีเมล:</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="อีเมล"
                        disabled
                    />
                </div>


                <button className="submit-button" type="submit">อัปเดตข้อมูลโปรไฟล์</button>
            </form>
        </div>
    );
};

export default FormEditProfile;
