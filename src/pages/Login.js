import React, { useState } from "react";
import axios from '../confix/axios';
import logo from "../assets/logo3.png";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useNotificationCustom } from '../functions/functions'

// 1) Import GoogleLogin จาก @react-oauth/google
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotificationCustom();
    const navigate = useNavigate();

    // ฟังก์ชัน submit สำหรับ login ด้วย email/password
    const handleSubmit = async (e) => {
        e.preventDefault(); //ป้องกันการโหลดหน้าเว็บซ้ำ
        setLoading(true);

        try {
            const res = await axios.post('/users/login', { email, password });
            showNotification("success", "เข้าสู่ระบบสำเร็จ", res.data.message);

            if (res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.response?.data?.message || 'เกิดข้อผิดพลาด';
            setMessage(errorMessage);
            // console.log(err.response.data.message);
            showNotification("error", "เกิดข้อผิดพลาด", errorMessage);
        } finally {
            setLoading(false);
        }
    };


    // ฟังก์ชันจัดการ Google Login (onSuccess)
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        // credentialResponse.credential คือ Token ที่ได้จาก Google
        const tokenId = credentialResponse.credential;
        setLoading(true);

        try {
            // เรียก API ฝั่ง Backend เพื่อส่ง token ให้ตรวจสอบ
            const res = await axios.post('/users/google-login', {
                token: tokenId
            });

            console.log(res.data);

            showNotification("success", "เข้าสู่ระบบสำเร็จ", res.data.message);
            // showNotification("success", "สำเร็จ", '');

            if (res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000); //ตั้งเวลา 1 วินาที (1000 มิลลิวินาที)
            }
        } catch (err) {
            const errorMessage = err.response ? err.response.data.message : 'เกิดข้อผิดพลาด';
            setMessage(errorMessage);
            showNotification("error", "เกิดข้อผิดพลาด", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // ฟังก์ชันจัดการกรณี Google Login ล้มเหลว
    const handleGoogleLoginFailure = () => {
        showNotification("error", "เกิดข้อผิดพลาด", "Google Login Failed");
    };

    return (
        <div className=" d-flex justify-content-center align-items-center vh-100 bg-custom-gradient">
            {loading ? (
                <Loading />
            ) : (
                <div className="card shadow-lg rounded p-4" style={{ width: "400px" }}>
                    <div className="card-body text-center">
                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <h2 className="fw-bold">Login</h2>
                            <img
                                src={logo}
                                alt="ChocaDoof Logo"
                                className="img-fluid mb-3"
                                style={{ maxWidth: "100px" }}
                            />
                        </div>

                        {/* ฟอร์มล็อกอินด้วย Email/Password */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="custom-btn w-100 rounded-pill">
                                Login
                            </button>
                        </form>

                        <div className="text-center mt-3 d-flex flex-column " >

                            {/* ปุ่ม Google Login */}
                            <div className="mt-3">
                                <GoogleLogin
                                    onSuccess={handleGoogleLoginSuccess}
                                    onError={handleGoogleLoginFailure}
                                />
                            </div>
                            <Link className=" text-black mt-3 " to="/reset-password">
                                Reset Password
                            </Link>
                        </div>


                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
