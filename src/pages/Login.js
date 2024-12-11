import React, { useState } from "react";
import axios from '../confix/axios';
import "./Login.css";
import logo from "../assets/logo3.png";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ส่งคำขอ login ไปยัง backend
            const res = await axios.post('/users/login', { email, password });

            // setMessage('เข้าสู่ระบบสำเร็จ');
            // console.log(res.data.message);

            // เก็บ token และ redirect
            if (res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                window.location.href = "/";
            }
        } catch (err) {
            // จัดการข้อผิดพลาด
            const errorMessage = err.response ? err.response.data.message : 'Server Error';
            setMessage(errorMessage);
            // console.error(errorMessage);
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
                    {/* แสดงข้อความ */}
                    {message && <p style={{ color: 'red' }}>{message}</p>}
                    {/* {message && (
                        <p className={`login-message ${message.includes('Error') ? 'error' : 'success'}`}>
                            {message}
                        </p>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Login;
