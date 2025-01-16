import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';



const ResetPassword = () => {

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
            navigate("/")

        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'Server Error')
            console.log(message)
        } finally {
            setLoading(false);
        }

    };

    // เปลี่ยนรหัสผ่าน 
    const handleSubmitNewPass = async () => {
        const token = params.token
        console.log(token)
        try {
            const res = await axios.post(`/users/forgot-password/${token}`, {newPass},)
            setMessage(res.data.message)
            console.log(newPass)
            console.log(res)

        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'Server Error')
            console.log(message)
        }
    }

    return (
        <div className='signup-container'>
            <div className='signup-box'>

                {section === 'auth-email' ? (
                    <div>

                        <h2>Reset Password</h2>
                        <p>ป้อนอีเมลเพื่อรีเซ็ตรหัสผ่าน</p>

                        <div className='signup-form'>

                            <input
                                className="signup-input"
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="signup-button" onClick={handleSubmit}>
                                ส่ง
                            </button>
                            {message && (
                                (message === "Server Error" || message === "ไม่พบผู้ใช้งาน")
                                    ? <p style={{ color: 'red' }}>{message}</p>
                                    : <p style={{ color: 'green' }}>{message}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>ตั้งรหัสผ่านใหม่</h2>
                        <div className='signup-form'>

                            <input
                                className="signup-input"
                                type="password"
                                placeholder="New Password"
                                required
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                            <button className="signup-button" onClick={handleSubmitNewPass}>
                                เปลี่ยนรหัสผ่าน
                            </button>
                            {message && (
                                (message === "Server Error" || message === "ไม่พบผู้ใช้งาน")
                                    ? <p style={{ color: 'red' }}>{message}</p>
                                    : <p style={{ color: 'green' }}>{message}</p>
                            )}
                        </div>
                    </div>
                )}




                {/* <div>
                    <input
                        type="text"
                        placeholder="Reset Token"
                    //   value={token}
                    //   onChange={(e) => setToken(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                    //   value={password}
                    //   onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <button onClick={handleReset}>Reset Password</button> }

                </div> */}

            </div>

        </div >
    )
}

export default ResetPassword