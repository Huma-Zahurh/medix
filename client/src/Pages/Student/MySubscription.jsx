import React, { useState, useEffect } from 'react';
import StudentLayout from '../../Components/StudentLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../Styles/PageStyles/CreateCategory.css';

const MySubscriptions = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/api/v1/auth/user/${id}`);
          console.log(response.data.user)
          setUser(response.data.user);
      } catch (err) {
          setError(err.message || 'Failed to fetch user data.');
      } finally {
      }
  };

    useEffect(() => {
       fetchUser();
    }, [id]);

    if (error) {
        return (
            <StudentLayout title={'My Subscription'}>
                <h3 className="bwFormHeadings mt-5">My Subscription</h3>
                <p>Error: {error}</p>
            </StudentLayout>
        );
    }

    if (!user?.subscriptions || user.subscriptions.length === 0) {
        return (
            <StudentLayout title={'My Subscription'}>
                <h3 className="bwFormHeadings mt-5">My Subscription</h3>
                <p>No active subscription.</p>
            </StudentLayout>
        );
    }

    const activeSubscription = user.subscriptions[0];

    if (!activeSubscription?.active) {
        return (
            <StudentLayout title={'My Subscription'}>
                <h3 className="bwFormHeadings mt-5">My Subscription</h3>
                <p>No active subscription.</p>
            </StudentLayout>
        );
    }

    const subscriptionDetails = activeSubscription.subscriptionId;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <StudentLayout title={'My Subscription'}>
            <h3 className="bwFormHeadings mt-5">My Subscription</h3>
            <br />
            <table className="UserTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Duration Unit</th>
                        <th>Expiration Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{subscriptionDetails?.name || "N/A"}</td>
                        <td>{subscriptionDetails?.description || "N/A"}</td>
                        <td>{subscriptionDetails?.duration || "N/A"}</td>
                        <td>{subscriptionDetails?.durationUnit || "N/A"}</td>
                        <td>{formatDate(activeSubscription?.expirationDate)}</td>
                    </tr>
                </tbody>
            </table>
        </StudentLayout>
    );
};

export default MySubscriptions;