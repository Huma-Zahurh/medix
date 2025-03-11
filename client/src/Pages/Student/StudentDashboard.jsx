import React , {useState, useEffect} from 'react'
import '../../Styles/PageStyles/AdminDashboard.css'
import { FaArrowRight } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { TbCalendarDue } from "react-icons/tb";
import { FaFileInvoice } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaBox, FaUsers } from 'react-icons/fa';
import bannerVector from '../../Assets/home-slider.png'
import vector2 from '../../Assets/object.png'
import StudentLayout from '../../Components/StudentLayout';
import axios from 'axios';

const StudentDashboard = () => {

  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
      const fetchBanner = async () => {
          try {
              const response = await axios.get('http://localhost:5000/api/v1/banner/get');
              setBannerUrl(response.data.imageUrl);
          } catch (error) {
              console.error('Fetch Banner Error:', error);
          }
      };
      fetchBanner();
  }, []);

  return (
    <StudentLayout title={"Dashboard"}>
      
      <div>
      
              {/* Banner */}
              <div className='BannerContainer'>
              {bannerUrl && <img src={bannerUrl} alt="Dashboard Banner" style={{ width: '100%' }} />}
              </div>
      
              {/*  Stats */}
              <div className='userStatsContainer mt-4'>
                <h4 className='subHeading'>Stats</h4>
      
                <div className='userStatsBoxContainer mt-3'>
      
                  <div className='StatsBoxesContainer_1'>
                    <div className='statsBox'>
                      <h4><BsCurrencyDollar /></h4>
                      <h6 className='subHeading'>250</h6>
                      <div className='statsBoxNameNBtn'>
                        <span>Total Subjects</span>
                        {/* <button className='statsBoxBtn'><FaArrowRight /></button> */}
                      </div>
                    </div>
      
                    <div className='statsBox2'>
                      <h4><TbCalendarDue /></h4>
                      <h6 className='subHeading'>5</h6>
                      <div className='statsBoxNameNBtn'>
                        <span>Total Chapters</span>
                        {/* <button className='statsBox2Btn'><FaArrowRight /></button> */}
                      </div>
                    </div>
      
                  </div>
      
                  <div className='StatsBoxesContainer_2'>
      
                    <div className='statsBox'>
                      <h4><FaFileInvoice /></h4>
                      <h6 className='subHeading'>200</h6>
                      <div className='statsBoxNameNBtn'>
                        <span>Study Material</span>
                        {/* <button className='statsBoxBtn'><FaArrowRight /></button> */}
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
                          {/* <button className='statsBox2Btn'><FaArrowRight /></button> */}
                        </div>
                      </div>
      
                      <div className='statsBox'>
                      <h4><FaBox /></h4>
                      <h6 className='subHeading'>500</h6>
                      <div className='statsBoxNameNBtn'>
                        <span>Total MCQ's</span>
                        {/* <button className='statsBoxBtn'><FaArrowRight /></button> */}
                      </div>
                    </div>
      
                    </div>
      
                    <div className='statsBox statsBox4'>
                      <div className='statsBoxInner'>
                      <h4><FaUsers /></h4>
                      <h6 className='subHeading'>300</h6>
                      <div className='statsBoxNameNBtn'>
                        <span>Practice Questions</span>
                        {/* <button className='statsBoxBtn'><FaArrowRight /></button> */}
                      </div>
                      </div>
                      <div className='stats-img-2_Container'>
                      <img src={vector2} alt='Inovice_Stats'  className='stats-img-1'/>
                      </div>
                    </div>
      
                  </div>
      
                </div>
      
              </div>
      
              {/* Streaks */}
              {/* <div className='contentArea'>
              <h4 className='subHeading'>Streaks</h4>
              <span>March 2025</span>
                <div className='streakscontainer'>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                  <div className='streak'></div>
                </div>
              </div> */}
            </div>

    </StudentLayout>
  )
}

export default StudentDashboard
