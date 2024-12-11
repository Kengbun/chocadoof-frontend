import React, { useState } from "react";
import "./Signup.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from '../confix/axios'; 

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('รหัสผ่านไม่ตรงกัน');
            return;
        }

        setLoading(true); // เมื่อกด submit, ให้แสดงสถานะการโหลด
        try {
            const res = await axios.post('/users/register', { name, email, password });
            setMessage(res.data.message || 'การสมัครสมาชิกสำเร็จ'); // ใช้ข้อความที่ตอบกลับจากเซิร์ฟเวอร์หรือข้อความเริ่มต้น
            alert(res.data.message)
            navigate("/login"); 
        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'Server Error');
        } finally {
            setLoading(false); // เมื่อเสร็จสิ้นการเรียก API, รีเซ็ตสถานะการโหลด
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="signup-logo">
                    <h2>Sign up</h2>
                    <img src={logo} alt="ChocaDoof Logo" />
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? "Signing up..." : "Sign up"}
                    </button>
                </form>
                {/* แสดงข้อความความ */}
                {message && <p style={{ color: 'red' }}>{message}</p>}

            </div>
        </div>
        
    );
};

export default Signup;
