import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './Products.css';
import axios from 'axios';
// import axios from '../confix/axios.js';
import { useLocation, useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get("/products/lists")
            setProducts(response.data);
            setOriginalProducts(response.data);
            // console.log(response.data);
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

    // ฟังก์ชันแปลงคะแนนเป็นจำนวนดาว
    const getStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < rating ? 'selected' : ''}
                    style={{ color: i < rating ? '#ffd700' : '#ddd' }}
                />
            );
        }
        return stars;
    };

    const handleViewProduct = (productId) => {
        navigate(`/productdetail/${productId}`); // นำทางไปยังหน้าแสดงรายละเอียดสินค้า
    };

    const sortProducts = (criteria) => {
        let sorted = [...products];
        if (criteria === 'popular') {
            sorted = [...originalProducts];
            sorted.sort((a, b) => b.averageRating - a.averageRating);
            // console.log(sorted);
        } else if (criteria === 'latest') {
            sorted = [...originalProducts];
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (criteria === 'dog') {
            sorted = [...originalProducts];
            sorted = sorted.filter(product => product.category === 'dog' || product.category === 'สุนัข');
        } else if (criteria === 'cat') {
            sorted = [...originalProducts];
            sorted = sorted.filter(product => product.category === 'cat' || product.category === 'แมว');
        } else if (criteria === 'reset') {
            sorted = [...originalProducts];
        }
        setProducts(sorted);
    };
    const location = useLocation();
    // const isHomePage = location.pathname === '/'; // ตรวจสอบว่าหน้าปัจจุบันคือหน้า Home

    return (
        <div>

            {location.pathname === '/' ? (
                <div>
                    <div className="section-header">
                        <h2>สินค้ารีวิว</h2>
                        <a href="/products" className="see-more">ดูทั้งหมด &gt;</a>
                    </div>
                    < div className="product-list">
                        {products.slice(0, visibleProducts).map((product, index) => (
                            <div key={index} className="product-card">
                                <img src={product.main_image} alt={product.product_name} />
                                <h3>{product.product_name}</h3>
                                <p className="product-rating">{getStars(product.averageRating)}</p>
                                <button
                                    className='product-btn'
                                    onClick={() => handleViewProduct(product.id)}
                                >ดูสินค้า</button>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (

                <div>
                    <Banner />
                    <div className="product-page">
                        <h1 className="page-title">สินค้า</h1>
                        <div className='product-filter'>
                            <span>เรียงโดย:</span>
                            <button className='button-filter' onClick={() => sortProducts('popular')}>ยอดนิยม</button >
                            <button className='button-filter' onClick={() => sortProducts('latest')}>ล่าสุด</button >
                            <button className='button-filter' onClick={() => sortProducts('dog')}>สุนัข</button >
                            <button className='button-filter' onClick={() => sortProducts('cat')}>แมว</button >
                            <button className='button-filter' onClick={() => sortProducts('reset')}>รีเซ็ต</button >

                        </div>
                        <div className="product-list">
                            {products.slice(0, visibleProducts).map((product, index) => (
                                <div key={index} className="product-card">
                                    <img src={product.main_image} alt={product.product_name} />
                                    <h3>{product.product_name}</h3>
                                    <p className="product-rating">{getStars(product.averageRating)}</p>
                                    <button
                                        className='product-btn'
                                        onClick={() => handleViewProduct(product.id)}
                                    >ดูสินค้า</button>
                                </div>
                            ))}
                        </div>
                        {visibleProducts < products.length && ( // แสดงปุ่ม "โหลดเพิ่ม" หากมีสินค้าเหลือ
                            <div className="load-more">
                                <button onClick={loadMoreProducts}>เพิ่มเติม</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
