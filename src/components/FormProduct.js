import React, { useState } from "react";
// import axios from "axios";
import axios from '../confix/axios';
import { useNavigate } from 'react-router-dom';
import { useNotificationCustom } from '../functions/functions'


const FormProduct = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotificationCustom();

    const [formData, setFormData] = useState({
        product_name: "",
        short_description: "",
        detailed_description: "",
        category: "",
    });

    const [images, setImages] = useState({
        main_image: null,
        additional_image_1: null,
        additional_image_2: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setImages({ ...images, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("product_name", formData.product_name);
        data.append("short_description", formData.short_description);
        data.append("detailed_description", formData.detailed_description);
        data.append("category", formData.category);
        data.append("main_image", images.main_image);
        data.append("additional_image_1", images.additional_image_1);
        data.append("additional_image_2", images.additional_image_2);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                // console.error('Token not found. Please log in again.');
                showNotification("error", "เกิดข้อผิดพลาด", "กรุณาเข้าสู่ระบบอีกครั้ง");
                return;
            }

            await axios.post(`/products`, data, {
                headers: {
                    'authtoken': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            // console.log(data);
            // alert("บันทึกข้อมูลสินค้าสำเร็จ");
            showNotification("success", "บันทึกสำเร็จ", "บันทึกข้อมูลสินค้าสำเร็จ");
            navigate('admin/dashboard');
        } catch (error) {
            console.error("Error creating product:", error);
            // alert("เกิดข้อผิดพลาดในการบันทึกข้อมูลสินค้า");
            showNotification("error", "เกิดข้อผิดพลาด", "เกิดข้อผิดพลาดในการบันทึกข้อมูลสินค้า");
        }
    };

    return (
        <div className="container card my-5 p-5 shadow"
            // style={{ maxWidth: "600px" }}
        >
            <h2>เพิ่มข้อมูลสินค้า</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="product_name">ชื่อสินค้า:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="product_name"
                        maxLength={100}
                        value={formData.product_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="short_description">คำอธิบายสั้น:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="short_description"
                        maxLength={255}
                        value={formData.short_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="detailed_description">คำอธิบายละเอียด:</label>
                    <textarea
                        className='form-control'
                        name="detailed_description"
                        maxLength={5000}
                        value={formData.detailed_description}
                        onChange={handleChange}
                        required
                        roqws={6}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="category">หมวดหมู่สินค้า:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="category"
                        maxLength={20}
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="main_image">รูปภาพหลัก:</label>
                    <input
                        className='form-control'
                        type="file"
                        name="main_image"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="additional_image_1">รูปภาพเสริม 1:</label>
                    <input
                        className='form-control'
                        type="file"
                        name="additional_image_1"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="additional_image_2">รูปภาพเสริม 2:</label>
                    <input
                        className='form-control'
                        type="file"
                        name="additional_image_2"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit" className="custom-btn rounded">
                    บันทึกสินค้า
                </button>
            </form>
        </div>
    );
};

export default FormProduct;
