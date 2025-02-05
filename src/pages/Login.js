import React, { useState } from "react";
import axios from '../confix/axios';
// import "./Login.css";
import logo from "../assets/logo3.png";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useNotificationCustom } from '../functions/functions'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotificationCustom();
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ส่งคำขอ login ไปยัง backend
            // console.log(email, password);
            const res = await axios.post('/users/login', { email, password });


            // setMessage('เข้าสู่ระบบสำเร็จ');
            // console.log(res.data.message);
            showNotification("success", "สำเร็จ", res.data.message);

            // เก็บ token และ redirect
            if (res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                setTimeout(() => {
                    // navigate("/")
                    
                    window.location.href = "/";
                }, 1000);
            }
        } catch (err) {
            // จัดการข้อผิดพลาด
            const errorMessage = err.response ? err.response.data.message : 'เกิดข้อผิดพลาด';
            setMessage(errorMessage);
            showNotification("error", "เกิดข้อผิดพลาด", errorMessage);
            // console.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" d-flex justify-content-center align-items-center vh-100 bg-custom-gradient">
            {loading ? (
                <Loading />
            ) : (
                <div className="card shadow-lg rounded p-4" style={{ width: "400px" }}>
                    <div className="card-body text-center">
                        {/* โลโก้และหัวข้อ */}
                        <div className="d-flex justify-content-center align-items-center gap-3">

                            <h2 className="fw-bold">Login</h2>
                            <img src={logo} alt="ChocaDoof Logo" className="img-fluid mb-3" style={{ maxWidth: "100px" }} />
                        </div>

                        {/* ฟอร์มล็อกอิน */}
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
                        <Link className=" text-black mt-3" to="/reset-password">
                            Reset Password
                        </Link>

                        {/* แสดงข้อความแจ้งเตือน */}
                        {/* {message && <p className="text-danger mt-3">{message}</p>} */}
                    </div>
                </div>
            )}
        </div>

    );
};

export default Login;
