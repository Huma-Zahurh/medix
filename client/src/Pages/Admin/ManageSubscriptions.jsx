import React, { useState, useEffect } from "react";
import "../../Styles/PageStyles/CreateCategory.css";
import Layout from "../../Components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageSubscriptions = () => {
    const [students, setStudents] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    const getAllStudents = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/auth/categorized-users");
            console.log(data);
            if (data?.success && Array.isArray(data.data.students)) {
                setStudents(data.data.students);
            } else {
                throw new Error("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Something went wrong in getting students");
        }
    };

    const getAllSubscriptions = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/subscription/get-subscriptions");
            if (data?.success && Array.isArray(data.subscriptions)) {
                setSubscriptions(data.subscriptions);
            } else {
                throw new Error("Invalid subscription data format");
            }
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
            toast.error("Something went wrong in getting subscriptions");
        }
    };

    useEffect(() => {
        getAllStudents();
        getAllSubscriptions();
    }, []);

    const indexOfLastUser = currentPage * entriesPerPage;
    const indexOfFirstUser = indexOfLastUser - entriesPerPage;
    const currentUsers = students.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(students.length / entriesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSubscriptionChange = async (studentId, subscriptionId) => {
        try {
            const url = `http://localhost:5000/api/v1/subscription/assign-subscription/${studentId}`;
            await axios.post(url, { subscriptionId: subscriptionId });
            toast.success(`Subscription assigned/updated successfully`);
            getAllStudents();
        } catch (error) {
            console.error(`Error assigning/updating subscription:`, error);
            toast.error(`Failed to assign/update subscription`);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleString();
    };


    return (
        <Layout title={"Manage Subscriptions"}>
            <h3 className="bwFormHeadings mt-5"> Students</h3>
            <br />
            <table className="UserTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Subscription</th>
                        <th>Expiration Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.city}</td>
                            <td>
                            {user.subscriptions?.[0]?.subscriptionId?.name}
                            </td>
                            <td>
                                {formatDate(user.subscriptions[0]?.expirationDate)}
                            </td>
                            <td>
                                <select
                                    onChange={(e) => handleSubscriptionChange(user._id, e.target.value)}
                                >
                                    <option value="">Assign/Update Subscription</option>
                                    {subscriptions.map((sub) => (
                                        <option key={sub._id} value={sub._id}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="tfootcontainer">
                <div className="tablePagination">
                    <button className="btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span> {currentPage} </span>
                    <button className="btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
                <div className="entriesPagination">
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, students.length)} of {students.length} entries, displaying &nbsp;
                    <select onChange={handleEntriesChange} value={entriesPerPage}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    Entries
                </div>
            </div>
        </Layout>
    );
};

export default ManageSubscriptions;