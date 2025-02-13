import { useState } from "react";
import { notification } from 'antd';


// ฟังก์ชันสำหรับโหลดเพิ่มเติม
export const useLoadMore = (initialCount, increment) => {
    const [visible, setVisible] = useState(initialCount);

    const loadMore = () => {
        setVisible((prev) => prev + increment);
    };

    return { visible, loadMore };
};

// ฟังก์ชันสำหรับแปลงเป็นวันที่
export const formatDate = (dateString) => {
    if (!dateString) return "-"; // ถ้าไม่มีค่าจะคืน "-"

    const date = new Date(dateString);

    // ตรวจสอบว่าเป็นวันเวลาที่ถูกต้องหรือไม่
    if (isNaN(date.getTime())) return "Invalid Date";

    // ดึงค่าปี ค.ศ. แล้วแปลงเป็น พ.ศ. (สองหลัก)
    const buddhistYear = date.getFullYear() + 543;
    const shortYear = buddhistYear.toString().slice(-2); // เอาเฉพาะ 2 หลักสุดท้าย

    // แปลงเป็นวันที่ เดือนย่อ ภาษาไทย
    const formattedDate = new Intl.DateTimeFormat("th-TH", {
        day: "numeric",
        month: "short", // เดือนแบบย่อ เช่น "ม.ค."
    }).format(date);

    return `${formattedDate} ${shortYear}`;
};





// ฟังก์ชันสำหรับแสดงการแจ้งเตือน
export const useNotificationCustom = () => {
    const showNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    return { showNotification };
};





