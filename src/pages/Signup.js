import React, { useState } from "react";
// import "./Signup.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from '../confix/axios';
import Loading from "../components/Loading";
import { useNotificationCustom } from '../functions/functions'

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotificationCustom();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('รหัสผ่านไม่ตรงกัน');
            showNotification("error", "เกิดข้อผิดพลาด", "รหัสผ่านไม่ตรงกัน");
            return;
        }

        setLoading(true); // เมื่อกด submit, ให้แสดงสถานะการโหลด
        try {
            const res = await axios.post('/users/register', { name, email, password });
            setMessage(res.data.message || 'การสมัครสมาชิกสำเร็จ'); // ใช้ข้อความที่ตอบกลับจากเซิร์ฟเวอร์หรือข้อความเริ่มต้น
            // alert(res.data.message)
            showNotification("success", "สำเร็จ", res.data.message);
            navigate("/login");
        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'เกิดข้อผิดพลาด');
            showNotification("error", "เกิดข้อผิดพลาด", err.response.data.message);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className=" d-flex justify-content-center align-items-center vh-100 bg-custom-gradient">
            {loading ? (
                <Loading />
            ) : (
                <div className="card shadow-lg rounded  p-4" style={{ width: "400px" }}>
                    <div className="card-body text-center">
                        {/* โลโก้และหัวข้อ */}
                            <div className="d-flex justify-content-center align-items-center gap-3">
                            <h2 className="fw-bold">Sign Up</h2>
                            <img src={logo} alt="ChocaDoof Logo" className="img-fluid mb-3" style={{ maxWidth: "100px" }} />
                        </div>

                        {/* ฟอร์มสมัครสมาชิก */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="custom-btn rounded-pill w-100" disabled={loading}>
                                {loading ? "Signing up..." : "Sign up"}
                            </button>
                        </form>

                        {/* แสดงข้อความแจ้งเตือน */}
                        {/* {message && <p className="text-danger mt-3">{message}</p>} */}
                    </div>
                </div>
            )}
        </div>


    );
};

export default Signup;
