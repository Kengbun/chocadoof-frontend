// import axios from 'axios';
import axios from '../confix/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLoadMore, formatDate, useNotificationCustom } from '../functions/functions';

const ManageProducts = () => {
    

    const token = localStorage.getItem('authToken');
    const [data, setData] = useState([]);
    // สถานะสำหรับจัดการจำนวนสินค้าที่แสดง
    const { visible, loadMore } = useLoadMore(5, 5);
    const { showNotification } = useNotificationCustom();

    // โหลดข้อมูล
    useEffect(() => {
        loadData()
    }, []);

    // ฟังก์ชันสำหรับโหลดข้อมูล
    const loadData = async () => {
        // console.log(token);
        try {
            const response = await axios.get("/products/lists", {
                headers: {
                    'authToken': `Bearer ${token}`
                }
            });
            // console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    // ฟังก์ชันสำหรับลบสินค้า
    const handleRemove = async (id) => {
        // console.log(id);
        try {
            const response = await axios.delete("/products/" + id, {
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
        <div id="manage-products" className="container my-4">
            <h3 className="mb-4">จัดการสินค้า</h3>

            {/* ปุ่มเพิ่มสินค้าใหม่ */}
            <div className="mb-3">
                <Link to="/formproduct">
                    <button className="btn btn-success rounded px-3 py-2">เพิ่มสินค้าใหม่</button>
                </Link>
            </div>

            {/* ตารางสินค้า */}
            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                    <thead className="table-secondary">
                        <tr>
                            <th>ชื่อสินค้า</th>
                            <th>หมวดหมู่</th>
                            <th>วันที่</th>
                            <th>การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.slice(0, visible).map((product, index) => (
                                <tr key={index}>
                                    <td>{product.product_name}</td>
                                    <td>{product.category}</td>
                                    <td>{formatDate(product.createdAt)}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={`/product/edit/${product.id}`}>
                                                <button className="btn btn-primary btn-sm">แก้ไข</button>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemove(product.id)}
                                            >
                                                ลบ
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">ไม่มีข้อมูลสินค้า</td>
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

    )
}

export default ManageProducts
