import React from 'react';
import { Link } from 'react-router-dom';
import HomeImg from '../assets/home.jpg'
import Banner from '../components/Banner.js';
import Product from './Products.js';
import Articles from './Articles.js';
// import './Home.css'
import '../styles/global.css'
import royal from '../assets/brand_img/royal.png';
import nekko from '../assets/brand_img/nekko.png';
import buzz from '../assets/brand_img/buzz.png';
import hill from '../assets/brand_img/hill.png';
import jerhigh from '../assets/brand_img/jerhigh.png';
import marvo from '../assets/brand_img/marvo.jpg';
import regalos from '../assets/brand_img/regalos.png';
import monchou from '../assets/brand_img/monchou.png';
import moochie from '../assets/brand_img/moochie.png';
import Chocadoof from '../assets/logo3.png';



const Home = () => {


    const brand = [
        { name: 'Royal', image: royal },
        { name: 'Nekko', image: nekko },
        { name: 'Buzz', image: buzz },
        { name: 'Hill', image: hill },
        { name: 'Jerhigh', image: jerhigh },
        { name: 'Marvo', image: marvo },
        { name: 'Regalos', image: regalos },
        { name: 'Monchou', image: monchou },
        { name: 'Moochie', image: moochie },
        { name: 'Chocadoof', image: Chocadoof },
    ];

    return (
        <div>
            <Banner />


            <div className="container my-5">
                <div className="row ">
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="text-success fw-bold">Chocadoof Petshop</h1>
                        <h2 className="text-danger fw-bold">มีครบ จบที่เดียว !!!</h2>
                        <p className="text-secondary">
                            ร้านจำหน่ายสินค้าเกี่ยวกับสัตว์เลี้ยงที่รวมสินค้าเฉพาะสำหรับสัตว์เลี้ยง
                            ทั้งอาหาร ขนม ของเล่น และผลิตภัณฑ์อื่น ๆ ครบครัน
                            พร้อมบริการแนะนำสินค้าจากผู้เชี่ยวชาญ
                        </p>
                        <Link to="/products" className='custom-btn rounded-3 p-2'>
                            สินค้า
                        </Link>
                    </div>
                    <div className="d-none d-lg-flex col-lg-6 text-center ">
                        <img src={HomeImg} alt="Chocadoof Petshop" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>


            {/* product&article */}
            <hr className='custom-hr'></hr>
            {/* <hr className="w-75 mx-auto border-dark my-4" /> */}
            {/* <TT/> */}
            <Product />
            <Articles />

            <hr className='custom-hr'></hr>
            {/* end product&article */}


            {/* แบรนด์สินค้า */}

            <div className="container my-5 text-center">
                <h1 className="mb-4">แบรนด์สินค้า</h1>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 justify-content-center">

                    {brand.map((item, index) => (
                        <div key={index} className="col">
                            <img
                                src={item.image}
                                alt="brand"
                                className="rounded-circle shadow"
                                style={{ width: "100px", height: "90px", objectFit: "contain" }}
                            />
                        </div>
                    ))}
                </div>

            </div>

            {/*end แบรนด์สินค้า */}


        </div>

    );
};


export default Home;
