import React, { useEffect, useState } from 'react';
import './ArticleDetail.css';
import Footer from '../components/Footer';
import img from '../components/cat.jpg';
import ArticleImage from '../assets/Articledetail.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ArticleDetail = () => {
    const params = useParams();
    const apiUrl = process.env.REACT_APP_API;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // console.log(params.id);
    // console.log(apiUrl);

    useEffect(() => {
        loadData();
    }, [params.id]);

    const loadData = async () => {
        try {
            const response = await axios.get(apiUrl + "/article/" + params.id);
            console.log(response.data);
            setData(response.data);
        } catch (err) {
            console.log(err)
            setLoading(true);
        } finally {
            setLoading(false);
        }
    }
    if (loading) return <p>กำลังโหลดข้อมูล...</p>;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            day: '2-digit', // วันที่ 2 หลัก
            month: 'short', // เดือนแบบย่อ (เช่น ธ.ค.)
            year: 'numeric' // ปี พ.ศ.
        });
    };

    return (
        // <div>
        //     </div>
        <div>
            <div className="article-container">
                <h1 className="article-title">
                    {data.title}
                </h1>

                <div className="author-details">
                    <div className="author-profile">
                        <img src={data.author.profile_picture} alt="img" />
                    </div>
                    <p className="author-name">{data.author.name}</p>
                    <p className="publish-date">{formatDate(data.createdAt)}</p>
                </div>
                <img src={data.contentImage} alt="Cat playing" className="article-image" />
                <div className="article-content">
                    {data.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}

                    {/* <p>{data.content}</p> */}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ArticleDetail;
