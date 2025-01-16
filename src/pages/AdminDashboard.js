import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import ManageReviews from '../components/ManageReviews';
import ManageProducts from '../components/ManageProducts';
import ManageArticles from '../components/ManageArticles';
import ManageUser from '../components/ManageUser';
// import axios from 'axios';
import axios from '../confix/axios';
const AdminDashboard = () => {

    const token = localStorage.getItem('authToken');
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        // console.log(token);
        try {
            const response = await axios.get( "/users/dashboard", {
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
    // ฟังก์ชันสำหรับเลื่อน
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>Chocadoof Admin</h2>
                <nav>
                    <ul>
                        <li onClick={() => scrollToSection("dashboard")}>Dashboard</li>
                        <li onClick={() => scrollToSection("manage-articles")}>จัดการบทความ</li>
                        <li onClick={() => scrollToSection("manage-reviews")}>จัดการรีวิว</li>
                        <li onClick={() => scrollToSection("manage-products")}>จัดการสินค้า</li>
                        <li onClick={() => scrollToSection("manage-users")}>จัดการผู้ใช้งาน</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="content">
                <header className="dashboard-header">
                    <div className="dashboard-card">
                        <h3>บทความทั้งหมด</h3>
                        <p>{data.allArticles}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>รีวิวทั้งหมด</h3>
                        <p>{data.allReviews}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>ผู้ใช้งาน</h3>
                        <p>{data.allUsers}</p>
                    </div>
                </header>

                <ManageUser />
                <ManageProducts />
                <ManageReviews />
                <ManageArticles />

                {/* Tables */}
                {/* <section className="manage-section">
                    <h3>จัดการบทความ</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ชื่อบทความ</th>
                                <th>หมวดหมู่</th>
                                <th>วันที่</th>
                                <th>การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>การดูแลสุนัขสำหรับผู้เริ่มต้น</td>
                                <td>กรูมมิ่ง</td>
                                <td>2024-11-25</td>
                                <td>
                                    <button className="btn btn-edit">แก้ไข</button>
                                    <button className="btn btn-delete">ลบ</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section> */}


            </main>
        </div>
    );
};

export default AdminDashboard;
