import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import axios from 'axios';
import { Modal, message } from 'antd';

const ManageMcqs = () => {
  const [mcqs, setMcqs] = useState([]);
  const [subjects, setSubjects] = useState([]); 
  const [chapters, setChapters] = useState([]); 
  const [topics, setTopics] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editingMcq, setEditingMcq] = useState(null);
  const [updatedData, setUpdatedData] = useState({ questionText: '', subject: '', chapter: '', topic: '' });
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);


  const handleUpdateSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setUpdatedData({ ...updatedData, subject: selectedSubject, chapter: '', topic: '' });

    // Filter chapters related to the selected subject
    const filteredChapters = chapters.filter(chapter => chapter.subject?._id === selectedSubject);
    setFilteredChapters(filteredChapters);
    setFilteredTopics([]); // Reset topics when subject changes
  };

  const handleUpdateChapterChange = (e) => {
    const selectedChapter = e.target.value;
    setUpdatedData({ ...updatedData, chapter: selectedChapter, topic: '' });

    // Filter topics related to the selected chapter
    const filteredTopics = topics.filter(topic => topic.chapter?._id === selectedChapter);
    setFilteredTopics(filteredTopics);
  };

  useEffect(() => {
    fetchMcqs();
    fetchSubjects(); 
    fetchChapters(); 
    fetchTopics(); 
  }, []);

  const fetchMcqs = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/mcqs/get-mcqs');
      setMcqs(data);
    } catch (error) {
      console.error('Error fetching MCQs:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/subject/get-subject');
      setSubjects(data.subject);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchChapters = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/chapter/get-chapters');
      setChapters(data.chapters);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/topic/get-topics');
      setTopics(data.topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/mcqs/delete-mcq/${id}`);
      message.success('MCQ deleted successfully');
      fetchMcqs();
    } catch (error) {
      message.error('Failed to delete MCQ');
    }
  };

  const Edit = (mcq) => {
    setEditingMcq(mcq);
    setUpdatedData({
      questionText: mcq.questionText,
      subject: mcq.subject?._id || '',
      chapter: mcq.chapter?._id || '',
      topic: mcq.topic?._id || ''
    });
    setOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/mcqs/update-mcq/${editingMcq._id}`, updatedData);
      message.success('MCQ updated successfully');
      setOpen(false);
      fetchMcqs();
    } catch (error) {
      message.error('Failed to update MCQ');
    }
  };

  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = mcqs.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(mcqs.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); 
};

  return (
    <Layout title="Manage MCQ's">
      <table className='UserTable mt-5'>
        <thead>
          <tr>
            <th>questionText</th>
            <th>Subject</th>
            <th>Chapter</th>
            <th>Topic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((mcq) => (
            <tr key={mcq._id}>
              <td>{mcq.questionText}</td>
              <td>{mcq.subject?.name || "No Subject"}</td>
              <td>{mcq.chapter?.name || "No Chapter"}</td>
              <td>{mcq.topic?.name || "No Topic"}</td>
              <td className="actions">
                <div onClick={() => Edit(mcq)} className='actionBtn'>
                  <FaRegEdit />
                </div>
                <div onClick={() => handleDelete(mcq._id)} className='actionTrashBtn'>
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

      {/* Update MCQ Modal */}
      <Modal
        title="Update MCQ"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <form onSubmit={handleUpdate}>
          <label>Question Text:</label>
          <input
            type="text"
            className="form-control"
            value={updatedData.questionText}
            onChange={(e) => setUpdatedData({ ...updatedData, questionText: e.target.value })}
          /><br />

          <label>Subject:</label>
          <select
            className="form-control"
            value={updatedData.subject}
            onChange={handleUpdateSubjectChange}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select><br />

          <label>Chapter:</label>
          <select
            className="form-control"
            value={updatedData.chapter}
            onChange={handleUpdateChapterChange}
            disabled={!updatedData.subject} // Disable if no subject is selected
          >
            <option value="">Select Chapter</option>
            {filteredChapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                {chapter.name}
              </option>
            ))}
          </select><br />

          <label>Topic:</label>
          <select
            className="form-control"
            value={updatedData.topic}
            onChange={(e) => setUpdatedData({ ...updatedData, topic: e.target.value })}
            disabled={!updatedData.chapter} // Disable if no chapter is selected
          >
            <option value="">Select Topic</option>
            {filteredTopics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.name}
              </option>
            ))}
          </select><br />

          <button type="submit" className="btn blue-btn">Update MCQ</button>
        </form>
      </Modal>
    </Layout>
  );
};

export default ManageMcqs;
