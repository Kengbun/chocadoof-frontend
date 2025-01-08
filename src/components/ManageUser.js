// import axios from 'axios';
import axios from '../confix/axios';
import React, { useEffect, useState } from 'react'

const ManageUser = () => {

    const token = localStorage.getItem('authToken');
    const [data, setData] = useState([]);
    const [visibleUsers, setVisibleUsers] = useState(5);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        // console.log(token);
        try {
            const response = await axios.get("/users/", {
                headers: {
                    'authToken': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    // ฟังก์ชันสำหรับแปลงวันที่
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH'); // แปลงให้เป็นรูปแบบวันที่ที่อ่านง่าย
    };

    // ฟังก์ชันสำหรับโหลดสินค้าเพิ่มเติม
    const loadMoreUsers = () => {
        setVisibleUsers((prev) => prev + 5); // เพิ่ม 5 ชิ้นต่อการกดครั้งหนึ่ง
    };

    // ฟังก์ชันสำหรับลบส user
    const handleRemove = async (id) => {
        // console.log(id);
        try {
            const response = await axios.delete( "/users/" + id, {
                headers: {
                    'authToken': `Bearer ${token}`
                }
            });
            // console.log(response.data);
            loadData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

    return (
        <div id = " manage-users"> 
            <h3>จัดการผู้ใช้</h3>

            <table className="article-table">
                <thead>
                    <tr>
                        <th>ชื่อ</th>
                        <th>อีเมล</th>
                        <th>วันที่ลงทะเบียน</th>
                        <th>การจัดการ</th>
                    </tr>
                </thead>
                { // ตรวจสอบว่ามีข้อมูลหรือไม่
                    data.length > 0 ? (
                        // แสดงข้อมูล
                        data.slice(0, visibleUsers).map((users, index) => (
                            <tr key={index}> {/* ใช้ key สำหรับแต่ละแถว */}
                                {/* <td>{index + 1}</td> */}
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{formatDate(users.createdAt)}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleRemove(users.id)}
                                    >ลบ</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">ไม่มีข้อมูล</td>
                        </tr>
                    )
                }

            </table>
            {/* แสดงปุ่มเพิ่มเติม */}
            {visibleUsers < data.length && (
                <div className="load-more">
                    <button onClick={loadMoreUsers}>เพิ่มเติม</button>
                </div>
            )}
        </div>
    )
}

export default ManageUser
