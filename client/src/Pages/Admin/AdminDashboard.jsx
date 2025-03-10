import React from 'react'
import Layout from '../../Components/Layout'
import '../../Styles/PageStyles/AdminDashboard.css'
import { FaArrowRight } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { TbCalendarDue } from "react-icons/tb";
import { FaFileInvoice } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaBox, FaUsers } from 'react-icons/fa';
import bannerVector from '../../Assets/home-slider.png'
import vector2 from '../../Assets/object.png'

const AdminDashboard = () => {
  return (
    <Layout title={"Dashboard"}>
      
      <div>

        {/* Banner */}
        <div className='BannerContainer'>
          {/* Banner Text */}
          <div className='BannerText'>
            <p><strong>Welcome To Medix Prep</strong></p>
            <h4>Unlock the full potential of your Success</h4>
            <p>Your streamlined solution for preparing for Exams all in one place.</p>
          </div>
          {/* Banner Vector */}
          <div className='BannerVector'>
            <img src={bannerVector} alt='Banner-Vector' />
          </div>

        </div>

        {/*  Stats */}
        <div className='userStatsContainer mt-4'>
          <h4 className='subHeading'>Stats</h4>

          <div className='userStatsBoxContainer mt-3'>

            <div className='StatsBoxesContainer_1'>
              <div className='statsBox'>
                <h4><BsCurrencyDollar /></h4>
                <h6 className='subHeading'>213.99</h6>
                <div className='statsBoxNameNBtn'>
                  <span>Subscriptions</span>
                  <button className='statsBoxBtn'><FaArrowRight /></button>
                </div>
              </div>

              <div className='statsBox2'>
                <h4><TbCalendarDue /></h4>
                <h6 className='subHeading'>5</h6>
                <div className='statsBoxNameNBtn'>
                  <span>Sessions</span>
                  <button className='statsBox2Btn'><FaArrowRight /></button>
                </div>
              </div>

            </div>

            <div className='StatsBoxesContainer_2'>

              <div className='statsBox'>
                <h4><FaFileInvoice /></h4>
                <h6 className='subHeading'>200</h6>
                <div className='statsBoxNameNBtn'>
                  <span>Study Material</span>
                  <button className='statsBoxBtn'><FaArrowRight /></button>
                </div>
                <div className='stats-img-1_Container'>
                <img src={vector2} alt='Inovice_Stats'  className='stats-img-1'/>
                </div>
              </div>

            </div>

            <div className='StatsBoxesContainer_3'>

              <div className='StatsBoxesContainer_4'>
                <div className='statsBox3'>
                  <h4><MdOutlinePendingActions /></h4>
                  <h4 className='subHeading'>5</h4>
                  <div className='statsBoxNameNBtn'>
                    <span>Pending Quiz</span>
                    <button className='statsBox2Btn'><FaArrowRight /></button>
                  </div>
                </div>

                <div className='statsBox'>
                <h4><FaBox /></h4>
                <h6 className='subHeading'>500</h6>
                <div className='statsBoxNameNBtn'>
                  <span>Total MCQ's</span>
                  <button className='statsBoxBtn'><FaArrowRight /></button>
                </div>
              </div>

              </div>

              <div className='statsBox statsBox4'>
                <div className='statsBoxInner'>
                <h4><FaUsers /></h4>
                <h6 className='subHeading'>300</h6>
                <div className='statsBoxNameNBtn'>
                  <span>Total Students</span>
                  <button className='statsBoxBtn'><FaArrowRight /></button>
                </div>
                </div>
                <div className='stats-img-2_Container'>
                <img src={vector2} alt='User_Stats'  className='stats-img-1'/>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  )
}

export default AdminDashboard
