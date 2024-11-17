import React from "react";
import "./Card.css";
import img from './cat.jpg'
import img2 from './cat2.jpg'

const ArticlePerciew = () => {
    const articles = [
        {
            id: 1,
            title: "ทำไมแมวชอบ...",
            content: "ทำไมแมวชอบขนมอะไรแปลก ๆ มหาศาล",
            image: img,
            author: "Dasteen",
            author_image: img2,
            date: "Jan 10, 2022",

        },
        {
            id: 2,
            title: "ทำไมสุนัขถึงชอบ...",
            content: "มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ",
            image: img,
            author: "Dasteen",
            author_image: img2,
            date: "Jan 15, 2022",

        },
        {
            id: 2,
            title: "ทำไมสุนัขถึงชอบ...",
            content: "มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ",
            image: img,
            author: "Dasteen",
            author_image: img2,
            date: "Jan 15, 2022",

        },
        {
            id: 2,
            title: "ทำไมสุนัขถึงชอบ...",
            content: "มองหาคำตอบของนิสัยสุนัขที่น่าสนใจ",
            image: img,
            author: "Dasteen",
            author_image: img2,
            date: "Jan 15, 2022",

        },

        // เพิ่มข้อมูลบทความเพิ่มเติมตามต้องการ
    ];

    return (
        <section className="section">
            <div className="section-header">
                <h2>บทความ</h2>
                <a href="#" className="see-more">ดูทั้งหมด &gt;</a>
            </div>
            <div className="list">
                {articles.map((article) => (
                    <div className="article-card" key={article.id}>
                        <img src={article.image} alt={article.title} />
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <div className="profile">
                            <div className="author-profile">
                                <img src={article.author_image}></img>
                            </div>
                            <div className="author-profile-name">
                                <span>{article.author}</span>
                                <span>{article.date}</span>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ArticlePerciew;
