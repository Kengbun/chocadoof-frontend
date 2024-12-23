import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Testpo = () => {
    const params = useParams();
    const apiUrl = process.env.REACT_APP_API;

    const [product, setProduct] = useState(null);
    const [review, setReview] = useState([]);
    const [mainImage, setMainImage] = useState(''); // ตั้งค่าเริ่มต้นเป็นรูป placeholder หรือ ''
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get(apiUrl + '/products/Details/' + params.id);
            setProduct(response.data.product);
            setReview(response.data.reviews);
            setAverageRating(response.data.averageRating);
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
                    onClick={() => setRating(i + 1)} // เมื่อคลิกที่ดาว จะเปลี่ยนคะแนน
                    style={{ cursor: 'pointer', color: i < rating ? '#ffd700' : '#ddd' }}
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
            </div>
        </div>

    );
};

export default Testpo;
