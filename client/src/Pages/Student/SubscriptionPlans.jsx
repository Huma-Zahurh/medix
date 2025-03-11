import React, { useState, useEffect } from 'react';
import StudentLayout from '../../Components/StudentLayout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../Styles/PageStyles/CreateCategory.css';
import { Modal } from 'antd'; 

const SubscriptionPlans = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isModalopen, setIsModalopen] = useState(false);
    const [modalText, setModalText] = useState('');

    const getAllSubscriptions = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/v1/subscription/get-subscriptions');
            if (data?.success && Array.isArray(data.subscriptions)) {
                setSubscriptions(data.subscriptions);
                console.log(data.subscriptions);
            } else {
                throw new Error('Invalid subscription data format');
            }
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
            toast.error('Something went wrong in getting subscriptions');
        }
    };

    useEffect(() => {
        getAllSubscriptions();
    }, []);

    const showModal = (subName) => {
        setModalText(`You are about to subscribe to the ${subName} plan.`);
        setIsModalopen(true);
    };

    const handleOk = () => {
        setIsModalopen(false);
        // Add your logic here for handling the subscription
        // toast.success("Subscription successful!");
    };

    const handleCancel = () => {
        setIsModalopen(false);
    };

    return (
        <StudentLayout title={'Subscription Plans'}>
            <h3 className="bwFormHeadings mt-5">Available Plans</h3>
            <br />
            <div className="">
                <div className="row">
                    {subscriptions.map((sub) => (
                        <div key={sub._id} className="col-md-4 mb-4">
                            <div className="contentArea shadow-sm h-100">
                                <div className="">
                                    <h5 className="text-center subscriptionName">{sub.name}</h5>
                                    <p className="text-center"><strong className='indexNum'>{sub.duration} {sub.durationUnit}</strong> Session</p>
                                    <p className="text-center">PKR <strong className='SubscriptionPrice'>{sub.price}</strong> </p>
                                    <div className='d-flex justify-content-center'>
                                    <button className="btn mx-auto" onClick={() => showModal(sub.name)}>Subscribe</button>
                                    </div>
                                    <hr></hr>
                                    <p className="text-center">{sub.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                title="Confirm Subscription"
                open={isModalopen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <h5>{modalText}</h5>
                    <p>Make payment on one of the given number:<br></br><br></br>

💥 Account Details <br></br>

🌀 Easypaisa<br></br>

 03265590305 <br></br>

(M.Rehman Akbar)<br></br><br></br><hr></hr>

🌀Jazzcash<br></br>

 0308-6589850<br></br>

(M.Rehman Akbar)<br></br><br></br><hr></hr>

 🌀 MCB Limited<br></br>

1539844471011679<br></br>

(Muhammad Rehman Akbar)<br></br><br></br><hr></hr>

✅ After Payment , send screenshot on WhatsApp: 0326-5590305

 Within 24 Hours , access will be given</p>
            </Modal>
        </StudentLayout>
    );
};

export default SubscriptionPlans;