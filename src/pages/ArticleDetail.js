import React from 'react';
import './ArticleDetail.css';
import Footer from '../components/Footer';
import img from '../components/cat.jpg';
import ArticleImage from '../assets/Articledetail.jpg'; 


const ArticleDetail = () => {
       
    return (
        <div>
            <div className="article-container">
                <h1 className="article-title">
                    The Impact of Technology on the Workplace: How Technology is Changing
                </h1>
                
                <div className="author-details">
                    <div className="author-profile">
                        <img src={img} alt="" />
                    </div>
                    <p className="author-name">Tracey Wilson</p>
                    <p className="publish-date">August 30, 2023</p>
                </div>
                <img src={ArticleImage} alt="Cat playing" className="article-image" />
                <div className="article-content">
                    <p>
                        เทคโนโลยีเปลี่ยนแปลงการทำงานในสำนักงานและสถานประกอบการต่าง ๆ อย่างมากในช่วงไม่กี่ปีที่ผ่านมา
                        คุณค่าของความสะดวกสบาย และประสิทธิภาพกลายเป็นสิ่งสำคัญ...
                    </p>
                    <p>
                        คุณเคยคิดหรือไม่ว่าอนาคตของการทำงานจะเป็นอย่างไร? โลกเปลี่ยนไปในหลายมิติ และเราคาดหวังอะไรได้บ้างในยุคดิจิทัล?
                    </p>
                    <p>
                        การปรับตัวและพัฒนาอย่างต่อเนื่องในสายงานของคุณสามารถช่วยเพิ่มโอกาสในการเติบโต...
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ArticleDetail;
