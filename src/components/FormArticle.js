import axios from 'axios';
import React, { useState } from 'react';
// import './ArticleForm.css';

const FormArticle = () => {
    const apiUrl = process.env.REACT_APP_API;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        coverImage: null,
        additionalImage: null,
        content: '',
    });

    const [selectedCoverImage, setSelectedCoverImage] = useState(null); // แสดงภาพหน้าปก
    const [selectedAdditionalImage, setSelectedAdditionalImage] = useState(null); // แสดงภาพเพิ่มเติม

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

    const handleAdditionalImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedAdditionalImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({
                ...formData,
                additionalImage: file, // เก็บไฟล์ใน state
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.coverImage || !formData.content) {
            alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }

        const payload = new FormData();
        payload.append('title', formData.title);
        payload.append('category', formData.category);
        payload.append('content', formData.content);
        payload.append('coverImage', formData.coverImage);
        if (formData.additionalImage) {
            payload.append('additionalImage', formData.additionalImage);
        }

        try {
            console.log(formData)
            const response = await axios.post(`${apiUrl}/article/`, payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('บทความถูกบันทึกเรียบร้อยแล้ว!');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกบทความ');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">หัวข้อบทความ :</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="กรอกหัวข้อบทความ"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">หมวดหมู่:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="กรอกหมวดหมู่"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="coverImage">รูปภาพหน้าปก:</label>
                    <input
                        type="file"
                        name="coverImage"
                        onChange={handleCoverImageChange}
                    />
                    {selectedCoverImage && (
                        <div>
                            <h3>ตัวอย่างภาพหน้าปก:</h3>
                            <img
                                src={selectedCoverImage}
                                alt="Cover Preview"
                                style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="additionalImage">รูปภาพเพิ่มเติม:</label>
                    <input
                        type="file"
                        name="additionalImage"
                        onChange={handleAdditionalImageChange}
                    />
                    {selectedAdditionalImage && (
                        <div>
                            <h3>ตัวอย่างรูปภาพเพิ่มเติม:</h3>
                            <img
                                src={selectedAdditionalImage}
                                alt="Additional Image Preview"
                                style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="content">เนื้อหาบทความ:</label>
                    <textarea
                       
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="เขียนเนื้อหาบทความที่นี่"
                        rows="5"
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">
                    บันทึกบทความ
                </button>
            </form>
        </div>
    );
};

export default FormArticle;
