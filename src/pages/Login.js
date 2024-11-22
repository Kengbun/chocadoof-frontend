import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";
import logo from "../assets/logo3.png";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState(null);  // สำหรับเก็บ JWT Token

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/login', { email, password });
            setMessage(res.data.message);  // แสดงข้อความเมื่อ Login สำเร็จ
            setToken(res.data.token);      // เก็บ Token ที่ได้รับ
            localStorage.setItem('authToken', res.data.token);  // เก็บ Token ใน localStorage
        } catch (err) {
            setMessage('Error: ' + err.response.data);  // แสดงข้อความเมื่อเกิดข้อผิดพลาด
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-content">
                    <div className="login-logo">
                        <h2>Login</h2>
                        <img src={logo} alt="ChocaDoof Logo" />
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            className="login-input"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
