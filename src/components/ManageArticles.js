// rafce
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../confix/axios';


import Role from '../functions/role';
import { useLoadMore, formatDate, useNotificationCustom } from '../functions/functions';

const ManageArticles = () => {
    const token = localStorage.getItem('authToken');
    const { showNotification } = useNotificationCustom();

    const [data, setData] = useState([]);
    // const [form, setForm] = useState({});
    const { visible, loadMore } = useLoadMore(5, 5);


    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        const role = Role.getRole(token);
        console.log(role);
        const url = role === 'admin' ? '/article/list/admin' : '/article/user/articles/list';
        console.log(url);
        try {
            const response = await axios.get(url, {
                headers: {
                    'authToken': `Bearer ${token}`
                }
            });
            // console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    



    const handleRemove = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete("/article/" + id, {
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
        <div id="manage-articles" className="container my-4">
            <h3 className=" mb-4">จัดการบทความ</h3>

            {/* ปุ่มเพิ่มบทความใหม่ */}
            <div className="mb-3">
                <Link to="/formArticle">
                    <button className="btn btn-success rounded px-3 py-2">เพิ่มบทความใหม่</button>
                </Link>
            </div>

            {/* ตารางบทความ */}
            <div className="table-responsive">
                <table className="table table-bordered  table-hover text-center align-middle">
                    <thead className="table-secondary">
                        <tr>
                            <th>ลำดับ</th>
                            <th>หัวข้อ</th>
                            <th>หมวดหมู่</th>
                            <th>วันที่</th>
                            <th>การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.slice(0, visible).map((article, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{article.title}</td>
                                    <td>{article.category}</td>
                                    <td>{formatDate(article.createdAt)}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={`/article/edit/${article.id}`}>
                                                <button className="btn btn-primary btn-sm">แก้ไข</button>
                                            </Link>
                                            <button onClick={() => handleRemove(article.id)} className="btn btn-danger btn-sm">
                                                ลบ
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">ไม่มีข้อมูลบทความ</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* ปุ่มเพิ่มเติม */}
            {visible < data.length && (
                <div className="text-center mt-3">
                    <button className="custom-btn rounded" onClick={loadMore}>เพิ่มเติม</button>
                </div>
            )}
        </div>

    );
}

export default ManageArticles;
