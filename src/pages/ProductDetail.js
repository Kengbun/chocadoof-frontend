import React, { useState } from 'react';
import './ProductDetail.css';
import ProductImage1 from '../assets/imgProduct/img.jpg';
import ProductImage2 from '../assets/imgProduct/img.jpg';
import ReviewImage from '../components/cat2.jpg';

const ProductDetail = () => {
    const [mainImage, setMainImage] = useState(ProductImage1);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0); // เก็บคะแนน Rating ที่เลือก
    const [reviews, setReviews] = useState([
        {
            reviewer: 'Dexter',
            avatar: ReviewImage,
            text: 'สินค้าคุณภาพดีมาก สุนัขที่บ้านกินแล้วแข็งแรงขึ้น ชอบมาก!',
            rating: 5,
        },
    ]);

    // ฟังก์ชันแปลงคะแนนเป็นจำนวนดาว
    const getStars = (rating) => '⭐'.repeat(rating);

    // ฟังก์ชันคำนวณคะแนนเฉลี่ย
    const calculateAverageRating = () => {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
    };

    // ฟังก์ชันจัดการเมื่อส่งรีวิว
    const handleAddReview = () => {
        if (reviewText.trim() === '' || rating === 0) {
            alert('กรุณาใส่ข้อความรีวิวและให้คะแนนก่อนส่ง!');
            return;
        }

        const newReview = {
            reviewer: 'คุณ',
            avatar: ReviewImage,
            text: reviewText,
            rating,
        };

        setReviews([...reviews, newReview]);
        setReviewText('');
        setRating(0);
    };

    return (
        <div className="product-detail-container">
            {/* ส่วนรูปสินค้า */}
            <div className="product-gallery">
                <img src={mainImage} alt="สินค้า" className="main-product-image" />
                <div className="thumbnail-gallery">
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
                <p className="product-rating">
                    {getStars(Math.round(calculateAverageRating()))}
                </p>
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
                            <p className="review-rating">{getStars(review.rating)}</p>
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
                <div className="rating-input">
                    <p>ให้คะแนน:</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${rating >= star ? 'selected' : ''}`} // เปลี่ยนสีของดาวตามค่าที่เลือก
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setRating(star)} // เพิ่มเพื่อแสดงผลขณะเลื่อนเมาส์
                            onMouseLeave={() => setRating(rating)} // คืนค่าที่เลือกกลับเมื่อเมาส์ออก
                        >
                            ⭐
                        </span>
                    ))}
                </div>

                <button className="submit-review" onClick={handleAddReview}>
                    ส่งรีวิว
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
