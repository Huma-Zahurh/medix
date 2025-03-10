import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Phone, setPhone] = useState("");
    const [occupation, setOccupation] = useState("");
    const [city, setCity] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/v1/auth/register", {
                name,
                email,
                password,
                Phone,
                city,
                occupation,
                question,
            });

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
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
                            <h1>Medix Prep Point</h1>
                            <p>Streamlined solution for managing invoices, products, and customers all in one place.</p>
                        </div>

                        {/* Right Side */}
                        <div className="rightSide">
                            <form className="formContainer" onSubmit={handleSubmit}>
                                <h4>Register</h4>
                                <div className="formFieldsContainer">
                                    <div className="InputFieldContainer">
                                        <label>Full Name</label>
                                        <input type="text" value={name}
                                            onChange={(e) => setName(e.target.value)} id="namefield" required className="InputField" placeholder="Emma John" name="fullName" />
                                    </div>
                                    <div className="InputFieldContainer">
                                        <label>Phone Number</label>
                                        <input type="text" value={Phone}
                                            onChange={(e) => setPhone(e.target.value)} id="phoneField" required className="InputField" placeholder="+92 xxxxxxxxx" name="phoneNumber" />
                                    </div>
                                </div>
                                <div className="formFieldsContainer">
                                    <div className="InputFieldContainer">
                                        <label>Email</label>
                                        <input type="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)} id="EmailFeild" required className="InputField" placeholder="emma@gmail.com" name="email" />
                                    </div>
                                    <div className="InputFieldContainer">
                                        <label>City</label>
                                        <input type="text" value={city}
                                            onChange={(e) => setCity(e.target.value)} id="cityField" required className="InputField" placeholder="Lahore" name="city" />
                                    </div>
                                </div>
                                <div className="formFieldsContainer">
                                    <div className="InputFieldContainer">
                                        <label>Father Occupation</label>
                                        <input type="text" value={occupation}
                                            onChange={(e) => setOccupation(e.target.value)} id="OccupationField" required className="InputField" placeholder="xxxxxxxx" name="occupation" />
                                    </div>
                                    <div className="InputFieldContainer">
                                        <label>Password</label>
                                        <input type="password" value={password}
                                            onChange={(e) => setPassword(e.target.value)} id="passwordField" required className="InputField" placeholder="xxxxxxxx" name="password" />
                                    </div>
                                </div>
                                <div className="formFieldsContainer">
                                    <div className="InputFieldContainer">
                                        <label>Security Code , Name or anything</label>
                                        <input type="text" value={question}
                                            onChange={(e) => setQuestion(e.target.value)} id="questionField" required className="InputField" placeholder="xxxxxxxx" name="occupation" />
                                    </div>
                                </div>

                                <button type="submit" className="btn">Sign Up</button>
                                <p className="linkSentence">Already Have an Account? <Link to="/" >Login</Link></p>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register
