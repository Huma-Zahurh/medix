import React, { useState } from 'react'
import StudentMenu from '../Components/StudentMenu'
import '../Styles/Layout.css'
import user from '../Assets/user.jpeg'
import { FaSearch, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import toast , { Toaster } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const StudentLayout = ({ children, title }) => {

    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [bellDropdownVisible, setBellDropdownVisible] = useState(false);
    const useAuth = () => useContext(AuthContext);
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
    };
  
    const handleUserMouseEnter = () => {
      setUserDropdownVisible(true);
    };
  
    const handleUserMouseLeave = () => {
      setUserDropdownVisible(false);
    };
  
    const handleBellMouseEnter = () => {
      setBellDropdownVisible(true);
    };
  
    const handleBellMouseLeave = () => {
      setBellDropdownVisible(false);
    };
  
    const handleUserToggleClick = () => {
      setUserDropdownVisible(!userDropdownVisible);
    };

  return (
    <div>
       <div className='layout'>
        {/* Menu */}
        <div className='menuSide '>
          <StudentMenu />
        </div>

        {/* Page Content */}
        <div className='container PageContentSide'>

          {/* Page Top Bar */}
          <div className='PageTopBar pb-4'>

            <div className='greetingText'>
              <h4>{title}</h4>
              <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
              </Helmet>
            </div>

            <div className='RightSearchNInfo'>
              {/* <form className='searchForm'>
                <input className='InputField searchBar' type='search' placeholder='Search...' />
              </form>

              <button className='searchBtn roundBtn'> <FaSearch /> </button> */}

              {/* Bell Icon Dropdown */}
              <div
                className="BellIconContainer"
                onMouseEnter={handleBellMouseEnter}
                onMouseLeave={handleBellMouseLeave}
              >
                <button className='roundBtn'> <FaBell /> </button>
                {bellDropdownVisible && (
                  <div className="BellDropdown">
                    <h4>Notifications</h4>
                    <hr />
                    <p>No Notifications Yet...</p>
                  </div>
                )}
              </div>

              {/* User Info Dropdown */}
              <div
                className="UserInfoContainer"
                onMouseEnter={handleUserMouseEnter}
                onMouseLeave={handleUserMouseLeave}
              >
                <img
                  src={user}
                  alt="User"
                  className="UserImage"
                  onClick={handleUserToggleClick}
                />
                {userDropdownVisible && (
                  <div className="UserDropdown">
                    <h4>Hi! </h4>
                    <p>Welcome Back</p>
                    <hr />
                    <div>
                    <Link to="/settings" className="DropdownLink">Settings</Link>
                    <Link to="/support" className="DropdownLink">Support</Link>
                    <Link onClick={handleLogout}
                          to="/" className="DropdownLink">Logout</Link>
                    </div>
                    
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Page Content Here */}
          <main>
            <Toaster />
            {children}
          </main>

        </div>

      </div>
    </div>
  )
}

export default StudentLayout
