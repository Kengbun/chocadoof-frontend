import React from 'react';
import { Link } from 'react-router-dom';
import HomeImg from '../assets/home.jpg'
import Banner from '../components/Banner.js';
import Product from '../components/Product.js';
import Article from '../components/Article.js';
import './Home.css'
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
import Footer from '../components/Footer.js';

const Home = () => {
    return (
        <div>
            <Banner />


            <div className="homepage-container">
                <div className="homepage-text">
                    <h1>Chocadoof Petshop</h1>
                    <h2>มีครบ จบที่เดียว !!!</h2>
                    <p>
                        ร้านจำหน่ายสินค้าเกี่ยวกับสัตว์เลี้ยงที่รวมสินค้าเฉพาะสำหรับสัตว์เลี้ยง
                        ทั้งอาหาร ขนม ของเล่น และผลิตภัณฑ์อื่น ๆ ครบครัน
                        พร้อมบริการแนะนำสินค้าจากผู้เชี่ยวชาญ
                    </p>
                    <Link to="/products">
                        <button className="shop-button" >สินค้า</button>
                    </Link>
                </div>
                <div className="homepage-image">
                    <img src={HomeImg} alt="Chocadoof Petshop" />
                </div>
            </div>


            {/* product&article */}
            <hr width="85%" align="center" size="2px" noshade color="black"></hr>
            <Product />
            <Article />
            <hr width="85%" align="center" size="2px" noshade color="black"></hr>
            {/* end product&article */}


            {/* แบรนด์สินค้า */}
            <div class="brand-container">
                <h1>แบรนด์สินค้า</h1>
                <div class="grid">
                    <img src={royal} alt="brand" />
                    <img src={nekko} alt="brand" />
                    <img src={buzz} alt="brand" />
                    <img src={hill} alt="brand" />
                    <img src={jerhigh} alt="brand" />
                    <img src={marvo} alt="brand" />
                    <img src={regalos} alt="brand" />
                    <img src={monchou} alt="brand" />
                    <img src={moochie} alt="brand" />
                    <img src={Chocadoof} alt="brand" />
                </div>
            </div>
            {/*end แบรนด์สินค้า */}

            <Footer />
        </div>

    );
};


export default Home;
