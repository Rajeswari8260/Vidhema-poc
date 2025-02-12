import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api";
import { useNavigate } from "react-router-dom";

function UsersPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must log in first!");
                navigate("/login");
                return;
            }
            try {
                const response = await getUserDetails(token);
                setUser(response.data);
            } catch (error) {
                alert("Session expired, please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    return (
        <div className="user-container">
            <h2>Welcome, {user?.username}</h2>
            <p>Email: {user?.email}</p>
            <p>Phone: {user?.phone_number}</p>
            <p>Address: {user?.address}</p>
            <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
                Logout
            </button>
        </div>
    );
}

export default UsersPage;