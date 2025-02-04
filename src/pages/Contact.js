import React, { useState } from 'react';
import baranch_img from "../assets/branches_img/branch.jpg";
// import "./Contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import img from '../assets/aboutus.jpg';
import { useLoadMore } from '../functions/functions';


const Contact = () => {
    const branches = [
        { id: 1, name: 'สาขา1', description: 'รายละเอียดสาขา1', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 2, name: 'สาขา 2', description: 'รายละเอียดสาขา 2', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 3, name: 'สาขา 3', description: 'รายละเอียดสาขา 3', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 4, name: 'สาขา 4', description: 'รายละเอียดสาขา 4', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 5, name: 'สาขา 5', description: 'รายละเอียดสาขา 5', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 6, name: 'สาขา 6', description: 'รายละเอียดสาขา 6', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 6, name: 'สาขา 6', description: 'รายละเอียดสาขา 6', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 6, name: 'สาขา 6', description: 'รายละเอียดสาขา 6', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
    ];

    const {visible, loadMore} = useLoadMore(3, 3);

    return (
        <div>
            {/* Section รูปภาพ */}
            <div className="position-relative overflow-hidden">
                <img className='img-fluid w-100 h-80 object-fit-cover'
                    style={{
                        height: '400px',
                    }}
                    src={img} alt="รูป" />
                <div className="position-absolute bottom-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center text-white text-center">
                    <h5 className="fs-1 fw-bold"> ติดต่อเรา</h5>
                </div>
            </div>

            {/* Section รายชื่อสาขา */}
            <div className="container text-center">
                <h1 className="my-4">สาขา</h1>
                <div className="row g-4">
                    {branches.slice(0, visible).map((branch) => (
                        <div key={branch.id} className="col-md-4">
                            <div className="card shadow  custom-transform">
                                <img src={branch.image} className="card-img-top" alt={branch.name} />
                                <div className="card-body text-start">
                                    <h5 className="card-title ">{branch.name}</h5>
                                    <p className="card-text">{branch.description}</p>
                                    <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                                        <button className="rounded custom-btn ">Map</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ปุ่มเพิ่มเติม */}
                {visible < branches.length && (
                    <div className="text-center mt-3">
                        <button className="custom-btn rounded" onClick={loadMore}>
                            เพิ่มเติม
                        </button>
                    </div>
                )}
            </div>

            {/* เส้นแบ่ง */}
            <hr className="w-85 mx-auto border-dark my-4" />

            {/* Section ไอคอนโซเชียลมีเดีย */}
            <div className="text-center d-flex justify-content-center gap-4">
                <a className="text-decoration-none text-dark" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="2x" color="#3b5998" />
                    <p className="mt-2">Facebook</p>
                </a>
                <a className="text-decoration-none text-dark" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" color="#C13584" />
                    <p className="mt-2">Instagram</p>
                </a>
                <a className="text-decoration-none text-dark" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTiktok} size="2x" color="#000000" />
                    <p className="mt-2">Tiktok</p>
                </a>
                <a className="text-decoration-none text-dark" href="tel:+1234567890">
                    <FontAwesomeIcon icon={faPhone} size="2x" color="#25D366" />
                    <p className="mt-2">012-345-6789</p>
                </a>
            </div>
        </div>

    );
};


export default Contact;