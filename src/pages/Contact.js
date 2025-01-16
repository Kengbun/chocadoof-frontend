import React, { useState } from 'react';
import baranch_img from "../assets/branches_img/branch.jpg";
import "./Contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';


const Contact = () => {
    const branches = [
        { id: 1, name: 'สาsdfgsdfgsdfgขฟหกดฟหกดฟหฟหกา 1', description: 'รายละเอียดฟหกดหฟกดหฟกดฟหกดสาขา', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 2, name: 'สาขา 2', description: 'รายละเอียดสาขา 2', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 3, name: 'สาขา 3', description: 'รายละเอียดสาขา 3', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 4, name: 'สาขา 4', description: 'รายละเอียดสาขา 4', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 5, name: 'สาขา 5', description: 'รายละเอียดสาขา 5', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 6, name: 'สาขา 6', description: 'รายละเอียดสาขา 6', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 6, name: 'สาขา 6', description: 'รายละเอียดสาขา 6', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
        { id: 6, name: 'สาขา 6', description: 'รายละเอียดสาขา 6', image: baranch_img, mapUrl: 'https://www.google.com/maps?q=13.7390,100.5363' },
    ];

    const [showAll, setShowAll] = useState(false);

    // จำกัดจำนวนการแสดงผลเมื่อ showAll เป็น false
    const visibleBranches = showAll ? branches : branches.slice(0, 4);

    return (
        <div>

            <div className="about-highlight">
                <div className="about-image">
                    <img src='https://picsum.photos/id/160/1200/500.jpg' alt="รูป" />
                </div>
            </div>

            <div className="branch-list">
                <h1 className='contact-page-title'>สาขา</h1>
                <div className="branches">
                    {visibleBranches.map((branch) => (
                        <div key={branch.id} className="branch-card">
                            <img src={branch.image} alt={branch.name} />
                            <h2>{branch.name}</h2>
                            <p>{branch.description}</p>
                            <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                                <button className='btn-map'>Map</button>
                            </a>
                        </div>
                    ))}
                </div>


                <div className="view-all">
                    <button onClick={() => setShowAll(!showAll)}>
                        {showAll ? 'แสดงน้อยลง' : 'ดูทั้งหมด'}
                    </button>
                </div>
            </div>
            <hr width="85%" align="center" size="2px" noshade color="black"></hr>

            
            <div className='icon'>  
                <a className='icon-container' href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="2x" color="#3b5998" />
                    <p>facebook</p>
                </a>
                <a className='icon-container' href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" color="#C13584" />
                    <p>instagram</p>
                </a>
                <a className='icon-container' href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTiktok} size="2x" color="#000000" />
                    <p>tiktok</p>
                </a>
                <a className='icon-container' href="tel:+1234567890">
                    <FontAwesomeIcon icon={faPhone} size="2x" color="#25D366" />
                    <p>012-345-6789</p>
                </a>
            </div>
        </div>
    );
};


export default Contact;