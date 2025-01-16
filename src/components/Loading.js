import React from "react";
import "../components/loading.css"; // ไฟล์ CSS สำหรับ Animation
import img from "../assets/logo3_resized.png"

const Loading = () => {
    return (
        <div className="loading-container">
            <img src={img} alt="Loading..." className="loading-logo" />
        </div>
    );
};

export default Loading;
