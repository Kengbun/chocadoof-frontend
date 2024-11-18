import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Banner.css';
import PromoImage1 from '../assets/banner_img/b4.jpg'; 
import PromoImage2 from '../assets/banner_img/b5.jpg';
import PromoImage3 from '../assets/banner_img/b6.jpg';

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    return (
        <section className="banner-carousel">
            <Slider {...settings}>
                <div>
                    <img src={PromoImage1} alt="โปรโมชั่น 1" className="carousel-image" />
                </div>
                <div>
                    <img src={PromoImage2} alt="โปรโมชั่น 2" className="carousel-image" />
                </div>
                <div>
                    <img src={PromoImage3} alt="โปรโมชั่น 3" className="carousel-image" />
                </div>
            </Slider>
        </section>
    );
};

export default Banner;
