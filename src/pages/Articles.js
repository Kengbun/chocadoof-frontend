import React, { useState } from 'react';
import img from '../components/cat.jpg';
import img2 from '../components/cat2.jpg';
import img3 from '../assets/Articledetail.jpg';
import Footer from '../components/Footer';
import Article from '../components/Article'
import './Articles.css'; 
// import st from './Articles.modul.css'

const Articles = () => {
    // สถานะสำหรับจัดการจำนวนบทความ
    const [visible, setVisibleArticles] = useState(5);

    // ฟังก์ชันสำหรับโหลดบทความเพิ่มเติม
    const loadMoreArticles = () => {
        setVisibleArticles((prev) => prev + 5); // เพิ่ม 6 ชิ้นต่อการกดครั้งหนึ่ง
    };

    const articles = [
        {
            id: 1,
            title: 'ทำไมแมวชอบ...',
            content: 'ทำไมแมวชอบขนมอะไรแปลก ๆ มหาศาล',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 10, 2022',
        },
        {
            id: 2,
            title: 'ทำไมสุนัขถึงชอบ...',
            content: 'มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 15, 2022',
        },
        {
            id: 2,
            title: 'ทำไมสุนัขถึงชอบ...',
            content: 'มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 15, 2022',
        },
        {
            id: 2,
            title: 'ทำไมสุนัขถึงชอบ...',
            content: 'มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 15, 2022',
        },
        {
            id: 2,
            title: 'ทำไมสุนัขถึงชอบ...',
            content: 'มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 15, 2022',
        },
        {
            id: 2,
            title: 'ทำไมสุนัขถึงชอบ...',
            content: 'มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 15, 2022',
        },
        {
            id: 2,
            title: 'ทำไมสุนัขถึงชอบ...',
            content: 'มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 15, 2022',
        },
        {
            id: 2,
            title: 'ทำไมสุนัขถึงชอบ...',
            content: 'มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 15, 2022',
        },
        {
            id: 2,
            title: 'ทำไมสุนัขถึงชอบ...',
            content: 'มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ',
            image: img,
            author: 'Dasteen',
            author_image: img2,
            date: 'Jan 15, 2022',
        },
        // เพิ่มข้อมูลบทความเพิ่มเติมตามต้องการ
    ];

    return (
        <div>
            {/* ส่วนแสดงบทความเด่น */}
            <div className="article-highlight">
                <div className="article-image">
                    <img src={img3} alt="บทความ" />
                </div>
                <div className="article-overlay">
                    <h3>ทำไมแมวชอบคาบอะไรแปลก ๆ มาฝากทาส</h3>
                </div>
            </div>
            {/* <Article className='{st.list}'/> */}
            รายการบทความ
            <div className="list-grid">
                {articles.slice(0, visible).map((article) => (
                    <div className="article-card" key={article.id}>
                        <img src={article.image} alt={article.title} />
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <div className="profile">
                            <div className="author-profile">
                                <img src={article.author_image} alt={article.author} />
                            </div>
                            <div className="author-profile-name">
                                <span>{article.author}</span>
                                <span>{article.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ปุ่มโหลดเพิ่ม */}
            {visible < articles.length && (
                <div className="load-more">
                    <button onClick={loadMoreArticles}>โหลดเพิ่ม</button>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Articles;
