import React from 'react';
import Logo from '../assets/logo.png';
import HomeImg from '../assets/home.jpg'
import BannerCarousel from '../components/Banner.js';
import './Home.css'
import '../components/BrandCard/brand.css'
import ProductPeview from '../components/ProductPeview.js';
import ArticlePerciew from '../components/ArticlePerciew.js';
import BrandGrid from "../components/BrandCard/BrandGrid.js";

const Home = () => {
    return (
        <div>
            <BannerCarousel />


            <div className="homepage-container">

                <div className="homepage-text">
                    <h1>Chocadoof Petshop</h1>
                    <h2>มีครบ จบที่เดียว !!!</h2>
                    <p>
                        ร้านจำหน่ายสินค้าเกี่ยวกับสัตว์เลี้ยงที่รวมสินค้าเฉพาะสำหรับสัตว์เลี้ยง
                        ทั้งอาหาร ขนม ของเล่น และผลิตภัณฑ์อื่น ๆ ครบครัน
                        พร้อมบริการแนะนำสินค้าจากผู้เชี่ยวชาญ
                    </p>
                    <button className="shop-button">สินค้า</button>
                </div>


                <div className="homepage-image">
                    <img
                        src={HomeImg}
                        alt="Chocadoof Petshop"
                    />
                </div>


            </div>

            <hr width="80%" align="center" size="2px" noshade color="black"></hr>
            <ProductPeview />
            <ArticlePerciew />
            <hr width="80%" align="center" size="2px" noshade color="black"></hr>

            <div class="container">
                <h1>แบรนด์สินค้า</h1>
                <div class="grid">
                    
                        <img src="https://picsum.photos/500/500" alt="Royal Canin"/>
                            
                    
                    
                        <img src="https://picsum.photos/500/500" alt="Nekko"/>
    
                    
                    
                        <img src="https://picsum.photos/500/500" alt="Buzz"/>

                    
                    
                        <img src="https://picsum.photos/500/500" alt="JerHigh"/>
            
                    
                    
                        <img src="assets/marvo.png" alt="Marvo"/>
    
                    
                    
                        <img src="assets/regalo.png" alt="Regalo"/>
        
                    
                    
                        <img src="assets/monchou.png" alt="Monchou"/>
            
                    
                    
                        <img src="assets/moochie.png" alt="Moochie"/>
            
                    
                    
                        <img src="assets/ciao.png" alt="Ciao"/>

                    
                </div>
            </div>



        </div>

    );
};

export default Home;
