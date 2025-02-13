import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useNotificationCustom } from '../functions/functions';



const ResetPassword = () => {
    const { showNotification } = useNotificationCustom();
     
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState();
    const [section, setSection] = useState();
    const [loading, setLoading] = useState(false);

    const [newPass, setNewPass] = useState('');

    const navigate = useNavigate();

    const params = useParams();

    // console.log(params.token)

    useEffect(() => {

        if (!params.token) {
            setSection('auth-email');
        } else {

            setSection('reset-password');
        }
    }, [params.token]);

    // ตรวจสอบเมล
    const handleSubmit = async () => {
        // console.log(email)
        // setSection('repass')
        setLoading(true);

        try {
            const res = await axios.post('/users/forgot-password', { email })
            // console.log("res=" ,res.data )
            setMessage(res.data ? res.data.message : 'ตรวจสอบอีเมลเพื่อรีเซ็ตรหัสผ่าน')
            showNotification("success", "สำเร็จ", res.data.message);

            setTimeout(() => {
                navigate("/")

            }, 2000); // หน่วงเวลา 2 วินาที หรือ 2000 มิลลิวินาที

        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'Server Error')
            showNotification("error", "เกิดข้อผิดพลาด", err.response.data.message);
        } finally {
            setLoading(false);
        }

    };


    // เปลี่ยนรหัสผ่าน 
    const handleSubmitNewPass = async () => {
        const token = params.token
        console.log(token)
        try {
            setLoading(true);
            const res = await axios.post(`/users/forgot-password/${token}`, { newPass },)
            setMessage(res.data.message)
            showNotification("success", "สำเร็จ", res.data.message);
            setTimeout(() => {
                navigate("/")

            }, 2000); // หน่วงเวลา 2 วินาที หรือ 2000 มิลลิวินาที
            

        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'เกิดข้อผิดพลาด')
            showNotification("error", "เกิดข้อผิดพลาด", err.response.data.message);
            navigate("/")
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        // <div className='signup-container'>
        //     <div className='signup-box'>

        //         {section === 'auth-email' ? (
        //             <div>

        //                 <h2>Reset Password</h2>
        //                 <p>ป้อนอีเมลเพื่อรีเซ็ตรหัสผ่าน</p>

        //                 <div className='signup-form'>

        //                     <input
        //                         className="signup-input"
        //                         type="email"
        //                         placeholder="Email"
        //                         required
        //                         value={email}
        //                         onChange={(e) => setEmail(e.target.value)}
        //                     />
        //                     <button className="signup-button" onClick={handleSubmit}>
        //                         ส่ง
        //                     </button>
        //                     {message && (
        //                         (message === "Server Error" || message === "ไม่พบผู้ใช้งาน")
        //                             ? <p style={{ color: 'red' }}>{message}</p>
        //                             : <p style={{ color: 'green' }}>{message}</p>
        //                     )}
        //                 </div>
        //             </div>
        //         ) : (
        //             <div>
        //                 <h2>ตั้งรหัสผ่านใหม่</h2>
        //                 <div className='signup-form'>

        //                     <input
        //                         className="signup-input"
        //                         type="password"
        //                         placeholder="New Password"
        //                         required
        //                         value={newPass}
        //                         onChange={(e) => setNewPass(e.target.value)}
        //                     />
        //                     <button className="signup-button" onClick={handleSubmitNewPass}>
        //                         เปลี่ยนรหัสผ่าน
        //                     </button>
        //                     {message && (
        //                         (message === "Server Error" || message === "ไม่พบผู้ใช้งาน")
        //                             ? <p style={{ color: 'red' }}>{message}</p>
        //                             : <p style={{ color: 'green' }}>{message}</p>
        //                     )}
        //                 </div>
        //             </div>
        //         )}




        //         {/* <div>
        //             <input
        //                 type="text"
        //                 placeholder="Reset Token"
        //             //   value={token}
        //             //   onChange={(e) => setToken(e.target.value)}
        //             />
        //             <input
        //                 type="password"
        //                 placeholder="New Password"
        //             //   value={password}
        //             //   onChange={(e) => setPassword(e.target.value)}
        //             />
        //             {/* <button onClick={handleReset}>Reset Password</button> }

        //         </div> */}

        //     </div>

        // </div >

        <div className=" d-flex justify-content-center align-items-center vh-100 bg-custom-gradient">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <div className="card-body text-center">
                    {/* เช็คว่าต้องแสดงฟอร์มไหน */}
                    {section === 'auth-email' ? (
                        <>
                            <h2 className="fw-bold">Reset Password</h2>
                            <p className="text-muted">ป้อนอีเมลเพื่อรีเซ็ตรหัสผ่าน</p>

                            {/* ฟอร์มใส่อีเมล */}
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

                                <button type="submit" className="custom-btn w-100 rounded-pill">
                                    ส่ง
                                </button>
                            </form>

                            {/* แสดงข้อความแจ้งเตือน
                            {message && (
                                <p className={`mt-3 ${message === "Server Error" || message === "ไม่พบผู้ใช้งาน" ? "text-danger" : "text-success"}`}>
                                    {message}
                                </p>
                            )} */}
                        </>
                    ) : (
                        <>
                            <h2 className="fw-bold">ตั้งรหัสผ่านใหม่</h2>

                            {/* ฟอร์มตั้งรหัสผ่านใหม่ */}
                            <form onSubmit={handleSubmitNewPass}>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="custom-btn w-100 rounded-pill">
                                    ส่ง
                                </button>
                            </form>

                            {/* แสดงข้อความแจ้งเตือน */}
                            {/* {message && (
                                <p className={`mt-3 ${message === "Server Error" || message === "ไม่พบผู้ใช้งาน" ? "text-danger" : "text-success"}`}>
                                    {message}
                                </p>
                            )} */}
                        </>
                    )}
                </div>
            </div>
        </div>

    )
}

export default ResetPassword