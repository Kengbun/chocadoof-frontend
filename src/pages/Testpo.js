import React, { useState } from "react";
import img from '../assets/imgProduct/img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Testpo = () => {
    const user = [
        {
            id: 1,
            name: "kk",
            image: img
        },
        {
            id: 2,
            name: "keng za",
            image: 'https://picsum.photos/200/300'
        },
    ];

    const productDetial = [
        {
            id: 1,
            name: 'royal',
            discription: 'Simply dummy text of the printing and typesetting industry.',
            image: "https://picsum.photos/200/300",
            image2: "https://picsum.photos/id/237/200/300",
            image3: "https://picsum.photos/200/300",
        },
    ];

    const productReview = [
        {
            id: 1,
            product_id: 1,
            user_id: 1,
            rating: 2,
            text: 'สินค้าคุณภาพดีมาก สุนัขที่บ้านกินแล้วแข็งแรงขึ้น ชอบมาก!'
        },
        {
            id: 2,
            product_id: 1,
            user_id: 2,
            rating: 5,
            text: 'สินค้าคุณภาพดีมาก สุนัขที่บ้านกินแล้วแข็งแรงขึ้น ชอบมาก!'
        },
    ];

    // จัดการรูปสินค้า
    const [mainImage, setMainImage] = useState(productDetial[0].image);
    // สถานะเก็บรีวิว
    const [reviews, setReviews] = useState(productReview);
    // เก็บข้อความรีวิว
    const [reviewText, setReviewText] = useState('');
    // เก็บคะแนนที่เลือก
    const [rating, setRating] = useState(0);

    // ฟังก์ชันคำนวณคะแนนเฉลี่ย
    const calculateAverageRating = () => {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
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
                />
            );
        }
        return stars;
    };

    // ฟังก์ชันจัดการเมื่อส่งรีวิว
    const handleAddReview = () => {
        if (reviewText.trim() === '' || rating === 0) {
            alert('กรุณาใส่ข้อความรีวิวและให้คะแนนก่อนส่ง!');
            return;
        }

        // เพิ่มรีวิวใหม่ลงใน array
        const newReview = {
            id: reviews.length + 1, // เพิ่ม id ใหม่
            product_id: productDetial[0].id,
            user_id: 1, // สมมติว่าเป็นผู้ใช้คนแรก
            rating,
            text: reviewText
        };

        setReviews([...reviews, newReview]);
        setReviewText('');
        setRating(0);
    };

    return (
        <div className="product-detail-container">
            {/* ส่วนแสดงภาพสินค้า */}
            <div className="product-gallery">
                <img src={mainImage} alt="สินค้า" className="main-product-image" />
                <div className="thumbnail-gallery">
                    <img
                        src={productDetial[0].image}
                        alt="ตัวอย่าง 1"
                        className="thumbnail"
                        onClick={() => setMainImage(productDetial[0].image)}
                    />
                    <img
                        src={productDetial[0].image2}
                        alt="ตัวอย่าง 2"
                        className="thumbnail"
                        onClick={() => setMainImage(productDetial[0].image2)}
                    />
                    <img
                        src={productDetial[0].image3}
                        alt="ตัวอย่าง 3"
                        className="thumbnail"
                        onClick={() => setMainImage(productDetial[0].image3)}
                    />
                </div>
            </div>

            {/* ส่วนรายละเอียดสินค้า */}
            <div className="product-info">
                <h1>{productDetial[0].name}</h1>
                <p className="product-rating">
                    {/* เพิ่มดาวตามคะแนนเฉลี่ย */}
                    {getStars(Math.round(calculateAverageRating()))}
                </p>
                <p className="product-description">
                    {productDetial[0].discription}
                </p>
            </div>

            {/* รีวิวสินค้า */}
            <div className="reviews-section">
                <h2>รีวิวสินค้า</h2>
                {reviews.map((review, index) => {
                    // หาข้อมูลผู้รีวิวจาก user
                    const reviewer = user.find(u => u.id === review.user_id);
                    return (
                        <div key={index} className="review-item">
                            <img src={reviewer ? reviewer.image : ''} alt="ผู้รีวิว" className="reviewer-avatar" />
                            <div>
                                <p className="reviewer-name">{reviewer ? reviewer.name : 'Unknown'}</p>
                                <p className="review-rating">{getStars(review.rating)}</p>
                                <p className="review-text">{review.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ฟอร์มเขียนรีวิว */}
            <div className="review-form">
                <h3>รีวิวสินค้าของคุณ</h3>
                <div className="rating-input">
                    <p>ให้คะแนน:</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${rating >= star ? 'selected' : ''}`} // เปลี่ยนสีของดาวตามค่าที่เลือก
                            onClick={() => setRating(star)} // เมื่อคลิกจะตั้งค่าคะแนน
                            onMouseEnter={() => setRating(star)} // แสดงดาวจนถึงตำแหน่งที่เลื่อนเมาส์
                            onMouseLeave={() => setRating(rating)} // ไม่ให้รีเซ็ตดาวเมื่อเมาส์ออกจากดาว
                        >
                            <FontAwesomeIcon icon="fas fa-star" />
                        </span>
                    ))}

                </div>

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

export default Testpo;
