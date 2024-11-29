import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate(); // เรียกใช้ useNavigate ในฟังก์ชัน Register
    const [name, setName] = useState("");   // ชื่อผู้ใช้
    const [email, setEmail] = useState(""); // อีเมล
    const [password, setPassword] = useState(""); // รหัสผ่าน
    const [confirmPassword, setConfirmPassword] = useState(""); // รหัสผ่านยืนยัน
    const [loading, setLoading] = useState(false); // สำหรับแสดงสถานะการโหลด
    const [error, setError] = useState(""); // เก็บข้อความ error


    // ฟังก์ชันสำหรับส่งข้อมูลไปยัง API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name && email && password && confirmPassword) {
            if (password !== confirmPassword) {
                setError("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
                return;
            }

            setLoading(true); // ตั้งค่าให้กำลังโหลด
            setError(""); // รีเซ็ตข้อความ error

            try {
                const response = await axios.post("/users/register", {
                    name,
                    email,
                    password,
                });

                // ถ้าสมัครสมาชิกสำเร็จ
                alert(`คุณ ${name} ได้สมัครสมาชิกเรียบร้อยแล้ว`);

                // เก็บข้อมูลที่ตอบกลับจากเซิร์ฟเวอร์
                // สมมติว่าเซิร์ฟเวอร์ส่งข้อมูลของผู้ใช้ที่ลงทะเบียนมา
                console.log(response.data);

                // ถ้าข้อมูลถูกส่งสำเร็จ
                alert(response.data.message); // ใช้ response ที่เซิร์ฟเวอร์ตอบกลับ
                navigate("/login"); // ไปที่หน้า login
            } catch (error) {
                // ถ้ามีข้อผิดพลาดเกิดขึ้น
                console.log(error.response.data.message); // ตรวจสอบ error ที่ได้รับจาก API
                setError(error.response.data.message);
            } finally {
                setLoading(false); // รีเซ็ตสถานะการโหลด
            }
        } else {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
    };

    return (
        <div className="App">
            <h1>ลงทะเบียนผู้ใช้</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ชื่อผู้ใช้:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="กรุณากรอกชื่อ"
                    />
                </div>
                <div>
                    <label>อีเมล:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="กรุณากรอกอีเมล"
                    />
                </div>
                <div>
                    <label>รหัสผ่าน:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="กรุณากรอกรหัสผ่าน"
                    />
                </div>
                <div>
                    <label>ยืนยันรหัสผ่าน:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default App;
