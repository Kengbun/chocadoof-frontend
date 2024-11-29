import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const { token } = useParams(); // ดึง token จาก URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // ฟังก์ชันเพื่อยืนยันอีเมลเมื่อโหลดหน้า
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // ส่งคำขอไปที่เซิร์ฟเวอร์เพื่อยืนยันอีเมล
                const response = await fetch(`http://localhost:8000/verify-email/${token}`);

                if (!response.ok) {
                    throw new Error('การยืนยันอีเมลล้มเหลว');
                }

                const data = await response.json();
                setSuccess(data.message);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                {loading && <p className="text-lg text-gray-500">กำลังยืนยันอีเมล...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                {!loading && !error && !success && (
                    <p className="text-gray-500">หากคุณไม่ได้ขอรับการยืนยันนี้ โปรดละเว้นอีเมลนี้</p>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
