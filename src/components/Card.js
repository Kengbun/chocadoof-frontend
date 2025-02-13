import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

/**
 * Card Component
 *  image - URL ของรูปภาพสินค้า
 *  title - ชื่อสินค้า
 *  rating - คะแนนเฉลี่ยสินค้า (0-5 สมมติเป็นตัวเลขเต็มๆ หรือทศนิยมได้)
 * productId - ไอดีหรือรหัสสินค้าที่ต้องการส่งต่อ
 *  onClick - ฟังก์ชันที่จะเรียกเมื่อกดปุ่ม 'ดูสินค้า'
 * style - Inline style เพิ่มเติม (ถ้าต้องการ)
 * section - ส่วนของเว็บไซต์ที่ใช้ Card (product, article, ...)
 *  content - เนื้อหาของบทความ
 *  avatar - URL รูปภาพโปรไฟล์
 * name - ชื่อผู้เขียนบทความ
 *  date - วันที่เขียนบทความ
 */
function Card({ image, title, rating, productId, onClick, style, section, content, avatar, name, date }) {
    // if (isNaN(rating)) {
    //     console.log("not number")
    // }

    // ฟังก์ชันสร้างชุดดาว (Stars) จากคะแนน rating
    const getStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    // เงื่อนไขเลือกสีดาว: ถ้า i < rating ให้เป็นสีทอง มิฉะนั้นเป็นสีเทาอ่อน
                    className={i < rating ? 'selected' : ''}
                    style={{ color: i < rating ? '#ffd700' : '#ddd' }}
                />
            );
        }
        return stars;
    };
    const location = useLocation();

    // Debug ค่าที่ส่งเข้ามา
    // console.log(rating);
    // console.log("kkkkk" , getStars(rating));

    return (
        <div className="card shadow mb-3 rounded  custom-transform"
            style={{
                width: '18 rem',
                // maxWidth: '250px',
                ...style
            }}
        >
            {/* แสดงรูปภาพถ้ามี image */}
            {image && (
                <div className='p-2'>
                    <img
                        src={image}
                        className="card-img-top rounded "
                        alt={title || 'Product Image'}
                        style={{
                            height: 'auto',
                            objectFit: 'contain',
                            maxHeight: ' 150px'
                        }}
                    />
                </div>
            )}

            {/* ส่วน body ของการ์ด */}
            <div className="card-body justify-content-center">
                {/* ชื่อสินค้า */}
                {title && (
                    <h5 className="card-title text-truncate">
                        {title}
                    </h5>
                )}

                {section === 'product' && (
                    <>
                        <p>
                            {getStars(Number(rating))}
                        </p>
                        {/* ปุ่ม 'ดูสินค้า' */}
                        <button
                            className='custom-btn rounded-4'
                            onClick={() => onClick && onClick(productId)}
                        >
                            ดูสินค้า
                        </button>
                    </>
                )}

                {section === 'article' && (
                    <>
                        <p className='card-text text-multiline-truncate'> {content}</p>
                        <div className='d-flex justify-content-start align-items-center gap-1'>

                            <img src={avatar} class="rounded-circle shadow-4"
                                style={{
                                    height: '30px',
                                    width: '30px',
                                    objectFit: 'fill',
                                    // maxHeight: '20px'
                                }}
                                alt="Avatar" />
                            <p className='m-0 p-0 fw-medium '>{name}</p>
                            <p className='m-0 p-0 small text-muted'>{date}</p>
                        </div>
                    </>
                )}




            </div>
        </div>
    );
}

export default Card;
