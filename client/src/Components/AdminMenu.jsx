import React, { useState } from 'react';
import '../Styles/StudentMenu.css';
import { FaChevronDown, FaUserEdit,FaHome, FaFileInvoice, FaBox, FaUsers, FaUserCog, FaBriefcase } from 'react-icons/fa';
import { FaUserPlus, FaUsersGear } from "react-icons/fa6";
// import { ImProfile } from "react-icons/im";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBook } from "react-icons/fa6";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdOutlineAssessment } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineTopic } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import Logo from '../Assets/Logo.jpg'
import { NavLink } from 'react-router-dom'; 

const AdminMenu = () => {

    const [openMenu, setOpenMenu] = useState(null);

    const handleMenuClick = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

  return (
    <div className="userMenu" >
            <NavLink to={"/"} className="logoContainer NavLink">
                <img src={Logo} alt="Logo" className="logo" />
                <div className='LogoText'>
                   <h2 className='LogoText1'>Medix</h2>
                   <p className='LogoText2'>Prep Point</p>
                </div>
            </NavLink>

            <nav className="navContainer">
                <NavLink to={"/admin/dashboard"} className="navItem NavLink">
                    <div className='d-flex align-items-center'>
                        <FaHome className="navIcon" />
                        <span className='px-2'> Dashboard</span>
                    </div>
                </NavLink>

                <div className="navItem" onClick={() => handleMenuClick('Q-Bank')}>
                    <div className='d-flex align-items-center'>
                        <FaFileInvoice className="navIcon" />
                        <span className='px-2'> Medix Q-Bank</span>
                    </div>
                    <FaChevronDown className="dropdownIcon" />
                </div>
                {openMenu === 'Q-Bank' && (
                    <div className="subMenu">
                        <NavLink to={"/admin/categories"} className='NavLink subItem d-flex align-items-center'>
                            <BiSolidCategoryAlt className="navIcon" />
                            <span className='px-2'> Categories</span>
                        </NavLink>
                        <NavLink to={"/admin/subject"} className='NavLink subItem d-flex align-items-center'>
                            <FaBook className="navIcon" />
                            <span className='px-2'> Subjects</span>
                        </NavLink>
                        <NavLink to={"/admin/chapters"} className='NavLink subItem d-flex align-items-center'>
                            <FaBox className="navIcon" />
                            <span className='px-2'> Chapters</span>
                        </NavLink>
                        <NavLink to={"/admin/topics"} className='NavLink subItem d-flex align-items-center'>
                            <MdOutlineTopic className="navIcon" />
                            <span className='px-2'> Topics</span>
                        </NavLink>
                        <NavLink to={"/admin/add-mcqs"} className='NavLink subItem d-flex align-items-center'>
                            <BsNewspaper className="navIcon" />
                            <span className='px-2'> Add MCQ's</span>
                        </NavLink>  
                        <NavLink to={"/admin/manage-mcqs"} className='NavLink subItem d-flex align-items-center'>
                            <LuSettings2 className="navIcon" />
                            <span className='px-2'> Manage MCQ's</span>
                        </NavLink>   
                        <NavLink to={"/admin/study-material"} className='NavLink subItem d-flex align-items-center'>
                            <FaRegNoteSticky className="navIcon" />
                            <span className='px-2'> Study Material</span>
                        </NavLink>   
                        <NavLink to={"/admin/bulk-import"} className='NavLink subItem d-flex align-items-center'>
                            <BsNewspaper className="navIcon" />
                            <span className='px-2'> Bulk Import</span>
                        </NavLink>       
                    </div>
                )}

                <div className="navItem" onClick={() => handleMenuClick('Subscriptions')}>
                    <div className='d-flex align-items-center'>
                        <FaUsers className="navIcon" />
                        <span className='px-2'> Subscriptions</span>
                    </div>
                    <FaChevronDown className="dropdownIcon" />

                </div>

                {openMenu === 'Subscriptions' && (
                    <div className="subMenu">
                        <NavLink to={"/admin/subscription"} className='NavLink subItem d-flex align-items-center'>
                            <FaUserPlus className="navIcon" />
                            <span className='px-2'> Subscriptions</span>
                        </NavLink>
                        <NavLink to={"/admin/manage-subscription"} className='NavLink subItem d-flex align-items-center'>
                            <FaUsersGear className="navIcon" />
                            <span className='px-2'> Manage Subscriptions</span>
                        </NavLink>

                    </div>
                )}

                <div className="navItem" onClick={() => handleMenuClick('Users')}>
                    <div className='d-flex align-items-center'>
                        <FaUserCog className="navIcon" />
                        <span className='px-2'>Enrolled Students</span>
                    </div>
                    <FaChevronDown className="dropdownIcon" />

                </div>

                {openMenu === 'Users' && (
                    <div className="subMenu">
                        <NavLink to={"/admin/manage-students"} className='NavLink subItem d-flex align-items-center'>
                            <FaUserEdit className="navIcon" />
                            <span className='px-2'> Manage Students</span>
                        </NavLink>
                        <NavLink to={""} className='NavLink subItem d-flex align-items-center'>
                            <FaUserPlus className="navIcon" />
                            <span className='px-2'> Students Progress</span>
                        </NavLink>
                    </div>
                )}


                <div className="navItem" onClick={() => handleMenuClick('Settings')}>
                    <div className='d-flex align-items-center'>
                        <FaBriefcase className="navIcon" />
                        <span className='px-2'>Settings</span>
                    </div>
                    <FaChevronDown className="dropdownIcon" />

                </div>

                {openMenu === 'Settings' && (
                    <div className="subMenu">
                        <NavLink to={"/admin/profile-settings"} className='NavLink subItem d-flex align-items-center'>
                            <IoSettingsOutline  className="navIcon" />
                            <span className='px-2'> Profile Settings</span>
                        </NavLink>
                         <NavLink to={"/admin/banner-upload"} className='NavLink subItem d-flex align-items-center'>
                            <MdOutlineAssessment className="navIcon" />
                            <span className='px-2'> Banner Settings</span>
                        </NavLink>              

                    </div>
                )}

            </nav>

        </div>
  )
}

export default AdminMenu