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
                    <h1>ความเป็นมาของเรา</h1>
                    <p>
                        นาฏยศาลามุมมองรีพอร์ทคีตกวีไคลแมกซ์ซิมโฟนี่คอลัมน์คอนเซปตยอมรับบอร์ไทยแลนด์โปรโมทฮปคาร์เตี๊ยมชมปิยองแอคทีฟนิรันดร์ซาตานริคเตอร์คอนเซ็ปต์เห็นด้วยเอ็นเตอร์เทนฉลุยปัจฉิมนิเทศปสเตอร์ราชานุญาตคอนโทรลซิตีเอาท์ดอร์กุมภาพันธ์เอาต์แพตเทิร์นโฮปโมจิเพียบแปรสามช่าแคร์กรุ๊ปมินต์เฟิร์ม
                        <br/>
                        <br/>พันธกิจ (Mission) และวิสัยทัศน์ (Vision): อธิบายถึงจุดมุ่งหมายของร้านในการให้บริการที่ดีที่สุดแก่สัตว์เลี้ยงและเจ้าของ 
                        <br/>
                        <br/>
                        จุดเด่นของร้าน: สิ่งที่ทำให้ Chocadoof Pet Shop แตกต่าง เช่น การคัดสรรอาหารสัตว์ที่มีคุณภาพบริการส่งที่รวดเร็วหรือทีมงานที่มีความเชี่ยวชาญด้านการดูแลสัตว์เลี้ยงความมุ่งมั่นในคุณภาพสินค้า:ให้ลูกค้าทราบถึงการเลือกสินค้าและมาตรฐานที่ใช้ในการคัดเลือกอาหารสัตว์


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
