import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer.js';
import img from '../assets/imgProduct/img.jpg';
import Banner from '../components/Banner.js';

import './Products.css';
import axios from 'axios';

const Products = () => {
    const apiUrl = process.env.REACT_APP_API;
    const token = localStorage.getItem('authToken');
    const [data, setData] = useState([]);


    useEffect(() => {
        loadData();
        console.log(data);
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get(apiUrl + "/products/lists", {
                headers: {
                    'authToken': `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    // สถานะสำหรับจัดการจำนวนสินค้าที่แสดง
    const [visibleProducts, setVisibleProducts] = useState(5);

    // ฟังก์ชันสำหรับโหลดสินค้าเพิ่มเติม
    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 10); // เพิ่ม 10 ชิ้นต่อการกดครั้งหนึ่ง
    };

    return (
        <div>
            <Banner />
            <div className="product-page">
                <h1 className="page-title">สินค้า</h1>
                <div className="product-filter">
                    <span>เรียงโดย: ยอดนิยม ล่าสุด สุนัข แมว</span>
                </div>
                <div className="product-list">
                    {data.slice(0, visibleProducts).map((data, index) => (
                        <div key={index} className="product-card">
                            <img src={data.main_image} alt={data.product_name} />
                            <h3>{data.product_name}</h3>
                            <div className="product-rating">
                                {"⭐".repeat()}
                            </div>
                            <button className='product-btn'>ดูสินค้า</button>
                        </div>
                    ))}
                </div>
                {visibleProducts < data.length && ( // แสดงปุ่ม "โหลดเพิ่ม" หากมีสินค้าเหลือ
                    <div className="load-more">
                        <button onClick={loadMoreProducts}>เพิ่มเติม</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Products;
