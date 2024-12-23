import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const FormReview = (props) => {
    const params = props.params
    const apiUrl = process.env.REACT_APP_API;
    const token = localStorage.getItem('authToken');
    // const params = useParams();

    const [formData, setFormData] = useState({
        review_description: '',
        rating: 0,
        product_id: params.id, // คุณอาจตั้งค่าเริ่มต้นจาก props หรือ context
            
    });

    

    const [loading, setLoading] = useState(false); // สำหรับจัดการสถานะการโหลด

    // ฟังก์ชันแปลงคะแนนเป็นจำนวนดาว
    const getStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < rating ? 'selected' : ''}
                    onClick={() => setFormData({ ...formData, rating: i + 1 })} // อัปเดตคะแนน
                    style={{ cursor: 'pointer', color: i < rating ? '#ffd700' : '#ddd' }}
                />
            );
        }
        return stars;
    };

    // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อความ
    const handleInputChange = (e) => {
        setFormData({ ...formData, review_description: e.target.value });
    };

    // ฟังก์ชันส่งรีวิว
    const submitReview = async () => {
        if (!formData.rating || !formData.review_description) {
            alert('กรุณาให้คะแนนและเขียนรีวิวก่อนส่ง');
            return;
        }

        console.log(formData);

        // setLoading(true);
        // try {
        //     const response = await fetch(`${apiUrl}/reviews`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData),
        //     });

        //     if (response.ok) {
        //         alert('รีวิวของคุณถูกส่งเรียบร้อยแล้ว');
        //         setFormData({
        //             review_description: '',
        //             rating: 0,
        //             product_id: '',
        //             user_id: '',
        //         });
        //     } else {
        //         alert('เกิดข้อผิดพลาดในการส่งรีวิว');
        //     }
        // } catch (error) {
        //     console.error('Error submitting review:', error);
        //     alert('ไม่สามารถส่งรีวิวได้');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div>
            <div className="review-form">
                <div className="rating-input">
                    <p>ให้คะแนน:</p>
                    <div style={{ display: 'flex' }}>
                        {getStars(formData.rating)} {/* แสดงดาวที่เลือก */}
                    </div>
                </div>

                <textarea
                    value={formData.review_description}
                    onChange={handleInputChange}
                    placeholder="เขียนรีวิวของคุณที่นี่..."
                    rows="4"
                ></textarea>

                <button className="submit-review" onClick={submitReview} disabled={loading}>
                    {loading ? 'กำลังส่ง...' : 'ส่งรีวิว'}
                </button>
            </div>
        </div>
    );
};

export default FormReview;