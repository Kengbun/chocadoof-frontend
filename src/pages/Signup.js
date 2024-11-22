import React from "react";
import { useState } from 'react';
import "./Signup.css";
import logo from "../assets/logo.png";

import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/signup', { email, password, confirmPassword });
            setMessage(res.data);
        } catch (err) {
            setMessage('Error: ' + err.response.data);
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
                    <button type="submit" className="signup-button">
                        Sign up
                    </button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Signup;
