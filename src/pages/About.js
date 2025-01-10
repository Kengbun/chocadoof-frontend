import React from 'react';
import HomeImg from '../assets/home.jpg';
import img3 from '../assets/Articledetail.jpg';
import gallery1 from '../assets/gallery/img1.jpg';
import gallery2 from '../assets/gallery/img2.jpg';
import gallery3 from '../assets/gallery/img3.jpg';
import './About.css';

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
            <div className="stats">
                <div className="stat-item">
                    <h2>12</h2>
                    <p>ประสบการณ์ทำงาน</p>
                </div>
                <div className="stat-item">
                    <h2>25</h2>
                    <p>สาขาให้บริการ</p>
                </div>
                <div className="stat-item">
                    <h2>100+</h2>
                    <p>แบรนด์สินค้า</p>
                </div>
                <div className="stat-item">
                    <h2>1000+</h2>
                    <p>ลูกค้าที่ใช้บริการ</p>
                </div>
            </div>
            <div className="gallery">
                <h2>บรรยากาศภายในร้าน</h2>
                <div className="gallery-images">
                    <img src={gallery1} alt="รป" />
                    <img src={gallery2} alt="รูป" />
                    <img src={gallery3} alt="รูป" />
                </div>
            </div>
        </div>
    );
};

export default About;
