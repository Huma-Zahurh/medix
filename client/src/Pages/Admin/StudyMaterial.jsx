import React, { useState, useEffect, memo } from 'react';
import Layout from '../../Components/Layout';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { Modal } from "antd";

const StudyMaterial = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [open, setopen] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [allChapters, setAllChapters] = useState([]);
    const [allTopics, setAllTopics] = useState([]);
    const [filteredChapters, setFilteredChapters] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [selected, setSelected] = useState(null);

    const [formData, setFormData] = useState({
        subject: "",
        chapter: "",
        topic: "",
        title: "",
        description: "",
        file_url: ""
    });

    const [updateFormData, setUpdateFormData] = useState({
        UpdatedSubject: "",
        UpdatedChapter: "",
        UpdatedTopic: "",
        UpdatedTitle: "",
        UpdatedDescription: ""
    });

    const getAllMaterials = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/material/get-study-material");
            if (data?.success) {
                setMaterials(data.materials);
            }
        } catch (error) {
            console.error("Error fetching materials", error);
        }
    };

    const updateMaterials = async (e) => {
        e.preventDefault();
        if (!selected) return toast.error("No Study Material selected");

        try {
            const { data } = await axios.put(
                `http://localhost:5000/api/v1/material/update-material/${selected._id}`,
                {
                    title: updateFormData.UpdatedTitle,
                    subject: updateFormData.UpdatedSubject,
                    chapter: updateFormData.UpdatedChapter,
                    topic: updateFormData.UpdatedTopic,
                    description: updateFormData.UpdatedDescription,
                }
            );
            getAllMaterials();
            if (data?.success) {
                toast.success(`${updateFormData.UpdatedTitle} is updated`);
                setSelected(null);
                setopen(false);
                setFormData({
                    subject: "",
                    chapter: "",
                    topic: "",
                    title: "",
                    description: "",
                    file_url: ""
                });
                resetUpdateFormData();
                await getAllMaterials();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while updating the study material");
        }
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/v1/material/delete-material/${id}`);
            if (data.success) {
                toast.success("Study Material is deleted");
                await getAllMaterials();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subjectRes = await axios.get("http://localhost:5000/api/v1/subject/get-subject");
                const chapterRes = await axios.get("http://localhost:5000/api/v1/chapter/get-chapters");
                const topicRes = await axios.get("http://localhost:5000/api/v1/topic/get-topics");
                setSubjects(subjectRes.data.subject);
                setAllChapters(chapterRes.data.chapters);
                setAllTopics(topicRes.data.topics);
                getAllMaterials();
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (formData.subject) {
            const filtered = allChapters.filter(chapters => chapters.subject._id === formData.subject);
            setFilteredChapters(filtered);
            setFilteredTopics([]);
        } else {
            setFilteredChapters([]);
            setFilteredTopics([]);
        }
        setFormData(prev => ({ ...prev, chapter: "", topic: "" }));
    }, [formData.subject, allChapters]);

    useEffect(() => {
        if (formData.chapter) {
            const filtered = allTopics.filter(topics => topics.chapter._id === formData.chapter);
            setFilteredTopics(filtered);
        } else {
            setFilteredTopics([]);
        }
        setFormData(prev => ({ ...prev, topic: "" }));
    }, [formData.chapter, allTopics]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file_url: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, subject, chapter, topic, file_url } = formData;
        if (!title || !description || !subject || !chapter || !topic || !file_url) {
            toast.error("All fields are required!");
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append("title", title);
        formDataToSend.append("description", description);
        formDataToSend.append("subject", subject);
        formDataToSend.append("chapter", chapter);
        formDataToSend.append("topic", topic);
        formDataToSend.append("file", file_url);
        try {
            const response = await axios.post("http://localhost:5000/api/v1/material/create-material", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success("Study Material added successfully!");
            setFormData({
                subject: "",
                chapter: "",
                topic: "",
                title: "",
                description: "",
                file_url: ""
            });
            getAllMaterials();
        } catch (error) {
            console.error("Error adding study material:", error);
            toast.error("Failed to add study material!");
        }
    };

    const indexOfLastUser = currentPage * entriesPerPage;
    const indexOfFirstUser = indexOfLastUser - entriesPerPage;
    const currentUsers = materials.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(materials.length / entriesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleUpdateChange = (e) => {
        setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
    };

    const resetUpdateFormData = () => {
        setUpdateFormData({
            UpdatedSubject: "",
            UpdatedChapter: "",
            UpdatedTopic: "",
            UpdatedTitle: "",
            UpdatedDescription: ""
        });
    };

    return (
        <Layout title={"Study Material"}>
            <div className='contentArea'>
                <h3 className='bwFormHeadings'>Add Study Material</h3><br></br>
                <div className='CustomerDetailsFormContainer'>
                    <form onSubmit={handleSubmit}>
                        <div className='sameCustomerDetailsFormContainer'>
                            <div className='FormFieldContainer2'>
                                <label>Title: </label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Description: </label>
                                <input type="text" name="description" value={formData.description} onChange={handleChange} />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Subject: </label>
                                <select name="subject" value={formData.subject} onChange={handleChange}>
                                    <option value="">Select Subject</option>
                                    {subjects.map((subject) => (
                                        <option key={subject._id} value={subject._id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Chapters: </label>
                                <select
                                    name="chapter"
                                    value={formData.chapter}
                                    onChange={handleChange}
                                    disabled={!formData.subject}
                                >
                                    <option value="">Select Chapter</option>
                                    {filteredChapters.map((chapter) => (
                                        <option key={chapter._id} value={chapter._id}>
                                            {chapter.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Topics: </label>
                                <select
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    disabled={!formData.chapter}
                                >
                                    <option value="">Select Topic</option>
                                    {filteredTopics.map((topic) => (
                                        <option key={topic._id} value={topic._id}>
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>File </label>
                                <input type='file' name="file" onChange={handleFileChange} />
                            </div>
                        </div>
                        <button type='submit' className='btn'>Add Material</button>
                    </form>
                </div>
            </div>
            <h3 className='bwFormHeadings mt-5'>Manage Material</h3><br></br>
            <table className='UserTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Chapter</th>
                        <th>Topic</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((m) => (
                        <tr key={m._id}>
                            <td>{m._id}</td>
                            <td>{m.title}</td>
                            <td>{m.subject?.name}</td>
                            <td>{m.chapter?.name}</td>
                            <td>{m.topic?.name}</td>
                            <td className="actions">
                                <div onClick={() => {
                                    setopen(true);
                                    setUpdateFormData({
                                        UpdatedSubject: m.subject?._id,
                                        UpdatedChapter: m.chapter?._id,
                                        UpdatedTopic: m.topic?._id,
                                        UpdatedTitle: m.title,
                                        UpdatedDescription: m.description
                                    });
                                    setSelected(m);
                                }} className='actionBtn'>
                                    <FaRegEdit />
                                </div>
                                <div onClick={() => handleDelete(m._id)} className='actionTrashBtn'>
                                    <FaRegTrashCan />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, materials.length)} of {materials.length} entries, displaying &nbsp;
                    <select onChange={handleEntriesChange} value={entriesPerPage}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    Entries
                </div>
            </div>
            <Modal
                onCancel={() => {setopen(false); resetUpdateFormData();}}
                footer={null}
                open={open}
            >
                <div className='mb-3 mt-2'>
                    <h4 className="mb-4 text-center">Update Material</h4>
                    <form onSubmit={updateMaterials}>
                        <div className='sameCustomerDetailsFormContainer'>
                            <div className='FormFieldContainer2'>
                                <label>Title: </label>
                                <input type="text" name="UpdatedTitle" value={updateFormData.UpdatedTitle} onChange={handleUpdateChange} />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Description: </label>
                                <input type="text" name="UpdatedDescription" value={updateFormData.UpdatedDescription} onChange={handleUpdateChange} />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Subject: </label>
                                <select name="UpdatedSubject" value={updateFormData.UpdatedSubject} onChange={handleUpdateChange}>
                                    <option value="">Select Subject</option>
                                    {subjects.map((subject) => (
                                        <option key={subject._id} value={subject._id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Chapters: </label>
                                <select
                                    name="UpdatedChapter"
                                    value={updateFormData.UpdatedChapter}
                                    onChange={handleUpdateChange}
                                    disabled={!updateFormData.UpdatedSubject}
                                >
                                    <option value="">Select Chapter</option>
                                    {filteredChapters.map((chapter) => (
                                        <option key={chapter._id} value={chapter._id}>
                                            {chapter.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Topics: </label>
                                <select
                                    name="UpdatedTopic"
                                    value={updateFormData.UpdatedTopic}
                                    onChange={handleUpdateChange}
                                    disabled={!updateFormData.UpdatedChapter}
                                >
                                    <option value="">Select Topic</option>
                                    {filteredTopics.map((topic) => (
                                        <option key={topic._id} value={topic._id}>
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type='submit' className='btn'>Update Material</button>
                    </form>
                </div>
            </Modal>
        </Layout>
    );
};

export default StudyMaterial;