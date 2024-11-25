import React, { useState } from 'react';
import './ArticleForm.css';

const ArticleForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        coverImage: '',
        additionalImage: '',
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ตรวจสอบว่าทุกช่องกรอกครบหรือไม่
        if (!formData.title || !formData.category || !formData.coverImage || !formData.content) {
            alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }

        // ถ้าทุกช่องกรอกครบแล้ว
        console.log('Form Data:', formData);
        alert('บทความถูกส่งเรียบร้อยแล้ว!');
    };

    const [selectedCoverImage, setSelectedCoverImage] = useState(null); // เก็บภาพหน้าปก
    const [selectedAdditionalImage, setSelectedAdditionalImage] = useState(null); // เก็บรูปภาพเพิ่มเติม

    // ฟังก์ชันที่จัดการเมื่อเลือกไฟล์ภาพหน้าปก
    const handleCoverImageChange = (event) => {
        const file = event.target.files[0]; // เลือกไฟล์แรกจากไฟล์ที่เลือก
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedCoverImage(reader.result); // เก็บข้อมูลภาพที่เลือกลงใน state
                setFormData({
                    ...formData,
                    coverImage: file, // เก็บไฟล์ใน formData
                });
            };
            reader.readAsDataURL(file); // แปลงไฟล์เป็น URL
        }
    };

    // ฟังก์ชันที่จัดการเมื่อเลือกไฟล์รูปภาพเพิ่มเติม
    const handleAdditionalImageChange = (event) => {
        const file = event.target.files[0]; // เลือกไฟล์แรกจากไฟล์ที่เลือก
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedAdditionalImage(reader.result); // เก็บข้อมูลภาพที่เลือกลงใน state
                setFormData({
                    ...formData,
                    additionalImage: file, // เก็บไฟล์ใน formData
                });
            };
            reader.readAsDataURL(file); // แปลงไฟล์เป็น URL
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">หัวข้อบทความ :</label>
                    <input
                        type="text"
                        id="title"
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
                        id="category"
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
                        id="coverImage"
                        name="coverImage"
                        onChange={handleCoverImageChange} // เรียกใช้ฟังก์ชัน handleCoverImageChange
                    />
                    {/* แสดงตัวอย่างภาพหน้าปกที่เลือก */}
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
                        id="additionalImage"
                        name="additionalImage"
                        onChange={handleAdditionalImageChange} // เรียกใช้ฟังก์ชัน handleAdditionalImageChange
                    />
                    {/* แสดงตัวอย่างรูปภาพเพิ่มเติมที่เลือก */}
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
                        id="content"
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

export default ArticleForm;
