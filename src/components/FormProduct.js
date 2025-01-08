import React, { useState } from "react";
// import axios from "axios";
import axios from '../confix/axios';

const FormProduct = () => {
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
                console.error('Token not found. Please log in again.');
                return;
            }

            await axios.post(`/products`, data, {
                headers: {
                    'authtoken': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log(data);
            alert("บันทึกข้อมูลสินค้าสำเร็จ");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูลสินค้า");
        }
    };

    return (
        <div className="form-container">
            <h2>เพิ่มข้อมูลสินค้า</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="product_name">ชื่อสินค้า:</label>
                    <input
                        type="text"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="short_description">คำอธิบายสั้น:</label>
                    <input
                        type="text"
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="detailed_description">คำอธิบายละเอียด:</label>
                    <textarea
                        name="detailed_description"
                        value={formData.detailed_description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="category">หมวดหมู่สินค้า:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="main_image">รูปภาพหลัก:</label>
                    <input
                        type="file"
                        name="main_image"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="additional_image_1">รูปภาพเสริม 1:</label>
                    <input
                        type="file"
                        name="additional_image_1"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="additional_image_2">รูปภาพเสริม 2:</label>
                    <input
                        type="file"
                        name="additional_image_2"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    บันทึกสินค้า
                </button>
            </form>
        </div>
    );
};

export default FormProduct;
