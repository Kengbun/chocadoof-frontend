import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { notification } from 'antd';  // ใช้ notification ของ antd สำหรับแจ้งเตือน

import {useNotificationCustom }from '../functions/functions'

const ResetPassword = () => {
    // const navigate = useNavigate();
    // const [email, setEmail] = useState(""); // เก็บอีเมลจากผู้ใช้
    // const [newPass, setNewPass] = useState(""); // เก็บรหัสผ่านใหม่
    const { showNotification } = useNotificationCustom();

    // ฟังก์ชันสำหรับการแจ้งเตือน
    // const showNotification = (type, message, description) => {
    //     notification[type]({
    //         message: message,
    //         description: description,
    //     });
    // };

    // ฟังก์ชันการส่งอีเมลสำหรับรีเซ็ตรหัสผ่าน
    const handleSubmit = async (e) => {
        e.preventDefault();  // ป้องกันการ reload หน้า

        try {
            // ส่งคำขอไปยัง API สำหรับการรีเซ็ตรหัสผ่าน (สมมุติว่าเป็น POST /reset-password)
            // const response = await axios.post('/reset-password', { email });

            // ถ้าสำเร็จ
            showNotification("success", "สำเร็จ", "โปรดตรวจสอบอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน");
            // if (response.status === 200) {
            // } else {
            //     showNotification("error", "เกิดข้อผิดพลาด", "ไม่สามารถส่งคำขอได้ในขณะนี้");
            // }
            showNotification("error", "เกิดข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
        } catch (err) {
            console.error("Error during reset password:", "ff");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-custom-gradient">
            
                        <button onClick={handleSubmit} type="submit" className="custom-btn w-100 rounded-pill">
                            ส่ง
                        </button>
                    
        </div>
    );
}

export default ResetPassword;
