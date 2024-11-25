import React, { useState } from "react";
import img from '../assets/imgProduct/img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductDetail.css';
import Footer from "../components/Footer";
const ProductDetail = () => {
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

    const productDetail = [
        {
            id: 1,
            name: 'อาหารสุนัข พันธุ์ใหญ่ (MAXI PUPPY)',
            discription: 'สปายตัวเอง กู๋คีตกวีแต๋ว โยโย่ เอฟเฟ็กต์ลิสต์สัมนาฉลุย คอลัมน์อุปการคุณซากุระสันทนาการ แรงผลัก ออเดอร์ติงต๊อง โปรเจ็กเตอร์ฮันนีมูนวีเจลีเมอร์ โบว์โปรเจ็กเตอร์เช็กฟีเวอร์ดีเจ แอ๊บแบ๊ว คอนโดมิเนียมบัลลาสต์คาแร็คเตอร์วินลิมิต บอยคอตต์หมิงป๋าโปรโมท เป็นไงล้มเหลวพุดดิ้งสเตย์มหาอุปราชา วอฟเฟิลวิว คาราโอเกะซามูไรออดิชั่นเคลม ฟรุตกรีนว้าวโกเต็กซ์',
            discription2: "454654545454",
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
    const [mainImage, setMainImage] = useState(productDetail[0].image);
    // สถานะเก็บรีวิว
    const [reviews, setReviews] = useState(productReview);
    // เก็บข้อความรีวิว
    const [reviewText, setReviewText] = useState('');
    // เก็บคะแนนที่เลือก
    const [rating, setRating] = useState(0);
    //จัดการข้อมูลสินค้าและรีวิว
    const [section, setSection] = useState("description");

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
                    onClick={() => setRating(i + 1)} // เมื่อคลิกที่ดาว จะเปลี่ยนคะแนน
                    style={{ cursor: 'pointer', color: i < rating ? '#ffd700' : '#ddd' }}
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
            product_id: productDetail[0].id,
            user_id: 1, // สมมติว่าเป็นผู้ใช้คนแรก
            rating,
            text: reviewText
        };

        setReviews([...reviews, newReview]);
        setReviewText('');
        setRating(0);
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
                                src={productDetail[0].image}
                                alt="ตัวอย่าง 1"
                                className="thumbnail"
                                onClick={() => setMainImage(productDetail[0].image)}
                            />
                            <img
                                src={productDetail[0].image2}
                                alt="ตัวอย่าง 2"
                                className="thumbnail"
                                onClick={() => setMainImage(productDetail[0].image2)}
                            />
                            <img
                                src={productDetail[0].image3}
                                alt="ตัวอย่าง 3"
                                className="thumbnail"
                                onClick={() => setMainImage(productDetail[0].image3)}
                            />
                        </div>
                    </div>

                    {/* ส่วนรายละเอียดสินค้า */}
                    <div className="product-info">
                        <h1>{productDetail[0].name}</h1>
                        <p className="product-rating">
                            {/* เพิ่มดาวตามคะแนนเฉลี่ย */}
                            {getStars(Math.round(calculateAverageRating()))}
                        </p>
                        <p className="product-description">
                            {productDetail[0].discription}
                        </p>
                    </div>
                </div>
                {/*เปลี่ยน Section */}
                <div className="set-section">
                    <h1 onClick={() => setSection("description")}> รายละเอียด</h1>
                    <h1 onClick={() => setSection("review")}>รีวิว</h1>
                </div>
                <hr width="85%" align="center" size="2px" noshade color="black"></hr>

                {/*Section รีวิวสินค้า */}
                {section === "description" ? (
                    <div>
                        <h3>รายละเอียด</h3>
                        <p>{productDetail[0].discription}</p>
                    </div>

                ) :
                    (
                        <div>
                            {/*Section รีวิวสินค้า */}
                            <div className="reviews-section">
                                <h3>รีวิวจากลูกค้า</h3>
                                {reviews.map((review, index) => {
                                    // หาข้อมูลผู้รีวิวจาก user
                                    const reviewer = user.find(u => u.id === review.user_id);
                                    return (
                                        <div key={index} className="review-item">
                                            <img src={reviewer ? reviewer.image : ''} alt="ผู้รีวิว" className="reviewer-avatar" />
                                            <div className="reviewer-avatar-detail">
                                                <p className="reviewer-name">{reviewer ? reviewer.name : 'Unknown'}</p>
                                                <p className="review-rating">{getStars(review.rating)}</p>
                                                <p className="review-text">{review.text}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr width="85%" align="center" size="2px" noshade color="black"></hr>
                            {/* ฟอร์มเขียนรีวิว */}
                            <div className="review-form">
                                <h3>รีวิวสินค้าของคุณ</h3>

                                <div className="rating-input">
                                    <p>ให้คะแนน:</p>
                                    <div style={{ display: 'flex' }}>
                                        {getStars(rating)} {/* แสดงดาวที่เลือก */}
                                    </div>
                                    {/* <p>ให้คะแนน:{rating}</p> */}
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
                    )}
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
