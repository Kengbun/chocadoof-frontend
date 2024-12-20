import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_API;
const token = localStorage.getItem('authToken');


const FormEditProduct = () => {
    const params = useParams();

    const [data, setdata] = useState({
        product_name: "",
        short_description: "",
        detailed_description: "",
        category: "",
        main_image: "",
        additional_image_1: "",
        additional_image_2: "",
    });

    // const [images, setImages] = useState({
    //     main_image: null,
    //     additional_image_1: null,
    //     additional_image_2: null,
    // });

    useEffect(() => {
        loadData(params.id);
        console.log(params.id);
    }, [params.id]);

    const loadData = async (id) => {
        try {
            const response = await axios.get(apiUrl + "/products/" + id, {
                headers: {
                    'authToken': `Bearer ${token}`
                }
            });
            setdata(response.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
        console.log(data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value });
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            setdata({ ...data, [name]: files[0] });
        }
    };

    console.log(data.additional_image_2);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(data.additional_image_2 );
            
            // อัปเดตข้อมูลสินค้า
            const formData = new FormData();
            formData.append("product_name", data.product_name);
            formData.append("short_description", data.short_description);
            formData.append("detailed_description", data.detailed_description);
            formData.append("category", data.category);
            formData.append("main_image", data.main_image);
            formData.append("additional_image_1", data.additional_image_1);
            formData.append("additional_image_2", data.additional_image_2);


            // ถ้ารูปภาพใหม่ไม่มีการอัปโหลด ให้ใช้ค่ารูปเดิม
            if (formData.main_image instanceof File) {
                formData.append("main_image", formData.main_image);
            }
            if (formData.additional_image_1 instanceof File) {
                formData.append("additional_image_1", formData.additional_image_1);
            }
            if (formData.additional_image_2 instanceof File) {
                formData.append("additional_image_2", formData.additional_image_2);
            }

            const response = await axios.put(`${apiUrl}/products/${params.id}`, formData, {
                headers: {
                    'authToken': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            
            console.log("Product updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };




    return (
        <div className="form-container">
            <h2>แก้ไข้ข้อมูลสินค้า</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="product_name">ชื่อสินค้า:</label>
                    <input
                        type="text"
                        name="product_name"
                        value={data.product_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="short_description">คำอธิบายสั้น:</label>
                    <input
                        type="text"
                        name="short_description"
                        value={data.short_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="detailed_description">คำอธิบายละเอียด:</label>
                    <textarea
                        name="detailed_description"
                        value={data.detailed_description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="category">หมวดหมู่สินค้า:</label>
                    <input
                        type="text"
                        name="category"
                        value={data.category}
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

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="additional_image_1">รูปภาพเสริม 1:</label>
                    <input
                        type="file"
                        name="additional_image_1"
                        onChange={handleImageChange}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="additional_image_2">รูปภาพเสริม 2:</label>
                    <input
                        type="file"
                        name="additional_image_2"
                        onChange={handleImageChange}

                    />
                </div>
                <button type="submit" className="submit-button">
                    บันทึกสินค้า
                </button>
            </form>
        </div>
    )
}

export default FormEditProduct
