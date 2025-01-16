// import axios from 'axios';
import axios from '../confix/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import FormReview from '../components/FormReview';
import './ProductDetail.css';


const ProductDetail = () => {
    const params = useParams();

    const [product, setProduct] = useState(null);
    const [review, setReview] = useState([]);
    const [users, setUsers] = useState([]);
    const [mainImage, setMainImage] = useState(''); // ตั้งค่าเริ่มต้นเป็นรูป placeholder หรือ ''
    // const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [section, setSection] = useState("description");

    useEffect(() => {
        checkLoginStatus();
        loadData();
    }, []);
    // ตรวจสอบสถานะการเข้าสู่ระบบ
    const checkLoginStatus = () => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token); // แปลง Token ให้เป็น Boolean
    }

    const loadData = async () => {
        try {
            const response = await axios.get( '/products/Details/' + params.id);
            setProduct(response.data.product);
            setReview(response.data.reviews);
            setAverageRating(response.data.averageRating);
            setUsers(response.data.users);
            console.log(response.data);
            // const averageRating = (response.data.averageRating);
        } catch (err) {
            console.log(err);
        }
    };

    // ตั้งค่า mainImage หลังจาก product โหลดเสร็จ
    useEffect(() => {
        if (product) {
            setMainImage(product.main_image);
        }
    }, [product]);

    if (!product) {
        return <p>กำลังโหลดข้อมูล...</p>;
    }


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



    return (
        <div>
            <div className="product-detail-container">

                <div className="product-detail">

                    {/* ส่วนแสดงภาพสินค้า */}
                    <div className="product-gallery">
                        <img src={mainImage} alt="สินค้า" className="main-product-image" />
                        <div className="thumbnail-gallery">
                            <img
                                src={product.main_image}
                                alt="ตัวอย่าง 1"
                                className="thumbnail"
                                onClick={() => setMainImage(product.main_image)}
                            />
                            <img
                                src={product.additional_image_1}
                                alt="ตัวอย่าง 2"
                                className="thumbnail"
                                onClick={() => setMainImage(product.additional_image_1)}
                            />
                            <img
                                src={product.additional_image_2}
                                alt="ตัวอย่าง 3"
                                className="thumbnail"
                                onClick={() => setMainImage(product.additional_image_2)}
                            />
                        </div>
                    </div>
                    {/* ส่วนรายละเอียดสินค้า */}
                    <div className="product-info">
                        <h1>{product.product_name}</h1>
                        <p className="product-rating">
                            {/* เพิ่มดาวตามคะแนนเฉลี่ย */}
                            {getStars(Math.round(averageRating))}
                        </p>
                        <p className="product-description">
                            {product.short_description}
                        </p>
                    </div>
                </div>
                {/*เปลี่ยน Section */}
                <div className='set-section'>
                    <h1 style={{ cursor: 'pointer' }} onClick={() => setSection("description")}> รายละเอียด</h1>
                    <h1 style={{ cursor: 'pointer' }} onClick={() => setSection("review")}>รีวิว</h1>
                </div>
                <hr width="85%" align="center" size="2px" noshade color="black"></hr>

                {/*Section รีวิวสินค้า */}
                {section === 'description' ? (
                    <div className={`section-transition ${section === 'description' ? 'active' : ''}`}>
                        <h3>รายละเอียด</h3>
                        <p className="product-description">
                            {product.detailed_description}
                        </p>
                    </div>
                ) : (
                        <div className={`section-transition ${section === 'description' ? 'active' : ''}`}>
                        {/*Section รีวิวสินค้า */}
                        <div className="review-section">
                            <h3>รีวิวจากลูกค้า</h3>
                            {review.map((rev, index) => {
                                const reviewer = users.find(user => user.id === rev.user_id);
                                return (
                                    <div key={index} className="review-item">
                                        <img
                                            src={reviewer.profile_picture || "https://picsum.photos/200/300"}
                                            alt="ผู้รีวิว"
                                            className="reviewer-avatar"
                                        />
                                        <div className="reviewer-avatar-detail">
                                            <p className="reviewer-name">{reviewer.name}</p>
                                            <p className="product-rating">{getStars(rev.rating)}</p>
                                            <p className="review-text">{rev.review_description}</p>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                        <hr width="85%" align="center" size="2px" noshade color="black"></hr>
                        {isLoggedIn ? (
                                <FormReview params={params} reviewSubmitted ={loadData}/>
                            
                        ) : (
                            <p>กรุณา <a href="/login">ล็อกอิน</a> เพื่อเขียนรีวิว</p>
                        )}
                    </div>
                )}
            </div>
        </div>

    );
};

export default ProductDetail;
