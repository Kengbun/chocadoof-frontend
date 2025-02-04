import React, { useEffect, useState } from 'react';
import img3 from '../assets/Articledetail.jpg';
import axios from 'axios';
// import axios from '../confix/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Loading from "../components/Loading";
import { useLoadMore, formatDate } from '../functions/functions';
// import st from './Articles.modul.css'
import { motion } from 'framer-motion';
import { fadeInUp } from '../functions/animation.js';

const Articles = () => {
    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/article")
            // setArticles(response.data);
            console.log(response.data);

            const update = response.data.map((article) => {
                return {
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
        } finally {
            setLoading(false);
        }
    }
    const { visible, loadMore } = useLoadMore(4, 4);



    const handleViewArticle = (articleId) => {
        navigate(`/articledetail/${articleId}`); // นำทางไปยังหน้าแสดงรายละเอียดสินค้า
    };

    const location = useLocation();

    return (

        <div>
            {loading ? <Loading />
                :
                (

                    <div className={location.pathname === '/' ? ('container') : ('')}>

                        {location.pathname === '/' ? (
                            <div className='d-flex justify-content-between my-3'>
                                <h2>บทความ</h2>
                                <Link to="/products" >ดูทั้งหมด &gt;</Link>
                            </div>
                        ) : (
                            <div>
                                <div className="position-relative overflow-hidden"
                                    style={{ width: '100%', height: '300px' }}>
                                    <img className="img-fluid w-100 h-100 object-fit-cover" src={img3} alt="img" />
                                    <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-50 text-white text-center py-2">
                                        <h5 className="fs-3 fw-bold">ทำไมแมวชอบคาบอะไรแปลก ๆ มาฝากทาส</h5>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={location.pathname === '/' ? ('container') : ('container mt-5')}>
                            <div className={`row row-cols-auto row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 ${location.pathname === '/' ? 'justify-content-center' : ''}`}>

                                {articles.slice(0, visible).map((article, index) => (
                                    <motion.div
                                        {...fadeInUp(index * 0.1)}

                                        key={article.id} className='col m-0'
                                        onClick={() => handleViewArticle(article.id)}
                                        style={{
                                            cursor: 'pointer',
                                            width: '220px',
                                        }}
                                    >

                                        <Card
                                            image={article.coverImage}
                                            title={article.title}
                                            section='article'
                                            content={article.content}
                                            avatar={article.author.profile_picture}
                                            name={article.author.name}
                                            date={formatDate(article.createdAt)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {(visible < articles.length && location.pathname !== '/') && (
                            <div className='d-flex justify-content-center mb-4'>
                                <button className='custom-btn rounded' onClick={loadMore}>เพิ่มเติม</button>
                            </div>
                        )}

                    </div>
                )}
        </div>




    );
};

export default Articles;
