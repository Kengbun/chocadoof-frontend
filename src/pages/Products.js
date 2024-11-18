import React, { useState } from 'react';
import Footer from '../components/Footer.js';
import img from '../assets/imgProduct/img.jpg';
import Banner from '../components/Banner.js';

import './Products.css';

const Products = () => {
    // ข้อมูลสินค้า
    const products = [
        { id: 1, name: "อาหารสุนัข พันธุ์ใหญ่ (MAXI PUPPY)", image: img, rating: 5 },
        { id: 2, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 4 },
        { id: 3, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 3 },
        { id: 4, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 2 },
        { id: 5, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 1 },
        { id: 6, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 0 },
        { id: 7, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 5 },
        { id: 8, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 4 },
        { id: 9, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 3 },
        { id: 10, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 2 },
        { id: 11, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 1 },
        { id: 12, name: "อาหารสุนัข พันธุ์กลาง (MEDIUM PUPPY)", image: img, rating: 0 },
        // เพิ่มข้อมูลสินค้าเพิ่มเติมตามต้องการ
    ];

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
                    {products.slice(0, visibleProducts).map((product, index) => (
                        <div key={index} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <div className="product-rating">
                                {"⭐".repeat(product.rating)}
                            </div>
                            <button className='product-btn'>ดูสินค้า</button>
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
