import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast , {Toaster} from "react-hot-toast";


const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/forgot-password", {
        email,
        newPassword,
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
                        <h1>MedixPrep</h1>
                        <p>Streamlined solution for managing invoices, products, and customers all in one place.</p>
                    </div>

                    {/* Right Side */}
                    <div className="rightSide">
                        <form className="formContainer" onSubmit={handleSubmit}>
                            <h4>Reset Password</h4>
                            <div className="InputFieldContainer">
                                <label>Email</label>
                                <input type="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="femail"
                                        required className="InputField" placeholder="emma@gmail.com" name="email" />
                            </div>
                            <div className="InputFieldContainer">
                                    <label>Code</label>
                                    <input type="text" value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        id="fquestion"
                                        required className="InputField" placeholder="xxxxxxxx" name="petName" />
                                </div>
                                <div className="InputFieldContainer">
                                    <label>New Password</label>
                                    <input type="password" value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        id="[fpassword]"
                                        required className="InputField" placeholder="xxxxxxxx" name="password" />
                                </div>
                            
                            {/* <p className="linkSentence"></p> */}
                            <button type="submit" className="btn">Reset Password</button>
                            {/* <p className="linkSentence">Don't Have an Account? <Link to="/sign-up" >Sign Up</Link> | <Link to="/forgot-password" >Forgot Password</Link></p> */}
                        </form>
                    </div>
                </div>
            </div>

    </div>
    </div>
  )
}

export default ForgotPassword
