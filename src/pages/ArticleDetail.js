import React, { useEffect, useState } from 'react';
// import './ArticleDetail.css';
// import axios from 'axios';
import axios from '../confix/axios';
import { useParams } from 'react-router-dom';
import Loading from "../components/Loading";
import { formatDate } from '../functions/functions';


const ArticleDetail = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // console.log(params.id);

    useEffect(() => {
        loadData();
    }, [params.id]);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/article/" + params.id);
            console.log(response.data);
            setData(response.data);
        } catch (err) {
            setData(null);
            console.log(err)
        } finally {
            setLoading(false);
        }
        // console.log('kkkkkkk' +data);
    }
    if (loading) return <Loading />;
    if (!data) return <Loading />;


    return (
        
        <div className="container my-5">
            <div className="card shadow p-5 ">
                
                <h1 className="card-title text-center">{data.title}</h1>

                <div className="d-flex align-items-center gap-3 my-3">
                    <img
                        className="img-fluid rounded-circle shadow"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        src={data.author.profile_picture || "https://picsum.photos/200/300"}
                        alt="Author"
                    />
                    <div>
                        <p className="fw-bold mb-0 text-nowrap">{data.author.name}</p>
                        <p className="text-muted small mb-0">{formatDate(data.createdAt)}</p>
                    </div>
                </div>

                {data.contentImage && (
                    <img src={data.contentImage} alt="Content Image" className="img-fluid rounded  my-3" />
                )}

                <div className="article-content">
                    {data.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="text-break">{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ArticleDetail;
