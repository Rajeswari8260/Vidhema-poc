import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // const handleLogin = async () => {
    //     try {
    //         const response = await login(email, password);
    //         localStorage.setItem("token", response.data.access);  // Store token
    //         alert("Login successful!");
    //         navigate("/dashboard");  // Redirect to user dashboard
    //     } catch (error) {
    //         console.error("Signup error:", error.response?.data || error.message);
    //         alert("Login failed. Please check your credentials.");
    //     }
    // };
     
    const handleLogin = async () => { 
        try {
            const response = await login(email, password);  // Call login API
            console.log("API Response:", response);
    
            if (response.data && response.data.access) {  // Check if token exists
                localStorage.setItem("token", response.data.access);  // Store token
                alert("Login successful!");
                navigate("/userpage");  // Redirect user
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.error || "Login failed. Please check your credentials.");
        }
    };
    




    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p onClick={() => navigate("/forgotpassword")} className="signup-link">ForgotPassword</p>
            <p onClick={() => navigate("/signup")} className="signup-link">Don't have an account? Sign Up</p>
        </div>
    );
}

export default Login;
