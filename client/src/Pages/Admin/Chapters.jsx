import React, { useState, useEffect } from 'react';
import '../../Styles/PageStyles/CreateCategory.css';
import Layout from '../../Components/Layout';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { Modal } from "antd";

const Chapter = () => {
    const [name, setName] = useState("");
    const [subjectValue, setSubjectValue] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedSubjectValue, setUpdatedSubjectValue] = useState("");
    const [open, setopen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Pagination logic
    const indexOfLastUser = currentPage * entriesPerPage;
    const indexOfFirstUser = indexOfLastUser - entriesPerPage;
    const currentUsers = chapters.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(chapters.length / entriesPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    // Create Chapter
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/v1/chapter/create-chapter", {
                name,
                subject: subjectValue, // Fixed subject handling
            });
            if (data?.success) {
                toast.success(`${name} is successfully created`);
                setName("");
                setSubjectValue("");
                await getAllChapters();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong in input form");
        }
    };

    // Get all Subjects
    const getAllSubjects = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/subject/get-subject");
            if (data?.success) {
                setSubjects(data.subject);
            }
        } catch (error) {
            toast.error("Something went wrong in getting subjects");
        }
    };

    // Get all Chapters
    const getAllChapters = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/chapter/get-chapters");
            if (data?.success) {
                setChapters(data.chapters);
            }
        } catch (error) {
            toast.error("Something went wrong in getting chapters");
        }
    };

    useEffect(() => {
        getAllSubjects();
        getAllChapters();
    }, []);

    // Update Chapter
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selected) return toast.error("No chapter selected");
        try {
            const { data } = await axios.put(
                `http://localhost:5000/api/v1/chapter/update-chapter/${selected._id}`,
                { name: updatedName, subject: updatedSubjectValue } // Fixed subject update handling
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setUpdatedSubjectValue("");
                setopen(false);
                await getAllChapters();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while updating chapter");
        }
    };

    // Delete Chapter
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/v1/chapter/delete-chapter/${id}`);
            if (data.success) {
                toast.success("Chapter is deleted");
                await getAllChapters();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Chapters"}>
            <div className='contentArea'>
                <h3 className='bwFormHeadings'>Add Chapters</h3><br />
                <div className='CustomerDetailsFormContainer'>
                    <form onSubmit={handleSubmit}>
                        <div className='sameCustomerDetailsFormContainer'>
                            <div className='FormFieldContainer2'>
                                <label>Name: </label>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Select Subject: </label>
                                <select value={subjectValue} onChange={(e) => setSubjectValue(e.target.value)} required>
                                    <option value="">Choose Subject</option>
                                    {subjects.map((sub) => (
                                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type='submit' className='btn'>Add Chapter</button>
                    </form>
                </div>
            </div>

            <h3 className='bwFormHeadings mt-5'>Manage Chapters</h3><br />
            <table className='UserTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Chapter</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((chap) => (
                        <tr key={chap._id}>
                            <td>{chap._id}</td>
                            <td>{chap.name}</td>
                            <td>{chap.subject?.name || "No Subject"}</td>
                            <td className="actions">
                                <div onClick={() => {
                                    setopen(true);
                                    setUpdatedName(chap.name);
                                    setUpdatedSubjectValue(chap.subject?._id || "");
                                    setSelected(chap);
                                }} className='actionBtn'>
                                    <FaRegEdit />
                                </div>
                                <div onClick={() => handleDelete(chap._id)} className='actionTrashBtn'>
                                    <FaRegTrashCan />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='tfootcontainer'>
                <div className='tablePagination'>
                    <button className='btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <span> {currentPage} </span>
                    <button className='btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
                <div className='entriesPagination'>
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, chapters.length)} of {chapters.length} entries, displaying &nbsp;
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
                onCancel={() => setopen(false)}
                footer={null}
                open={open}
            >
                <form onSubmit={handleUpdate}>
                    <div className="mb-3 mt-2">
                        <h4 className="mb-4 text-center">Update Chapter</h4>
                        <label>Chapter Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new category"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        /><br></br>
                        <label>Subject: </label><br></br>
                        <select value={updatedSubjectValue} onChange={(e) => setUpdatedSubjectValue(e.target.value)} required>
                            <option value="">Choose Subject</option>
                            {subjects.map((sub) => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 ">
                        <button type="submit" className="btn blue-btn ">
                            Update Chapter
                        </button>
                    </div>
                </form>

            </Modal>


        </Layout>
    );
};

export default Chapter;
