import axios from "axios";

// กำหนด baseURL จาก environment variable
axios.defaults.baseURL = process.env.REACT_APP_API;

// เพิ่ม interceptor สำหรับการตอบสนอง (response)
axios.interceptors.response.use(
    (response) => {
        // หากคำตอบสำเร็จ คืนค่าคำตอบนั้นไป
        return response;
    },
    (error) => {
        // ตรวจสอบข้อผิดพลาด
        if (error.response?.message === "Unauthorized: Token not found") {
            window.location.href = "/login"
            return Promise.reject(error);
        } else if (error.response?.status === 403) {
            // ลบ token ออกจาก localStorage และเปลี่ยนเส้นทาง
            localStorage.removeItem('authToken');
            window.location.href = "/";
            return Promise.reject(error);
        }

        // ส่งข้อผิดพลาดที่ไม่ใช่ 403 หรือ "Unauthorized: Token not found" กลับ
        return Promise.reject(error);
    }
);

export default axios;
