import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer.js';
import img from '../assets/imgProduct/img.jpg';
import Banner from '../components/Banner.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './Products.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API;
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get(apiUrl + "/products/lists")
            setProducts(response.data);
            setOriginalProducts(response.data);
            console.log(response.data);
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
            sorted.sort((a, b) => b.averageRating - a.averageRating);
            // console.log(sorted);
        } else if (criteria === 'latest') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (criteria === 'dog') {
            sorted = sorted.filter(product => product.category === 'dog');
        } else if (criteria === 'cat') {
            sorted = sorted.filter(product => product.category === 'cat');
        } else if (criteria === 'reset') {
            sorted = [...originalProducts];
        }
        setProducts(sorted);
    };

    return (
        <div>
            <Banner />
            <div className="product-page">
                <h1 className="page-title">สินค้า</h1>
                <div className="product-filter">
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
            <Footer />
        </div>
    );
};

export default Products;
