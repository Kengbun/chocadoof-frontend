// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../confix/axios';
// import '../pages/ArticleForm.css';

const FormArticle = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        title: '',
        category: '',
        coverImage: null,
        contentImage: null,
        content: '',
    });

    const [selectedCoverImage, setSelectedCoverImage] = useState(null); // แสดงภาพหน้าปก
    const [selectedContentImage, setSelectedContentImage] = useState(null); // แสดงภาพเพิ่มเติม

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedCoverImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({
                ...formData,
                coverImage: file, // เก็บไฟล์ใน state
            });
        }
    };

    const handleContentImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedContentImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({
                ...formData,
                contentImage: file, // เก็บไฟล์ใน state
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.coverImage || !formData.content) {
            alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('กรุณาเข้าสู่ระบบ');
            return;
        }

        const payload = new FormData();
        payload.append('title', formData.title);
        payload.append('category', formData.category);
        payload.append('content', formData.content);
        payload.append('coverImage', formData.coverImage);
        payload.append('contentImage', formData.contentImage);

        try {
            const response = await axios.post(`/article/`, payload, {
                headers: {
                    'authtoken': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            navigate('/profile');
            alert('บทความถูกบันทึกเรียบร้อยแล้ว!');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('เกิดข้อผิดพลาดในการบันทึกบทความ');
        }
    };

    return (
        <div className="container card my-5 p-5 shadow"
            // style={{ maxWidth: '600px' }}
        >
            <h2>เพิ่มบทความ</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="title">หัวข้อบทความ :</label>
                    <input
                        className='form-control'
                        type="text"
                        name="title"
                        maxLength={150}
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="กรอกหัวข้อบทความ"
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="category">หมวดหมู่:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="category"
                        maxLength={20}
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="กรอกหมวดหมู่"
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="coverImage">รูปภาพหน้าปก:</label>
                    <input
                        className='form-control'
                        type="file"
                        name="coverImage"
                        onChange={handleCoverImageChange}
                    />
                    {selectedCoverImage && (
                        <div className='mt-3'>
                            <h5>ตัวอย่างภาพหน้าปก:</h5>
                            <img
                                src={selectedCoverImage}
                                alt="Cover Preview"
                                style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="contentImage">รูปภาพเพิ่มเติม:</label>
                    <input
                        className='form-control'
                        type="file"
                        name="contentImage"
                        onChange={handleContentImageChange}
                    />
                    {selectedContentImage && (
                        <div className='mt-3'>
                            <h5>ตัวอย่างรูปภาพเพิ่มเติม:</h5>
                            <img
                                src={selectedContentImage}
                                alt="Additional Image Preview"
                                style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="content">เนื้อหาบทความ:</label>
                    <textarea
                        className='form-control'
                        name="content"
                        value={formData.content}
                        maxLength={10000}
                        onChange={handleChange}
                        placeholder="เขียนเนื้อหาบทความที่นี่"
                        rows="5"
                    ></textarea>
                </div>
                <button type="submit" className="custom-btn rounded">
                    บันทึกบทความ
                </button>
            </form>
        </div>
    );
};

export default FormArticle;
