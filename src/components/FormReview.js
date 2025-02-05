import React, { useState } from 'react';
import axios from '../confix/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNotificationCustom } from '../functions/functions'


const FormReview = ({ params, reviewSubmitted }) => {
    // const params = props.params
    const token = localStorage.getItem('authToken');
    const { showNotification } = useNotificationCustom();
    // const params = useParams();

    const [formData, setFormData] = useState({
        review_description: '',
        rating: 0,
        // product_id: params.params.id, // คุณอาจตั้งค่าเริ่มต้นจาก props หรือ context

    });
    console.log(params.id);
    // console.log(reviewSubmitted);



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
        setFormData({ ...formData, review_description: e.target.value, product_id: params.id, });
    };

    // ฟังก์ชันส่งรีวิว
    const submitReview = async () => {
        // console.log(formData.product_id);
        if (!formData.rating || !formData.review_description) {
            // alert('กรุณาให้คะแนนและเขียนรีวิวก่อนส่ง');
            showNotification("warning", "เกิดข้อผิดพลาด", "กรุณาให้คะแนนและเขียนรีวิวก่อนส่ง");
            return;
        }

        console.log(formData);

        setLoading(true);
        try {
            const response = await axios.post(`/review`, formData, {
                headers: {
                    'authtoken': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(formData),
            });

            if (response.request.status === 201) {
                // alert('รีวิวของคุณถูกส่งเรียบร้อยแล้ว');
                showNotification("success", "สำเร็จ", "รีวิวของคุณถูกส่งเรียบร้อยแล้ว");
                setFormData({
                    review_description: '',
                    rating: 0,
                    product_id: '',
                    // user_id: '',
                });
                reviewSubmitted();
            } else {
                // alert('เกิดข้อผิดพลาดในการส่งรีวิว');
                showNotification("error", "เกิดข้อผิดพลาด", "เกิดข้อผิดพลาดในการส่งรีวิว");
            }
            console.log(response);
        } catch (err) {
            // console.err('err submitting review:', err);
            showNotification("error", "เกิดข้อผิดพลาด", "ไม่สามารถส่งรีวิวได้");
            // alert('ไม่สามารถส่งรีวิวได้');
            // console.log("err= " + err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="">
                <div className="d-flex">
                    <p>ให้คะแนน:</p>
                    <div 
                        // style={{ display: 'flex' }}
                    >
                        {getStars(formData.rating)} {/* แสดงดาวที่เลือก */}
                    </div>
                </div>

                <textarea
                    className='form-control'
                    value={formData.review_description}
                    onChange={handleInputChange}
                    maxLength={350}
                    placeholder="เขียนรีวิวของคุณที่นี่..."
                    rows="4"
                ></textarea>

                <button className="custom-btn rounded mt-3" onClick={submitReview} disabled={loading}>
                    {loading ? 'กำลังส่ง...' : 'ส่งรีวิว'}
                </button>
            </div>
        </div>
    );
};

export default FormReview;
