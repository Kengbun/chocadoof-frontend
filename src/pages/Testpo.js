import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API;

const FormEditArticle = () => {

    const params = useParams(); //URL params
    const [data, setData] = useState();

    console.log(params.id)

    useEffect(() => {
        loadData(1) //โหลดข้อมูลจาก id
    }, []);

    const loadData = (id) => {
        axios.get(apiUrl + "/article/" + 1)
            .then((res) => {
                console.log(res);  
                setData(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

     

    console.log(data);

   

    return (
        <div className="form-container">
            <p>{params.id}</p>
        </div>
    );
}

export default FormEditArticle
