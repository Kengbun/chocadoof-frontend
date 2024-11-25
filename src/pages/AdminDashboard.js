import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>Chocadoof Admin</h2>
                <nav>
                    <ul>
                        <li>Dashboard</li>
                        <li>จัดการบทความ</li>
                        <li>จัดการรีวิว</li>
                        <li>จัดการสินค้า</li>
                        <li>จัดการผู้ใช้งาน</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="content">
                <header className="dashboard-header">
                    <div className="dashboard-card">
                        <h3>บทความทั้งหมด</h3>
                        <p>30</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>รีวิวทั้งหมด</h3>
                        <p>30</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>ผู้ใช้งาน</h3>
                        <p>30</p>
                    </div>
                </header>

                {/* Tables */}
                <section className="manage-section">
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
                </section>

                {/* Repeat for Reviews, Products, and Users */}
                <section className="manage-section">
                    <h3>จัดการรีวิว</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ชื่อผู้รีวิว</th>
                                <th>รีวิว</th>
                                <th>การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John</td>
                                <td>สินค้าดีมาก</td>
                                <td>
                                    <button className="btn btn-edit">แก้ไข</button>
                                    <button className="btn btn-delete">ลบ</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
