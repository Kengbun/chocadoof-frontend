// rafce
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageArticles = () => {
    const apiUrl = process.env.REACT_APP_API;


    const [data, setData] = useState([]);
    // const [form, setForm] = useState({});


    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        await axios.get(apiUrl + "/article/")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    };

    // ฟังก์ชันสำหรับแปลงวันที่
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH'); // แปลงให้เป็นรูปแบบวันที่ที่อ่านง่าย
    };

    // const handleChange = (e) => {
    //     // console.log(e.target.name, e.target.value);
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value
    //     })
    // }
    // console.log(form)
    // const handleSubmit = async (e) => {
    //     e.preventDefault() // ไม่ให้รีเฟรช
    //     // console.log(form)
    //     await axios.post(apiUrl + "/article/", form)
    //         .then(res => {
    //             console.log(res.data);
    //             loadData();
    //         })
    //         .catch((err) => console.log(err))
    // }

    const handleRemove = async (id) => {
        console.log(id);
        await axios.delete(apiUrl + "/article/" + id)
            .then(res => {
                console.log(res.data);
                loadData();
            })
            .catch((err) => console.log(err))
    }


    return (
        <div>
            <h3>จัดการบทความ</h3>
            <button className="add-article-btn">เพิ่มบทความใหม่</button>
            <table className="article-table">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>หัวข้อ</th>
                        <th>หมวดหมู่</th>
                        <th>วันที่</th>
                        {/* <th>id</th> */}
                        <th>การจัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ? data.map((article, index) => (
                            <tr key={index}> {/* ใช้ key สำหรับแต่ละแถว */}
                                <td>{index + 1}</td>
                                <td>{article.title}</td>
                                <td>{article.category}</td>
                                <td>{formatDate(article.createdAt)}</td>
                                <td>
                                    {article.contentImage ? (
                                        <img
                                            src={article.contentImage}
                                            alt="Content Image"
                                            style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <span>No Image</span> // กรณีที่ไม่มีภาพ
                                    )}
                                </td>
                                <td>{article.id}</td>
                                <td>
                                    <Link to={"/edit/" + article.id}>
                                        <button className="edit-btn">แก้ไข</button>
                                    </Link>
                                    <button onClick={() => handleRemove(article.id)} className="delete-btn">ลบ</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4">ไม่มีข้อมูลบทความ</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            {/* <form onSubmit={handleSubmit}>
                <input type='text' name='title' onChange={e => handleChange(e)} placeholder='title' />
                <input type='text' name='category' onChange={e => handleChange(e)} placeholder='category' />
                <input type='text' name='content' onChange={e => handleChange(e)} placeholder='content' />
                <button>submit</button>
            </form> */}
        </div>
    );
}

export default ManageArticles;
