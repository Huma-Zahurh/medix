import { useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useContext(AuthContext);

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/auth/user-auth");
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    toast.error("Unauthorized access. Please log in.");
                }
            } catch (error) {
                setOk(false);
                toast.error("Authentication failed. Please try again.");
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}
