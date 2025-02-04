import React, { useEffect, useState } from 'react';
// import './AdminDashboard.css';
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
            const response = await axios.get("/users/dashboard", {
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
        <div className="d-flex">
            {/* Sidebar */}
            <aside className=" text-white p-3"
                style={{backgroundColor: "#2d3e50"}}
            >
                <h2 className='fw-bold '>Chocadoof Admin</h2>
                <nav className='navbar'>
                    <ul className=' navbar-nav gap-2' >
                        <li className=' nav-item custom-sidebar-item ' role="button" onClick={() => scrollToSection("dashboard")}>Dashboard</li>
                        <li className=' nav-item custom-sidebar-item' role="button" onClick={() => scrollToSection("manage-articles")}>จัดการบทความ</li>
                        <li className=' nav-item custom-sidebar-item' role="button" onClick={() => scrollToSection("manage-reviews")}>จัดการรีวิว</li>
                        <li className=' nav-item custom-sidebar-item' role="button" onClick={() => scrollToSection("manage-products")}>จัดการสินค้า</li>
                        <li className=' nav-item custom-sidebar-item' role="button" onClick={() => scrollToSection("manage-users")}>จัดการผู้ใช้งาน</li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="d-flex row w-100 p-4">
                <header className="container my-4 " id="dashboard">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body text-white "
                                    style={{ backgroundColor: "#1abc9c" }}
                                >
                                    <h5 className="card-title">บทความทั้งหมด</h5>
                                    <p className="fs-3 fw-bold ">{data.allArticles}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body text-white "
                                    style={{ backgroundColor: "#1abc9c" }}
                                >
                                    <h5 className="card-title">รีวิวทั้งหมด</h5>
                                    <p className="fs-3 fw-bold ">{data.allReviews}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center shadow-sm">
                                <div className="card-body text-white "
                                    style={{ backgroundColor: "#1abc9c" }}
                                >
                                    <h5 className="card-title">ผู้ใช้งาน</h5>
                                    <p className="fs-3 fw-bold ">{data.allUsers}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>


                <ManageUser />
                <ManageProducts />
                <ManageReviews />
                <ManageArticles />



            </main>
        </div>
    );
};

export default AdminDashboard;
