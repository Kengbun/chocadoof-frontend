import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;

const FormEditArticle = () => {

    const params = useParams(); //URL params
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

    // console.log(params.id);

    useEffect(() => {
        loadData(params.id) //โหลดข้อมูลจาก id
        setSelectedCoverImage(data.coverImage); // อัปเดต selectedCoverImage เมื่อ data.coverImage เปลี่ยน
        setSelectedAdditionalImage(data.contentImage);// อัปเดต selectedAdditionalImage เมื่อ data.additionalImage เปลี่ยน
    }, []);

    const loadData = (id) => {
        axios.get(apiUrl + "/article/" + id)
            .then((res) => {
                // console.log(res);  
                setData(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault() // ไม่ให้รีเฟรช
        console.log(data)
        await axios.put(apiUrl + "/article/" + params.id, data)
            .then(res => {
                // console.log(data)
                // loadData();
                navigate("/")
            })
            .catch((err) => console.log(err))
    }

    console.log(data)
    // console.log(selectedCoverImage)
    // console.log(selectedAdditionalImage)

    

    // ฟังก์ชันที่จัดการเมื่อเลือกไฟล์ภาพหน้าปก
    const handleCoverImageChange = (event) => {
        const file = event.target.files[0]; // เลือกไฟล์แรกจากไฟล์ที่เลือก
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedCoverImage(reader.result); // เก็บข้อมูลภาพที่เลือกลงใน state
                setData({
                    ...data,
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
                setData({
                    ...data,
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
                        name="title"
                        value={data.title}
                        onChange={e => handleChange(e)}
                        placeholder="กรอกหัวข้อบทความ"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">หมวดหมู่:</label>
                    <input
                        type="text"

                        name="category"
                        value={data.category}
                        onChange={e => handleChange(e)}
                        placeholder="กรอกหมวดหมู่"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="coverImage">รูปภาพหน้าปก:</label>
                    <input
                        type="file"
                        name="coverImage"
                        onChange={handleCoverImageChange} // เรียกใช้ฟังก์ชัน handleCoverImageChange
                    />
                    {/* แสดงตัวอย่างภาพหน้าปกที่เลือก */}
                    {selectedCoverImage && (
                        <div>
                            <h3>ตัวอย่างภาพหน้าปก:</h3>
                            <img
                                src={selectedCoverImage }
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

                        name="content"
                        value={data.content}
                        onChange={e => handleChange(e)}
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
}

export default FormEditArticle
