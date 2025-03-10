import React, { useState, useEffect } from "react";
import "../../Styles/PageStyles/CreateCategory.css";
import Layout from "../../Components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";

const Managestudent = () => {
  const [students, setStudents] = useState([]); // Ensure it's an array
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Get all students
  const getAllStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/auth/categorized-users");
      console.log("API Response:", data);

      // Ensure we're setting an array
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

  useEffect(() => {
    getAllStudents();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = students.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(students.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <Layout title={"Students"}>
      {/* Users Table */}
      <h3 className="bwFormHeadings mt-5">All Registered Students</h3>
      <br />
      <table className="UserTable">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Father Occupation</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              {/* <td>{user._id}</td> */}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.Phone}</td>
              <td>{user.city}</td>
              <td>{user.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination and Entries */}
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

export default Managestudent;
