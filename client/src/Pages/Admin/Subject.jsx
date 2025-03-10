import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { Modal } from "antd";

const Subject = () => {
  const [name, setName] = useState("");
  const [subject, setsubject] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Pagination logic
  const indexOfLastsubject = currentPage * entriesPerPage;
  const indexOfFirstsubject = indexOfLastsubject - entriesPerPage;
  const currentsubject = subject.slice(indexOfFirstsubject, indexOfLastsubject);
  const totalPages = Math.ceil(subject.length / entriesPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Create Subject
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/subject/create-subject", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is successfully added`);
        setName("");
        await getAllsubject();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all subject
  const getAllsubject = async (req, res) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/subject/get-subject");
      if (data?.success) {
        setsubject(data.subject);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subject");
    }
  };

  useEffect(() => {
    getAllsubject();
  }, []);

  // Update Subject
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selected) return toast.error("No subject selected");
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/subject/update-subject/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        await getAllsubject();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete Subject
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/subject/delete-subject/${id}`
      );
      if (data.success) {
        toast.success(`Subject is deleted`);
        await getAllsubject();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"subject"}>
      <div className='contentArea'>
        <h3 className='bwFormHeadings'>Add Subject</h3><br />

        <div className='CustomerDetailsFormContainer'>
          <form onSubmit={handleSubmit}>
            <div className='sameCustomerDetailsFormContainer'>
              <div className='FormFieldContainer2'>
                <label>Name: </label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <button type='submit' className='btn'>Add Subject</button>
          </form>
        </div>
      </div>

      <h3 className='bwFormHeadings mt-5'>Manage subject</h3><br />
      <table className='UserTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentsubject.map((subject) => (
            <tr key={subject._id}>
              <td>{subject._id}</td>
              <td>{subject.name}</td>
              <td className="actions">
                <div onClick={() => {
                  setVisible(true);
                  setUpdatedName(subject.name);
                  setSelected(subject);
                }} className='actionBtn'>
                  <FaRegEdit />
                </div>
                <div onClick={() => handleDelete(subject._id)} className='actionTrashBtn'>
                  <FaRegTrashCan />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
         {/* Pagination and Entries */}
      <div className='tfootcontainer'>
        <div className='tablePagination'>
          <button
            className='btn'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span> {currentPage} </span>
          <button
            className='btn'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className='entriesPagination'>
          Showing {indexOfFirstsubject + 1} to {Math.min(indexOfLastsubject, subject.length)} of {subject.length} entries, displaying &nbsp;
          <select onChange={handleEntriesChange} value={entriesPerPage}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          Entries
        </div>
      </div>

       {/* Update Model */}
       <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <form onSubmit={handleUpdate}>
        <div className="mb-3 mt-2">
          <h4 className="mb-4 text-center">Update Subject</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </div>
        <div className="mb-3 ">
          <button type="submit" className="btn blue-btn ">
            Update Subject
          </button>
        </div>
      </form>

            </Modal>

    </Layout>
  );
};

export default Subject;
