import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API
// const token = localStorage.getItem('authToken');
// เพิ่ม interceptor สำหรับการตอบสนอง (response)
axios.interceptors.response.use(
    
    response => {
        // หากคำตอบสำเร็จ คืนค่าคำตอบนั้นไป
        return response;
    },
    err => {
        // ตรวจสอบว่า status ของข้อผิดพลาดคือ 401 หรือไม่ (Unauthorized)
        if (err.response?.status === 401 || err.response?.status === 403) {
            // const navigate = useNavigate();
            // หาก 401, ให้ลบ token จาก localStorage
            localStorage.removeItem('authToken'); // ลบ token
            // window.location.href = "/";
            
            // Navigate("/login");  // เปลี่ยนไปที่หน้า Login
            // โหลดหน้าใหม่เพื่อเข้าสู่ระบบอีกครั้ง
            // window.location.reload();
            // แสดงข้อความเตือนให้ผู้ใช้เข้าสู่ระบบใหม่
            // notification.error({
            //     message: "กรุณาเข้าสู่ระบบใหม่"
            // });
            // ปฏิเสธ Promise และส่งต่อข้อผิดพลาด
            return Promise.reject(err);
        }
        // หากเป็นข้อผิดพลาดอื่น ๆ, ปฏิเสธ Promise
        return Promise.reject(err);
    }
);

export default axios;