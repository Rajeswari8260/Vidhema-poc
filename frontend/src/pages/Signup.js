import React, { useState } from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";
import '../styles/Signup.css';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await signup({ username, email, password, phone_number: phone, address });
            alert("Signup successful! Please log in.");
            navigate("/");
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            alert("Signup failed: " + (error.response?.data?.error || "Check console for details."));
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
            <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default Signup;
