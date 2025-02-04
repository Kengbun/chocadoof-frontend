// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../confix/axios';


const token = localStorage.getItem('authToken');


const FormEditProduct = () => {
    const params = useParams();
    const navigate = useNavigate();

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
            const response = await axios.get("/products/" + id, {
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
            console.log(data.additional_image_2);

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

            const response = await axios.put(`/products/${params.id}`, formData, {
                headers: {
                    'authToken': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });


            console.log("Product updated successfully:", response.data);
            navigate("/");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };




    return (
        <div className="container card my-5 p-5 shadow"
            // style={{ maxWidth: '600px' }}
        >
            <h2>แก้ไข้ข้อมูลสินค้า</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="product_name">ชื่อสินค้า:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="product_name"
                        maxLength={100}
                        value={data.product_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <div className="mb-3">
                        <label className='form-label fw-bold text-dark' htmlFor="category">หมวดหมู่สินค้า:</label>
                        <input
                            className='form-control'
                            type="text"
                            name="category"
                            maxLength={20}
                            value={data.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <label className='form-label fw-bold text-dark' htmlFor="short_description">คำอธิบายสั้น:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="short_description"
                        maxLength={255}
                        value={data.short_description}
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
                        value={data.detailed_description}
                        onChange={handleChange}
                        required
                        rows={6}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="main_image">รูปภาพหลัก:</label>
                    <input
                        className='form-control'
                        type="file"
                        name="main_image"
                        onChange={handleImageChange}

                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="additional_image_1">รูปภาพเสริม 1:</label>
                    <input
                        className='form-control'
                        type="file"
                        name="additional_image_1"
                        onChange={handleImageChange}

                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="additional_image_2">รูปภาพเสริม 2:</label>
                    <input
                        className='form-control'
                        type="file"
                        name="additional_image_2"
                        onChange={handleImageChange}

                    />
                </div>
                <button type="submit" className="custom-btn rounded">
                    บันทึกสินค้า
                </button>
            </form>
        </div>
    )
}

export default FormEditProduct
