import React, { useState } from 'react';
import './ProductDetail.css';
import ProductImage1 from '../assets/imgProduct/img.jpg';
import ProductImage2 from '../assets/imgProduct/img.jpg';
import ReviewImage from '../assets/imgProduct/img.jpg';

const ProductDetail = () => {
    // State สำหรับเปลี่ยนรูปภาพหลัก
    const [mainImage, setMainImage] = useState(ProductImage1);

    // State สำหรับเก็บข้อความรีวิวจากฟอร์ม
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([
        {
            reviewer: 'Dexter',
            avatar: ReviewImage,
            text: 'สินค้าคุณภาพดีมาก สุนัขที่บ้านกินแล้วแข็งแรงขึ้น ชอบมาก!',
        },
    ]);

    // ฟังก์ชันจัดการเมื่อส่งรีวิว
    const handleAddReview = () => {
        if (reviewText.trim() === '') return; // ไม่ให้ส่งรีวิวว่างเปล่า

        const newReview = {
            reviewer: 'คุณ',
            avatar: ReviewImage,
            text: reviewText,
        };

        setReviews([...reviews, newReview]); // เพิ่มรีวิวใหม่ใน State
        setReviewText(''); // เคลียร์ช่องกรอก
    };

    return (
        <div className="product-detail-container">
            {/* ส่วนรูปสินค้า */}
            <div className="product-gallery">
                <img src={mainImage} alt="สินค้า" className="main-product-image" />
                <div className="thumbnail-gallery">
                    {/* สลับรูปภาพหลักเมื่อคลิกที่ Thumbnail */}
                    <img
                        src={ProductImage1}
                        alt="ตัวอย่าง 1"
                        className="thumbnail"
                        onClick={() => setMainImage(ProductImage1)}
                    />
                    <img
                        src={ProductImage2}
                        alt="ตัวอย่าง 2"
                        className="thumbnail"
                        onClick={() => setMainImage(ProductImage2)}
                    />
                </div>
            </div>

            {/* ส่วนรายละเอียดสินค้า */}
            <div className="product-info">
                <h1>อาหารลูกสุนัข พันธุ์ใหญ่ ขนดกหนา (MAXI PUPPY)</h1>
                <p className="product-rating">⭐⭐⭐⭐⭐</p>
                <p className="product-description">
                    อาหารเม็ด สำหรับลูกสุนัขพันธุ์ใหญ่ช่วยเสริมสร้างภูมิคุ้มกันและระบบย่อยอาหาร เหมาะสำหรับสุนัขอายุ 1-24 เดือน
                </p>
            </div>

            {/* รีวิวสินค้า */}
            <div className="reviews-section">
                <h2>รีวิวสินค้า</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <img src={review.avatar} alt="ผู้รีวิว" className="reviewer-avatar" />
                        <div>
                            <p className="reviewer-name">{review.reviewer}</p>
                            <p className="review-text">{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ฟอร์มเขียนรีวิว */}
            <div className="review-form">
                <h3>รีวิวสินค้าของคุณ</h3>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="เขียนรีวิวของคุณที่นี่..."
                    rows="4"
                ></textarea>
                <button className="submit-review" onClick={handleAddReview}>
                    ส่งรีวิว
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
