import React, { useState } from "react";
// // import { forgotPassword } from "../api";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
//     const [email, setEmail] = useState("");

//     const handleForgotPassword = async () => {
//         try {
//             await forgotPassword(email);
//             alert("Password reset link sent to your email.");
//         } catch (error) {
//             alert("Failed to send reset link.");
//         }
//     };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <input type="email" placeholder="Enter your email" onChange />
            <button onClick>Send Reset Link</button>
        </div>
    );
}
export default ForgotPassword;