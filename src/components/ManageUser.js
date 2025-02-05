// import axios from 'axios';
import axios from '../confix/axios';
import React, { useEffect, useState } from 'react'
import {useLoadMore, formatDate, useNotificationCustom }from '../functions/functions';

const ManageUser = () => {

    const token = localStorage.getItem('authToken');
    const [data, setData] = useState([]);
    const {visible, loadMore} = useLoadMore(5,5);
    const { showNotification } = useNotificationCustom();

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

   


    // ฟังก์ชันสำหรับลบส user
    const handleRemove = async (id) => {
        // console.log(id);
        try {
            const response = await axios.delete("/users/" + id, {
                headers: {
                    'authToken': `Bearer ${token}`
                }
            });
            // console.log(response.data);
            showNotification("success", "ลบข้อมูลสำเร็จ", "");
            loadData();
        } catch (error) {
            console.error("Error deleting data:", error);
            showNotification("error", "เกิดข้อผิดพลาด", error.message || "เกิดข้อผิดพลาด");
        }
    }

    return (
        <div id="manage-users" className="container my-4">
            <h3 className=" mb-4">จัดการผู้ใช้</h3>

            {/* ตารางผู้ใช้ */}
            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                    <thead className="table-secondary">
                        <tr>
                            <th>ชื่อ</th>
                            <th>อีเมล</th>
                            <th>วันที่ลงทะเบียน</th>
                            <th>การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.slice(0, visible).map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{formatDate(user.createdAt)}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleRemove(user.id)}>
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">ไม่มีข้อมูล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ปุ่มเพิ่มเติม */}
            {visible < data.length && (
                <div className="text-center mt-3">
                    <button className="custom-btn rounded" onClick={loadMore}>
                        เพิ่มเติม
                    </button>
                </div>
            )}
        </div>

    )
}

export default ManageUser
