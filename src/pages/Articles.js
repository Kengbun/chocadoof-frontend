import React, { useEffect, useState } from 'react';
import img3 from '../assets/Articledetail.jpg';
import './Articles.css';
import axios from 'axios';
// import axios from '../confix/axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import st from './Articles.modul.css'

const Articles = () => {
    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get( "/article")
            // setArticles(response.data);
            console.log(response.data);

            const update = response.data.map((article) => {
                return{
                    ...article,
                    author: {
                        ...article.author,
                        profile_picture: article?.author?.profile_picture || "https://picsum.photos/200/300",
                    }
                }
            })
            setArticles(update);
            console.log(articles)
            
        } catch (err) {
            console.log(err)
        }
    }
    // สถานะสำหรับจัดการจำนวนบทความ
    const [visible, setVisibleArticles] = useState(5);

    // ฟังก์ชันสำหรับโหลดบทความเพิ่มเติม
    const loadMoreArticles = () => {
        setVisibleArticles((prev) => prev + 10); // เพิ่ม 5 ชิ้นต่อการกดครั้งหนึ่ง
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            day: '2-digit', // วันที่ 2 หลัก
            month: 'short', // เดือนแบบย่อ (เช่น ธ.ค.)
            year: 'numeric' // ปี พ.ศ.
        });
    };

    const handleViewArticle = (articleId) => {
        navigate(`/articledetail/${articleId}`); // นำทางไปยังหน้าแสดงรายละเอียดสินค้า
    };

    const location = useLocation();

    return (
        <div>

            {location.pathname === '/' ? (
                <div>
                    <div className="section-header">
                        <h2>บทความ</h2>
                        <a href="/articles" className="see-more">ดูทั้งหมด &gt;</a>
                    </div>
                    <div className="list-grid">
                        {articles.slice(0, visible).map((article) => (
                            <div style={{ cursor: 'pointer' }}
                                onClick={() => handleViewArticle(article.id)}
                                className="article-card" key={article.id}>
                                <img src={article.coverImage || "https://picsum.photos/200/300"} alt={article.title || "https://picsum.photos/200/300"} />
                                <h3>{article.title}</h3>
                                <p className='cut-text'>{article.content}</p>
                                <div className="profile">
                                    <div className="author-profile">
                                        <img src={article?.author?.profile_picture} alt={article?.author?.profile_picture} />
                                    </div>
                                    <div className="author-profile-name">
                                        <span>{article?.author?.name}</span>
                                        <span>{formatDate(article.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (

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

                    <div className="list-grid">
                        {articles.slice(0, visible).map((article) => (
                            <div style={{ cursor: 'pointer' }}
                                onClick={() => handleViewArticle(article.id)}
                                className="article-card" key={article.id}>
                                <img src={article.coverImage} alt={article.title} />
                                <h3>{article.title}</h3>
                                <p className='cut-text'>{article.content}</p>
                                <div className="profile">
                                    <div className="author-profile">
                                        <img src={article.author.profile_picture} alt={article.author.profile_picture} />
                                    </div>
                                    <div className="author-profile-name">
                                        <span>{article.author.name}</span>
                                        <span>{formatDate(article.createdAt)}</span>
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

                </div>

            )
            }

        </div>



    );
};

export default Articles;
