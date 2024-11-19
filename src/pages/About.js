import React from 'react';
import HomeImg from '../assets/home.jpg';
import img3 from '../assets/Articledetail.jpg';

const About = () => {
    return (
        <div>
            <div className="about-highlight">
                <div className="about-image">
                    <img src={img3} alt="รูป" />
                </div>
            </div>

            <div className="about-container">
                <div className="about-text">
                    <h1>Chocadoof Petshop</h1>
                    <p>
                        ร้านจำหน่ายสินค้าเกี่ยวกับสัตว์เลี้ยงที่รวมสินค้าเฉพาะสำหรับสัตว์เลี้ยง
                        ทั้งอาหาร ขนม ของเล่น และผลิตภัณฑ์อื่น ๆ ครบครัน
                        พร้อมบริการแนะนำสินค้าจากผู้เชี่ยวชาญ
                    </p>
                    
                </div>
                <div className="homepage-image">
                    <img src={HomeImg} alt="Chocadoof Petshop" />
                </div>
            </div>

        </div>
    );
};

export default About;
