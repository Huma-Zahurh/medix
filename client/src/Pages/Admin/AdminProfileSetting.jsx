// import React, { useState } from 'react'
// import Layout from '../../Components/Layout'
// import { AuthContext } from "../../Context/AuthContext";
// import { useContext } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// const AdminProfileSetting = () => {

//     const [name, setName] = useState("");
//     const useAuth = () => useContext(AuthContext);
//     const [auth, setAuth] = useAuth();

//     return (
//         <Layout title={"Profile Settings"}>
//             <div className='contentArea'>
//                 <h3 className='bwFormHeadings'>Profile Settings</h3><br></br>

//                 <div className='CustomerDetailsFormContainer'>

//                     <form>
//                         <div className='sameCustomerDetailsFormContainer'>
//                             <div className='FormFieldContainer2'>
//                                 <label>Name: </label>
//                                 <input className='' type='text' value={name} onChange={(e) => setName(e.target.value)} />
//                             </div>
//                             <div className='FormFieldContainer2'>
//                                 <label>Email: </label>
//                                 <input className='' type='text' value={name} onChange={(e) => setName(e.target.value)} />
//                             </div>
//                             <div className='FormFieldContainer2'>
//                                 <label>phone Number: </label>
//                                 <input className='' type='text' value={name} onChange={(e) => setName(e.target.value)} />
//                             </div>
//                             <div className='FormFieldContainer2'>
//                                 <label>City: </label>
//                                 <input className='' type='text' value={name} onChange={(e) => setName(e.target.value)} />
//                             </div>
//                             <div className="FormFieldContainer2">
//                                 <label>Father Occupation</label>
//                                 <input type="text" className=""  name="password" />
//                             </div>
//                             <div className="FormFieldContainer2">
//                                 <label>Password</label>
//                                 <input type="password" className=""  name="password" />
//                             </div>

//                         </div>
//                         <button type='submit' className='btn'>Update Profile</button>
//                     </form>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default AdminProfileSetting


import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../Components/Layout';
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const AdminProfileSetting = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setphone] = useState("");
    const [city, setCity] = useState("");
    const [occupation, setOccupation] = useState("");
    // const [password, setPassword] = useState("");

    const useAuth = () => useContext(AuthContext);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        if (auth?.user) {
            console.log(auth.user)
            setName(auth.user.name || ""); 
            setEmail(auth.user.email || ""); 
            setphone(auth.user.phone || ""); 
            setCity(auth.user.city || ""); 
            setOccupation(auth.user.occupation || "");
        }
    }, [auth?.user]);

    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("Auth Object:", auth);
    //     console.log("Token being sent:", auth?.token);
    
    //     try {
    //         const response = await axios.put(
    //             "http://localhost:5000/api/v1/auth/profile",
    //             {
    //                 name,
    //                 email,
    //                 phone,  
    //                 city,
    //                 occupation,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${auth?.token}`,
    //                 },
    //             }
    //         );
    
    //         console.log("API Response:", response); // Log the entire response
    
    //         if (response.data.success) {
    //             toast.success("Profile updated successfully!");
    //             const updatedUser = response.data.updatedUser || response.data.user;
    
    //             localStorage.setItem(
    //                 "auth",
    //                 JSON.stringify({
    //                     ...auth,
    //                     user: updatedUser,
    //                 })
    //             );
    //             setAuth((prevAuth) => ({
    //                 ...prevAuth,
    //                 user: updatedUser,
    //             }));
    //         } else {
    //             toast.error(response.data.message || "Failed to update profile.");
    //         }
    //     } catch (error) {
    //         console.error("Error updating profile:", error.response?.data || error.message);
    //         toast.error(error.response?.data?.message || "An error occurred while updating profile.");
    //     }
    // };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Auth Object:", auth);
        console.log("Token being sent:", auth?.token);
    
        try {
            const response = await axios.put(
                "http://localhost:5000/api/v1/auth/profile",
                {
                    name,
                    email,
                    phone,
                    city,
                    occupation,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`,
                        "Content-Type": "application/json", // Important: Add Content-Type
                    },
                }
            );
    
            console.log("API Response:", response);
    
            if (response.data.success) {
                toast.success("Profile updated successfully!");
                const updatedUser = response.data.updatedUser || response.data.user;
    
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        ...auth,
                        user: updatedUser,
                    })
                );
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: updatedUser,
                }));
            } else {
                toast.error(response.data.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "An error occurred while updating profile.");
        }
    };

    return (
        <Layout title={"Profile Settings"}>
            <div className='contentArea'>
                <h3 className='bwFormHeadings'>Profile Settings</h3><br></br>

                <div className='CustomerDetailsFormContainer'>
                    <form onSubmit={handleSubmit}>
                        <div className='sameCustomerDetailsFormContainer'>
                            <div className='FormFieldContainer2'>
                                <label>Name: </label>
                                <input className='' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Email: </label>
                                <input className='' type='text' value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>phone Number: </label>
                                <input className='' type='text' value={phone} onChange={(e) => setphone(e.target.value)} />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>City: </label>
                                <input className='' type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="FormFieldContainer2">
                                <label>Father Occupation</label>
                                <input type="text" className="" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                            </div>
                        </div>
                        <button type='submit' className='btn'>Update Profile</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default AdminProfileSetting;