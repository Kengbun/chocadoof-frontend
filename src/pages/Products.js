import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { fadeInUp } from '../functions/animation.js';

import { useNotificationCustom } from '../functions/functions'


// import './Products.css'
import Card from '../components/Card.js';
import axios from 'axios';
// import axios from '../confix/axios.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoadMore } from '../functions/functions.js';
import Loading from "../components/Loading";

const Products = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotificationCustom();
    

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/products/lists")
            setProducts(response.data);
            setOriginalProducts(response.data);
            // console.log(response.data);
        } catch (error) {
            // console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล", error);
            showNotification("error", "เกิดข้อผิดพลาด", "เกิดข้อผิดพลาดในการโหลดข้อมูล");
        } finally {
            setLoading(false);
        }
    }
    
    const { visible, loadMore } = useLoadMore(4, 10);



    const handleViewProduct = (productId) => {
        navigate(`/productdetail/${productId}`); // นำทางไปยังหน้าแสดงรายละเอียดสินค้า
    };

    const sortProducts = (criteria) => {
        let sorted = [...products];
        if (criteria === 'popular') {
            // 1) ดึงสินค้าทั้งหมดจาก originalProducts (สำเนาดั้งเดิม)
            //    แล้วจัดเรียงตาม averageRating จากมากไปน้อย
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
    // console.log(location)
    // const isHomePage = location.pathname === '/'; // ตรวจสอบว่าหน้าปัจจุบันคือหน้า Home

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (

                <div className={location.pathname === '/' ? ('container') : ('')}>

                    {location.pathname === '/' ? (
                        <div className="d-flex justify-content-between my-3">
                            <h2>สินค้ารีวิว</h2>
                            <Link to="/products" >ดูทั้งหมด &gt;</Link>
                        </div>

                    ) : (
                        <div>
                            <Banner />
                            <div className="p-4">
                                <h1 className="d-flex justify-content-center mt-3">สินค้า</h1>
                                <div className='mb-3 '

                                >
                                    <span className='bg-white fw-bold shadow rounded-pill border-0 px-3 py-1 ms-2 '
                                    >เรียงโดย:</span>
                                    <button className='bg-white fw-bold shadow rounded-pill border-0 px-3 py-1 ms-2 custom-transform' onClick={() => sortProducts('popular')}>ยอดนิยม</button >
                                    <button className='bg-white fw-bold shadow rounded-pill border-0 px-3 py-1 ms-2 custom-transform' onClick={() => sortProducts('latest')}>ล่าสุด</button >
                                    <button className='bg-white fw-bold shadow rounded-pill border-0 px-3 py-1 ms-2 custom-transform' onClick={() => sortProducts('dog')}>สุนัข</button >
                                    <button className='bg-white fw-bold shadow rounded-pill border-0 px-3 py-1 ms-2 custom-transform' onClick={() => sortProducts('cat')}>แมว</button >
                                    <button className='bg-white fw-bold shadow rounded-pill border-0 px-3 py-1 ms-2 custom-transform' onClick={() => sortProducts('reset')}>รีเซ็ต</button >

                                </div>
                            </div>
                        </div>
                    )}



                    <div className='container '>
                        <div className={`row row-cols-auto row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 ${location.pathname === '/' ? 'justify-content-center' : ''}`}>


                            {products.slice(0, visible).map((product, index) => (
                                <motion.div key={index} className='col m-0 '
                                    style={{
                                        width: '220px',
                                    }}
                                    {...fadeInUp(index * 0.1)}
                                >

                                    <Card
                                        image={product.main_image}
                                        title={product.product_name}
                                        rating={product.averageRating}
                                        productId={product.id}
                                        onClick={handleViewProduct}
                                        section='product'
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* // แสดงปุ่ม "โหลดเพิ่ม" หากมีสินค้าเหลือและไม่อยู่หน้าหลัก */}
                    {(visible < products.length && location.pathname !== '/') && (
                        <div className='d-flex justify-content-center mb-4'>
                            <button className='custom-btn rounded' onClick={loadMore}
                            >เพิ่มเติม</button>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default Products;
