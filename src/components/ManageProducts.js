// import axios from 'axios';
import axios from '../confix/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ManageProducts = () => {

    const token = localStorage.getItem('authToken');
    const [data, setData] = useState([]);
    // สถานะสำหรับจัดการจำนวนสินค้าที่แสดง
    const [visibleProducts, setVisibleProducts] = useState(10);

    // โหลดข้อมูล
    useEffect(() => {
        loadData()
    }, []);

    // ฟังก์ชันสำหรับโหลดข้อมูล
    const loadData = async () => {
        // console.log(token);
        try {
            const response = await axios.get( "/products/lists", {
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
            const response = await axios.delete( "/products/" +id, {
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


    // ฟังก์ชันสำหรับโหลดสินค้าเพิ่มเติม
    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 10); // เพิ่ม 10 ชิ้นต่อการกดครั้งหนึ่ง
    };

    // ฟังก์ชันสำหรับแปลงวันที่
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH'); // แปลงให้เป็นรูปแบบวันที่ที่อ่านง่าย
    };

    return (
        <div id="manage-products">
            <h3>จัดการสินค้า</h3>
            <Link to={"/formproduct"}>
                <button className="add-article-btn">เพิ่มสินค้าใหม่</button>
            </Link>
            <table className="article-table">
                <thead>
                    <tr>
                        <th>ชื่อสินค้า</th>
                        <th>หมวดหมู่</th>
                        <th>วันที่</th>
                        {/* <th>วันที</th> */}
                        {/* <th>id</th> */}
                        <th>การจัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    { // ตรวจสอบว่ามีข้อมูลหรือไม่
                        data.length > 0 ? (
                            // แสดงข้อมูล
                            data.slice(0, visibleProducts).map((products, index) => (
                                <tr key={index}> {/* ใช้ key สำหรับแต่ละแถว */}
                                    {/* <td>{index + 1}</td> */}
                                    <td>{products.product_name}</td>
                                    <td>{products.category}</td>
                                    <td>{formatDate(products.createdAt)}</td>
                                    {/* <td>{data(products.createdAt)}</td> */}
                                    <td>
                                        <Link to={"/product/edit/" + products.id}>
                                            <button className="edit-btn">แก้ไข</button>
                                        </Link>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleRemove(products.id)}
                                        >ลบ</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">ไม่มีข้อมูลสินค้า</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {/* แสดงปุ่มเพิ่มเติม */}
            {visibleProducts < data.length && (
                <div className="load-more">
                    <button onClick={loadMoreProducts}>เพิ่มเติม</button>
                </div>
            )}
        </div>
    )
}

export default ManageProducts
