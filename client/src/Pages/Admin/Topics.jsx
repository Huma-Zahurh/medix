import React, { useState , useEffect } from 'react';
import '../../Styles/PageStyles/CreateCategory.css';
import Layout from '../../Components/Layout';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { Modal } from "antd";

const Topics = () => {
    const [name, setName] = useState("");
    const [updatedName, setUpdatedName] = useState("");
    const [subjectValue, setSubjectValue] = useState("");
    const [updatedSubjectValue, setUpdatedSubjectValue] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [filteredChapters, setFilteredChapters] = useState([]); // Added filteredChapters state
    const [chapterValue, setChapterValue] = useState("");
    const [updatedChapterValue, setUpdatedChapterValue] = useState("");
    const [topics, setTopic] = useState([]);
    const [open, setopen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Pagination logic
    const indexOfLastUser = currentPage * entriesPerPage;
    const indexOfFirstUser = indexOfLastUser - entriesPerPage;
    const currentUsers = topics.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(topics.length / entriesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    // Create Topic
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/v1/topic/create-topic", {
                name,
                subject: subjectValue, 
                chapter: chapterValue
            });
            if (data?.success) {
                toast.success(`${name} is successfully created`);
                setName("");
                setSubjectValue("");
                setChapterValue("");
                await getAlltopics();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong in input form");
        }
    };

    // Get all Topics
    const getAlltopics = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/topic/get-topics");
            if (data?.success) {
                setTopic(data.topics);
            }
        } catch (error) {
            toast.error("Something went wrong in getting Topics");
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

    // Handle Subject Change
    const handleSubjectChange = (e) => {
        const selectedSubject = e.target.value;
        setSubjectValue(selectedSubject);

        // Filter chapters by the selected subject
        const filteredChapters = chapters.filter((chapter) => chapter.subject._id === selectedSubject);
        setFilteredChapters(filteredChapters);
        setChapterValue(""); // Reset chapter selection
    };

    useEffect(() => {
        getAllSubjects();
        getAllChapters();
        getAlltopics();
    }, []);

    // Update Topic
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selected) return toast.error("No Topic selected");
        try {
            const { data } = await axios.put(
                `http://localhost:5000/api/v1/topic/update-topic/${selected._id}`,
                { name: updatedName, subject: updatedSubjectValue , chapter: updatedChapterValue} 
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setUpdatedSubjectValue("");
                setUpdatedChapterValue("");
                setopen(false);
                await getAlltopics();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while updating chapter");
        }
    };

    // Delete Topic
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/v1/topic/delete-topic/${id}`);
            if (data.success) {
                toast.success("Topic is deleted");
                await getAlltopics();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Topics"}>

            {/* Add Topic Form */}
            <div className='contentArea'>
                <h3 className='bwFormHeadings'>Add Topics</h3><br />

                <div className='CustomerDetailsFormContainer'>
                    <form onSubmit={handleSubmit}>
                        <div className='sameCustomerDetailsFormContainer'>
                            <div className='FormFieldContainer2'>
                                <label>Name: </label>
                                <input className='' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Select Subject: </label>
                                <select value={subjectValue} onChange={handleSubjectChange} required>
                                    <option value="">Choose Subject</option>
                                    {subjects.map((sub) => (
                                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Select Chapter: </label>
                                <select value={chapterValue} onChange={(e) => setChapterValue(e.target.value)} required>
                                    <option value="">Choose Chapter</option>
                                    {filteredChapters.map((sub) => (
                                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type='submit' className='btn'>Add Topic</button>
                    </form>
                </div>
            </div>

            {/* Manage Topics Table */}
            <h3 className='bwFormHeadings mt-5'>Manage Topics</h3><br />
            <table className='UserTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Topics</th>
                        <th>Chapter</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((top) => (
                        <tr key={top._id}>
                            <td>{top._id}</td>
                            <td>{top.name}</td>
                            <td>{top.chapter?.name}</td>
                            <td>{top.subject?.name} </td>
                            <td className="actions">
                                {/* Edit Button */}
                                <div onClick={() => {
                                    setopen(true);
                                    setUpdatedName(top.name);
                                    setUpdatedSubjectValue(top.subject ? top.subject._id : "");
                                    setUpdatedChapterValue(top.chapter ? top.chapter._id : "");
                                    setSelected(top);
                                }} className='actionBtn'>
                                    <FaRegEdit />
                                </div>

                                {/* Delete Button */}
                                <div onClick={() => handleDelete(top._id)} className='actionTrashBtn'>
                                    <FaRegTrashCan />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
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
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, topics.length)} of {topics.length} entries, displaying &nbsp;
                    <select onChange={handleEntriesChange} value={entriesPerPage}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    Entries
                </div>
            </div>

            {/* Update Topic Modal */}
            <Modal
                onCancel={() => setopen(false)}
                footer={null}
                open={open}
            >
                <form onSubmit={handleUpdate}>
                    <div className="mb-3 mt-2">
                        <h4 className="mb-4 text-center">Update Topic</h4>
                        <label>Topic Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new category"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        /><br />
                        <label>Subject: </label><br />
                        <select value={updatedSubjectValue} onChange={(e) => setUpdatedSubjectValue(e.target.value)} required>
                            <option value="">Choose Subject</option>
                            {subjects.map((sub) => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))}
                        </select> <br />
                        <label>Chapter: </label><br />
                        <select value={updatedChapterValue} onChange={(e) => setUpdatedChapterValue(e.target.value)} required >
                            <option>Choose Chapter</option>
                            {filteredChapters.map((sub) => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 ">
                        <button type="submit" className="btn blue-btn ">
                            Update Topic
                        </button>
                    </div>
                </form>
            </Modal>

        </Layout>
    )
}

export default Topics;
