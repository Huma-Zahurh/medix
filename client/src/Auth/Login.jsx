import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {

    const [auth, setAuth] = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
                email,
                password,
            });

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                if (res.data.user.role === 1) {
                    navigate("/admin/dashboard");
                } 
                else if (res.data.user.role === 0) {
                    navigate("/student/dashboard");
                }   else {
                    navigate("/");
                }
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <Toaster />
            <div className='PageContentCenter'>

                <div className="container">
                    <div className="signUpContainer">
                        {/* Left Side */}
                        <div className="leftSide">
                            <h1>MedixPrep</h1>
                            <p>Streamlined solution for managing invoices, products, and customers all in one place.</p>
                        </div>

                        {/* Right Side */}
                        <div className="rightSide">
                            <form className="formContainer" onSubmit={handleSubmit}>
                                <h4>Login</h4>
                                <div className="InputFieldContainer">
                                    <label>Email</label>
                                    <input type="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        required className="InputField" placeholder="emma@gmail.com" name="email" />
                                </div>
                                <div className="InputFieldContainer">
                                    <label>Password</label>
                                    <input type="password" value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="[password]"
                                        required className="InputField" placeholder="xxxxxxxx" name="password" />
                                </div>

                                {/* <p className="linkSentence"></p> */}
                                <button type="submit" className="btn">Login</button>
                                <p className="linkSentence">Don't Have an Account? <Link to="/register" >Register</Link> | <Link to="/forgot-password" >Forgot Password</Link></p>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
