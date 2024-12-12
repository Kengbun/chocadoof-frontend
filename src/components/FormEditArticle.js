import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;

const FormEditArticle = () => {
    const params = useParams(); // URL params
    const [data, setData] = useState({
        title: '',
        category: '',
        content: '',
        coverImage: '',
        additionalImage: ''
    });
    const [selectedCoverImage, setSelectedCoverImage] = useState(null); // เก็บภาพหน้าปก
    const [selectedAdditionalImage, setSelectedAdditionalImage] = useState(null); // เก็บรูปภาพเพิ่มเติม
    const navigate = useNavigate();

    useEffect(() => {
        loadData(params.id); // โหลดข้อมูลจาก id
    }, []);

    const loadData = (id) => {
        axios.get(apiUrl + "/article/" + id)
            .then((res) => {
                setData(res.data);
                setSelectedCoverImage(res.data.coverImage); // อัปเดต selectedCoverImage เมื่อ data.coverImage เปลี่ยน
                setSelectedAdditionalImage(res.data.contentImage); // อัปเดต selectedAdditionalImage เมื่อ data.contentImage เปลี่ยน
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกันไม่ให้รีเฟรชหน้า

        const formData = new FormData();

        // เพิ่มค่าของ text fields
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("content", data.content);

        // เพิ่มไฟล์ที่เลือกใน formData
        if (selectedCoverImage && selectedCoverImage instanceof File) {
            formData.append("coverImage", selectedCoverImage);
        }

        if (selectedAdditionalImage && selectedAdditionalImage instanceof File) {
            formData.append("additionalImage", selectedAdditionalImage);
        }

        try {
            const response = await axios.put(apiUrl + "/article/" + params.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);
            // navigate("/"); // ไปที่หน้าอื่นหลังจากอัปเดตเสร็จ
        } catch (error) {
            console.error("Error updating article:", error);
        }
    };

    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedCoverImage(file); // เก็บไฟล์ที่เลือก
        }
    };

    const handleAdditionalImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedAdditionalImage(file); // เก็บไฟล์ที่เลือก
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
                        value={data.title}
                        onChange={handleChange}
                        placeholder="กรอกหัวข้อบทความ"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">หมวดหมู่:</label>
                    <input
                        type="text"
                        name="category"
                        value={data.category}
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
                                src={selectedCoverImage instanceof File ? URL.createObjectURL(selectedCoverImage) : selectedCoverImage}
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
                                src={selectedAdditionalImage instanceof File ? URL.createObjectURL(selectedAdditionalImage) : selectedAdditionalImage}
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
                        value={data.content}
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

export default FormEditArticle;
