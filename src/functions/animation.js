// กำหนด Variants สำหรับการแสดงผลของหน้า (Page) ต่างๆ
export const pageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
};

// กำหนดการเปลี่ยนแปลง (transition) สำหรับ pageVariants
export const pageTransition = {
    type: "tween",
    duration: 0.5,
};

// ฟังก์ชันที่ใช้เพื่อสร้างแอนิเมชัน fadeInUp
export const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
});