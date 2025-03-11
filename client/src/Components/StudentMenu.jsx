import React, { useState, useEffect, useContext, useRef } from "react";
import "../Styles/StudentMenu.css";
import { FaChevronDown, FaUserEdit, FaHome, FaFileInvoice, FaUsers, FaUserCog, FaBriefcase } from "react-icons/fa";
import { FaUserPlus, FaUsersGear } from "react-icons/fa6";
import { MdOutlineAssessment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import Logo from "../Assets/Logo.jpg";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const StudentMenu = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    const [auth] = useContext(AuthContext);
    const userId = auth?.user?._id;
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const fetchUserAndCategories = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:5000/api/v1/auth/user/${userId}`);
            const userData = userResponse.data.user;

            if (userData.subscriptions[0].subscriptionId.categories) {
                const activeCategoryIds = userData.subscriptions[0].subscriptionId.categories;

                const allCategoriesResponse = await axios.get("http://localhost:5000/api/v1/category/get-categories");
                const allCategoriesData = allCategoriesResponse.data.categories;
                setAllCategories(allCategoriesData);
                const filteredCategories = allCategoriesData.filter(cat => activeCategoryIds.includes(cat._id));
                setCategories(filteredCategories);
            } else {
                setCategories([]);
                setAllCategories([]);
            }
        } catch (err) {
            toast.error("Something went wrong while fetching data");
            console.error("Fetch Error:", err);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserAndCategories();
        }
    }, [userId]);

    const handleMenuClick = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className="userMenu" ref={menuRef}>
            <NavLink to={"/"} className="logoContainer NavLink">
                <img src={Logo} alt="Logo" className="logo" />
                <div className="LogoText">
                    <h2 className="LogoText1">Medix</h2>
                    <p className="LogoText2">Prep Point</p>
                </div>
            </NavLink>

            <nav className="navContainer">
                <NavLink to={"/student/dashboard"} className="navItem NavLink">
                    <div className="d-flex align-items-center">
                        <FaHome className="navIcon" />
                        <span className="px-2"> Dashboard</span>
                    </div>
                </NavLink>

                <div className="navItem" onClick={() => handleMenuClick("Q-Bank")}>
                    <div className="d-flex align-items-center">
                        <FaFileInvoice className="navIcon" />
                        <span className="px-2"> Medix Q-Bank</span>
                    </div>
                    <FaChevronDown className="dropdownIcon" />
                </div>

                {openMenu === 'Q-Bank' && (
                    <div className={`subMenu popup-submenu ${openMenu === 'Q-Bank' ? 'show' : ''}`}>
                        {categories.map(category =>
                            <NavLink
                                key={category._id}
                                to={`/student/q-bank/${category.slug}`}
                                className='NavLink subItem d-flex align-items-center'
                            >
                                <MdOutlineAssessment className="navIcon" />
                                <span className='px-2'>{category?.name}</span>
                            </NavLink>
                        )}
                    </div>
                )}

                <div className="navItem" onClick={() => handleMenuClick("Subscriptions")}>
                    <div className="d-flex align-items-center">
                        <FaUsers className="navIcon" />
                        <span className="px-2"> Subscriptions</span>
                    </div>
                    <FaChevronDown className="dropdownIcon" />
                </div>

                {openMenu === "Subscriptions" && (
                    <div className={`subMenu popup-submenu ${openMenu === 'Subscriptions' ? 'show' : ''}`}>
                        <NavLink to={"/student/subscription-plans"} className="NavLink subItem d-flex align-items-center">
                            <FaUserPlus className="navIcon" />
                            <span className="px-2"> Subscription Plans</span>
                        </NavLink>
                        <NavLink to={`/student/my-subscriptions/${userId}`} className="NavLink subItem d-flex align-items-center">
                            <FaUsersGear className="navIcon" />
                            <span className="px-2"> My Subscriptions</span>
                        </NavLink>
                    </div>
                )}

                <div className="navItem" onClick={() => handleMenuClick("Users")}>
                    <div className="d-flex align-items-center">
                        <FaUserCog className="navIcon" />
                        <span className="px-2">Progress</span>
                    </div>
                    <FaChevronDown className="dropdownIcon" />
                </div>

                {openMenu === "Users" && (
                    <div className={`subMenu popup-submenu ${openMenu === 'Users' ? 'show' : ''}`}>
                        <div className="subItem d-flex align-items-center">
                            <FaUserEdit className="navIcon" />
                            <span className="px-2"> My Progress</span>
                        </div>
                        <div className="subItem d-flex align-items-center">
                            <FaUserPlus className="navIcon" />
                            <span className="px-2"> My Position</span>
                        </div>
                    </div>
                )}

                <div className="navItem" onClick={() => handleMenuClick("Settings")}>
                    <div className="d-flex align-items-center">
                        <FaBriefcase className="navIcon" />
                        <span className="px-2">Settings</span>
                    </div>
                    <FaChevronDown className="dropdownIcon" />
                </div>

                {openMenu === "Settings" && (
                    <div className={`subMenu popup-submenu ${openMenu === 'Settings' ? 'show' : ''}`}>
                        <NavLink to={"/student/profile-settings"} className="NavLink subItem d-flex align-items-center">
                            <IoSettingsOutline className="navIcon" />
                            <span className="px-2"> Profile Settings</span>
                        </NavLink>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default StudentMenu;