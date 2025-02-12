import React, { useEffect, useState } from "react";
// import { getUserDetails, logout } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/UserPage.css";

function UserPage() {
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const token = localStorage.getItem("token");
    //             if (!token) {
    //                 navigate("/login");
    //                 return;
    //             }
    //             const response = await getUserDetails(token);
    //             setUser(response.data);
    //         } catch (error) {
    //             console.error("Error fetching user details", error);
    //             navigate("/login");
    //         }
    //     };
    //     fetchUserData();
    // }, [navigate]);

    // const handleLogout = async () => {
    //     try {
    //         await logout();
    //         localStorage.removeItem("token");
    //         localStorage.removeItem("refreshToken");
    //         navigate("/login");
    //     } catch (error) {
    //         console.error("Logout failed", error);
    //     }
    // };

    return (
        <div className="user-container">
            <h2>User Dashboard</h2>
            
                <div>
                    <p><strong>Name:</strong> </p>
                    <p><strong>Email:</strong> </p>
                    <p><strong>Phone:</strong> </p>
                    <p><strong>Address:</strong></p>
                    <p><strong>Date of Birth:</strong> </p>
                    {/* {user.profile_image && <img src="" alt="Profile" width="100" />} */}
                </div>
            
            
            <button >Logout</button>
        </div>
     );
}

export default UserPage;