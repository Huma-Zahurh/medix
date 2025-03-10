import React, { useState, useEffect } from 'react';
import '../../Styles/PageStyles/CreateCategory.css';
import Layout from '../../Components/Layout';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import Modal from 'antd/es/modal/Modal';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contentType, setContentType] = useState('MCQs');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedChapters, setSelectedChapters] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [topics, setTopics] = useState([]);
    const [category, setCategory] = useState([]);
    const [open, setOpen] = useState(false);
    const [filteredChapters, setFilteredChapters] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [visibility, setVisibility] = useState('Free');
    const [status, setStatus] = useState('Published');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [updateName, setUpdateName] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateContentType, setUpdateContentType] = useState('MCQs');
    const [updateSelectedSubjects, setUpdateSelectedSubjects] = useState([]);
    const [updateSelectedChapters, setUpdateSelectedChapters] = useState([]);
    const [updateSelectedTopics, setUpdateSelectedTopics] = useState([]);
    const [updateVisibility, setUpdateVisibility] = useState('Free');
    const [updateStatus, setUpdateStatus] = useState('Published');

    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Pagination logic
    const indexOfLastUser = currentPage * entriesPerPage;
    const indexOfFirstUser = indexOfLastUser - entriesPerPage;
    const currentUsers = category.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(category.length / entriesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/v1/subject/get-subject');
                if (data.success) {
                    setSubjects(data.subject);
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        const fetchChapters = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/v1/chapter/get-chapters');
                if (data.success) {
                    setChapters(data.chapters);
                }
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };

        const fetchTopics = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/v1/topic/get-topics');
                if (data.success) {
                    setTopics(data.topics);
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchSubjects();
        fetchChapters();
        fetchTopics();
        getAllCategories();
    }, []);

    useEffect(() => {
        if (selectedSubjects.length > 0) {
            const filtered = chapters.filter((chapter) =>
                selectedSubjects.includes(chapter.subject._id)
            );
            setFilteredChapters(filtered);
            setFilteredTopics([]);
            setSelectedChapters([]);
            setSelectedTopics([]);
        } else {
            setFilteredChapters([]);
            setFilteredTopics([]);
            setSelectedChapters([]);
            setSelectedTopics([]);
        }
    }, [selectedSubjects, chapters]);

    useEffect(() => {
        if (selectedChapters.length > 0) {
            const filtered = topics.filter((topic) =>
                selectedChapters.includes(topic.chapter._id)
            );
            setFilteredTopics(filtered);
            setSelectedTopics([]);
        } else {
            setFilteredTopics([]);
            setSelectedTopics([]);
        }
    }, [selectedChapters, topics]);

    // Create Category
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/category/create-category', {
                name,
                description,
                contentType,
                subjects: selectedSubjects,
                chapters: selectedChapters,
                topics: selectedTopics,
                visibility,
                status,
            });

            if (data.success) {
                toast.success('Category created successfully');
                setName('');
                setDescription('');
                setSelectedSubjects([]);
                setSelectedChapters([]);
                setSelectedTopics([]);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Failed to create category');
        }
    };

    // Get all Categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/v1/category/get-categories');
            if (data?.success) {
                setCategory(data.categories);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong in getting Categories');
        }
    };

    // Delete Category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:5000/api/v1/category/delete-category/${id}`
            );
            if (data.success) {
                toast.success(`Category is deleted`);
                await getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:5000/api/v1/category/update-category/${selectedCategory._id}`, {
                name: updateName,
                description: updateDescription,
                contentType: updateContentType,
                subjects: updateSelectedSubjects,
                chapters: updateSelectedChapters,
                topics: updateSelectedTopics,
                visibility: updateVisibility,
                status: updateStatus,
            });

            if (data.success) {
                toast.success('Category updated successfully');
                setOpen(false);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Failed to update category');
        }
    };

    const handleEdit = (category) => {
      setSelectedCategory(category);
      setUpdateName(category.name);
      setUpdateDescription(category.description);
      setUpdateContentType(category.contentType);
      setUpdateSelectedSubjects(category.subjects.map(s => s._id));
      setUpdateSelectedChapters(category.chapters.map(c => c._id));
      setUpdateSelectedTopics(category.topics.map(t => t._id));
      setUpdateVisibility(category.visibility);
      setUpdateStatus(category.status);

      // Update filtered chapters and topics immediately
      const filteredChapters = chapters.filter((chapter) =>
          category.subjects.some(s => s._id === chapter.subject._id)
      );
      setFilteredChapters(filteredChapters);

      const filteredTopics = topics.filter((topic) =>
          category.chapters.some(c => c._id === topic.chapter._id)
      );
      setFilteredTopics(filteredTopics);

      setOpen(true);
  };
    return (
      <Layout title={'Categories'}>
          {/* */}
          <div className="contentArea">
              <h3 className="bwFormHeadings">Add Category</h3>
              <br />

              <div className="CustomerDetailsFormContainer">
                  <form onSubmit={handleCreateCategory}>
                      <div className="sameCustomerDetailsFormContainer">
                          <div className="FormFieldContainer2">
                              <label>Title: </label>
                              <input className="" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                          </div>
                          <div className="FormFieldContainer2">
                              <label>Description: </label>
                              <textarea rows={'1'} className="" value={description} onChange={(e) => setDescription(e.target.value)} />
                          </div>
                          <div className="FormFieldContainer2">
                              <label>Content Type: </label>
                              <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                                  <option value={'MCQs'}>MCQs</option>
                                  <option value={'Study Material'}>Study Material</option>
                              </select>
                          </div>
                          <div className="FormFieldContainer2">
                              <label>Subject: </label>
                              <select multiple value={selectedSubjects} onChange={(e) => setSelectedSubjects(Array.from(e.target.selectedOptions, (option) => option.value))}>
                                  {subjects.map((subject) => (
                                      <option key={subject._id} value={subject._id}>
                                          {subject.name}
                                      </option>
                                  ))}
                              </select>
                          </div>
                          <div className="FormFieldContainer2">
                              <label>Chapters: </label>
                              <select multiple value={selectedChapters} onChange={(e) => setSelectedChapters(Array.from(e.target.selectedOptions, (option) => option.value))} disabled={selectedSubjects.length === 0} >
                                  {filteredChapters.map((chapter) => (
                                      <option key={chapter._id} value={chapter._id}>
                                          {chapter.name}
                                      </option>
                                  ))}
                              </select>
                          </div>
                          <div className="FormFieldContainer2">
                              <label>Topics: </label>
                              <select multiple value={selectedTopics} onChange={(e) => setSelectedTopics(Array.from(e.target.selectedOptions, (option) => option.value))} disabled={selectedChapters.length === 0}>
                                  {filteredTopics.map((topic) => (
                                      <option key={topic._id} value={topic._id}>
                                          {topic.name}
                                      </option>
                                  ))}
                              </select>
                          </div>
                      </div>
                      <button type="submit" className="btn">
                          Add Category</button>
                  </form>
              </div>
          </div>
          {/* =================== */}

          {/* Users Table */}
          <h3 className='bwFormHeadings mt-5'>Manage Categories</h3><br></br>
          <table className='UserTable'>
              <thead>
                  <tr>
                      <th>Category Name</th>
                      <th>Content Type</th>
                      <th>Subjects</th>
                      <th>Chapters</th>
                      <th>Topics</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {currentUsers.map((c) => (
                      <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>{c.contentType}</td>
                          <td>{c.subjects.map((s) => (<div key={s._id}>{s.name}</div>))}</td>
                          <td>{c.chapters.map((ch) => (<div key={ch._id}>{ch.name}</div>))}</td>
                          <td>{c.topics.map((t) => (<div key={t._id}>{t.name}</div>))}</td>
                          <td className="actions">
                              {/* Link to Edit Page */}
                              <div className='actionBtn' onClick={() => handleEdit(c)}>
                                  <FaRegEdit />
                              </div>

                              {/* Link to Delete Action */}
                              <div onClick={() => handleDelete(c._id)} className='actionTrashBtn'>
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
                  Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, category.length)} of {category.length} entries, displaying &nbsp;
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
                onCancel={() => setOpen(false)}
                footer={null}
                open={open}
            >
                {selectedCategory && (
                    <form onSubmit={handleUpdateCategory}>
                        <div className="sameCustomerDetailsFormContainer">
                            <div className="FormFieldContainer2">
                                <label>Title: </label>
                                <input className="" type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                            </div>
                            <div className="FormFieldContainer2">
                                <label>Description: </label>
                                <textarea rows={'1'} className="" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                            </div>
                            <div className="FormFieldContainer2">
                                <label>Content Type: </label>
                                <select value={updateContentType} onChange={(e) => setUpdateContentType(e.target.value)}>
                                    <option value={'MCQs'}>MCQs</option>
                                    <option value={'Study Material'}>Study Material</option>
                                </select>
                            </div>
                            <div className="FormFieldContainer2">
                                <label>Subject: </label>
                                <select multiple value={updateSelectedSubjects} onChange={(e) => setUpdateSelectedSubjects(Array.from(e.target.selectedOptions, (option) => option.value))}>
                                    {subjects.map((subject) => (
                                        <option key={subject._id} value={subject._id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="FormFieldContainer2">
                                <label>Chapters: </label>
                                <select multiple value={updateSelectedChapters} onChange={(e) => setUpdateSelectedChapters(Array.from(e.target.selectedOptions, (option) => option.value))} disabled={updateSelectedSubjects.length === 0}>
                                    {filteredChapters.map((chapter) => (
                                        <option key={chapter._id} value={chapter._id}>
                                            {chapter.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="FormFieldContainer2">
                                <label>Topics: </label>
                                <select multiple value={updateSelectedTopics} onChange={(e) => setUpdateSelectedTopics(Array.from(e.target.selectedOptions, (option) => option.value))} disabled={updateSelectedChapters.length === 0}>
                                    {filteredTopics.map((topic) => (
                                        <option key={topic._id} value={topic._id}>
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn">Update Category</button>
                    </form>
                )}
            </Modal>

        </Layout>
    )
}

export default CreateCategory