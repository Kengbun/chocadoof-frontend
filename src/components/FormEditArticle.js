import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../confix/axios';
import { useNotificationCustom } from '../functions/functions'



const FormEditArticle = () => {
    const params = useParams(); // URL params
    const [data, setData] = useState({
        title: '',
        category: '',
        content: '',
        coverImage: '',
        contentImage: ''
    });
    const [selectedCoverImage, setSelectedCoverImage] = useState(null); // เก็บภาพหน้าปก
    const [selectedcontentImage, setSelectedcontentImage] = useState(null); // เก็บรูปภาพเพิ่มเติม
    const navigate = useNavigate();
    const { showNotification } = useNotificationCustom();

    useEffect(() => {
        loadData(params.id); // โหลดข้อมูลจาก id
    }, [params.id]); // เพิ่ม params.id ใน dependencies เพื่อโหลดข้อมูลใหม่เมื่อ id เปลี่ยน

    const loadData = (id) => {
        axios.get("/article/" + id)
            .then((res) => {
                setData(res.data);
                setSelectedCoverImage(res.data.coverImage); // อัปเดต selectedCoverImage เมื่อ data.coverImage เปลี่ยน
                setSelectedcontentImage(res.data.contentImage); // ใช้ contentImage แทน contentImage
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log("//////////////"+data)    
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // เพิ่มค่าของ text fields
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("content", data.content);

        // เพิ่มไฟล์ที่เลือกใน formData
        if (selectedCoverImage && selectedCoverImage instanceof File) {
            formData.append("coverImage", selectedCoverImage);
        }

        if (selectedcontentImage && selectedcontentImage instanceof File) {
            formData.append("contentImage", selectedcontentImage);
        }

        try {
            const response = await axios.put(`/article/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            // console.log(response.data);
            showNotification("success", "อัปเดตสำเร็จ", "บทความถูกอัปเดตเรียบร้อยแล้ว!");
            navigate("/profile"); // ไปที่หน้าอื่นหลังจากอัปเดตเสร็จ
        } catch (error) {
            // console.error("Error updating article:", error);
            // alert('เกิดข้อผิดพลาดในการอัปเดตบทความ!');
            showNotification("error", "เกิดข้อผิดพลาด",error.message || "เกิดข้อผิดพลาดในการอัปเดตบทความ!");
        }
    };

    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedCoverImage(file); // เก็บไฟล์ที่เลือก
        }
    };

    const handlecontentImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedcontentImage(file); // เก็บไฟล์ที่เลือก
        }
    };

    // ฟังก์ชันช่วยในการแสดงภาพตัวอย่าง
    const renderImagePreview = (image) => {
        if (image instanceof File) {
            return URL.createObjectURL(image); // ถ้าเป็นไฟล์ที่เลือกจากเครื่อง
        }
        return image; // ถ้าเป็น URL หรือ path ของภาพที่มีอยู่แล้ว
    };
    console.log(data)
    console.log(selectedCoverImage)
    console.log(selectedcontentImage)

    return (
        <div className="container card my-5 p-5 shadow"
            // style={{ maxWidth: '600px' }}
        >
            <h2>แก้ไข้ข้อมูลบทความ</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="title">หัวข้อบทความ :</label>
                    <input
                        className='form-control'
                        type="text"
                        name="title"
                        maxLength={150}   //กำหนดใส่ได้ไม่เกิน 150 ตัว
                        value={data.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label fw-bold text-dark' htmlFor="category">หมวดหมู่:</label>
                    <input
                        className='form-control'
                        type="text"
                        name="category"
                        maxLength={20}   //กำหนดใส่ได้ไม่เกิน 20 ตัว
                        value={data.category}
                        onChange={handleChange}
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
                                src={renderImagePreview(selectedCoverImage)}
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
                        onChange={handlecontentImageChange}
                    />
                    {selectedcontentImage && (
                        <div className='mt-3'>
                            <h5>ตัวอย่างรูปภาพเพิ่มเติม:</h5>
                            <img
                                src={renderImagePreview(selectedcontentImage)}
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
                        maxLength={10000}   //กำหนดใส่ได้ไม่เกิน 10000 ตัว
                        value={data.content}
                        onChange={handleChange}
                        rows="10"
                    ></textarea>
                </div>
                <button type="submit" className="custom-btn rounded">
                    บันทึกบทความ
                </button>
            </form>

        </div>
    );
};

export default FormEditArticle;
