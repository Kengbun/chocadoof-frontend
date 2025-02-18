import React, { useState } from "react";
import axios from "axios";

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleAsk = async () => {
        if (!question) return;

        try {
            const response = await axios.post("/ask", { message: question });
            setAnswer(response.data.response);
            alert('kk')
        } catch (error) {
            console.error(error);
            setAnswer("เกิดข้อผิดพลาดในการดึงข้อมูล");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>ถามคำถามเกี่ยวกับ AI</h2>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="พิมพ์คำถามของคุณ..."
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button onClick={handleAsk} style={{ padding: "10px 20px", cursor: "pointer" }}>
                ถาม
            </button>
            {answer && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
                    <strong>คำตอบ:</strong>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}

export default App;
