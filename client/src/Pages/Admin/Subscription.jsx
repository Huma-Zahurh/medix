import React, { useState, useEffect } from 'react';
import '../../Styles/PageStyles/CreateCategory.css';
import Layout from '../../Components/Layout';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { Modal } from "antd";

const Subscription = () => {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState(0);
    const [durationUnit, setDurationUnit] = useState("days");
    const [categoryValue, setCategoryValue] = useState([]);
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedDuration, setUpdatedDuration] = useState(0);
    const [updatedDurationUnit, setUpdatedDurationUnit] = useState("days");
    const [updatedCategoryValue, setUpdatedCategoryValue] = useState([]);
    const [updatedPrice, setUpdatedPrice] = useState(0);
    const [updatedIsDefault, setUpdatedIsDefault] = useState(false);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Pagination logic
    const indexOfLastUser = currentPage * entriesPerPage;
    const indexOfFirstUser = indexOfLastUser - entriesPerPage;
    const currentUsers = subscriptions.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(subscriptions.length / entriesPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    // Create Subscription
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/v1/subscription/create-subscription", {
                name,
                duration,
                durationUnit,
                categories: categoryValue,
                price,
                isDefault,
                description,
            });
            if (data?.success) {
                toast.success(`${name} is successfully created`);
                setName("");
                setDuration(0);
                setDurationUnit("days");
                setCategoryValue([]);
                setPrice(0);
                setIsDefault(false);
                setDescription("");
                await getAllSubscriptions();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong in input form");
        }
    };

    // Get all Categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/category/get-categories");
            if (data?.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            toast.error("Something went wrong in getting categories");
        }
    };

    // Get all Subscriptions
    const getAllSubscriptions = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/subscription/get-subscriptions");
            if (data?.success) {
                setSubscriptions(data.subscriptions);
            }
        } catch (error) {
            toast.error("Something went wrong in getting subscriptions");
        }
    };

    useEffect(() => {
        getAllCategories();
        getAllSubscriptions();
    }, []);

    // Update Subscription
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selected) return toast.error("No subscription selected");
        try {
            const { data } = await axios.put(
                `http://localhost:5000/api/v1/subscription/update-subscription/${selected._id}`,
                {
                    name: updatedName,
                    duration: updatedDuration,
                    durationUnit: updatedDurationUnit,
                    categories: updatedCategoryValue,
                    price: updatedPrice,
                    isDefault: updatedIsDefault,
                    description: updatedDescription,
                }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setUpdatedDuration(0);
                setUpdatedDurationUnit("days");
                setUpdatedCategoryValue([]);
                setUpdatedPrice(0);
                setUpdatedIsDefault(false);
                setOpen(false);
                await getAllSubscriptions();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while updating subscription");
        }
    };

    // Delete Subscription
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/v1/subscription/delete-subscription/${id}`);
            if (data.success) {
                toast.success("Subscription is deleted");
                await getAllSubscriptions();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Subscription"}>
            <div className='contentArea'>
                <h3 className='bwFormHeadings'>Add Subscriptions</h3><br />
                <div className='CustomerDetailsFormContainer'>
                    <form onSubmit={handleSubmit}>
                        <div className='sameCustomerDetailsFormContainer'>
                            <div className='FormFieldContainer2'>
                                <label>Name: </label>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Duration: </label>
                                <input type='number' value={duration} onChange={(e) => setDuration(Number(e.target.value))} required />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Duration Unit: </label>
                                <select value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)} required>
                                    <option value="days">Days</option>
                                    <option value="months">Months</option>
                                </select>
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Select Categories: </label>
                                <select multiple value={categoryValue} onChange={(e) => setCategoryValue(Array.from(e.target.selectedOptions, option => option.value))} required>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Price: </label>
                                <input type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Is Default: </label>
                                <input type='checkbox' checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
                            </div>
                            <div className='FormFieldContainer2'>
                                <label>Description: </label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <button type='submit' className='btn'>Add Subscription</button>
                    </form>
                </div>
            </div>

            <h3 className='bwFormHeadings mt-5'>Manage Subscriptions</h3><br />
            <table className='UserTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Duration Unit</th>
                        <th>Categories</th>
                        <th>Price</th>
                        <th>Is Default</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((sub) => (
                        <tr key={sub._id}>
                            <td>{sub._id}</td>
                            <td>{sub.name}</td>
                            <td>{sub.duration}</td>
                            <td>{sub.durationUnit}</td>
                            <td>{sub.categories?.map(cat => <div key={cat._id}>{cat.name}</div>)}</td>
                            <td>{sub.price}</td>
                            <td>{sub.isDefault ? "Yes" : "No"}</td>
                            <td className="actions">
                                <div onClick={() => {
                                    setOpen(true);
                                    setUpdatedName(sub.name);
                                    setUpdatedDuration(sub.duration);
                                    setUpdatedDurationUnit(sub.durationUnit);
                                    setUpdatedCategoryValue(sub.categories?.map(cat => cat._id) || []);
                                    setUpdatedPrice(sub.price);
                                    setUpdatedIsDefault(sub.isDefault);
                                    setSelected(sub);
                                }} className='actionBtn'>
                                    <FaRegEdit />
                                </div>
                                <div onClick={() => handleDelete(sub._id)} className='actionTrashBtn'>
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
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, subscriptions.length)} of {subscriptions.length} entries, displaying &nbsp;
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
                <form onSubmit={handleUpdate}>
                    <div className="mb-3 mt-2">
                        <h4 className="mb-4 text-center">Update Subscription</h4>
                        <label>Name: </label>
                        <input type="text" className="form-control" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} /><br></br>
                        <label>Duration: </label>
                        <input type="number" className="form-control" value={updatedDuration} onChange={(e) => setUpdatedDuration(Number(e.target.value))} /><br></br>
                        <label>Duration Unit: </label>
                        <select value={updatedDurationUnit} onChange={(e) => setUpdatedDurationUnit(e.target.value)} className="form-control">
                            <option value="days">Days</option>
                            <option value="months">Months</option>
                        </select><br></br>
                        <label>Select Categories: </label>
                        <select multiple value={updatedCategoryValue} onChange={(e) => setUpdatedCategoryValue(Array.from(e.target.selectedOptions, option => option.value))} className="form-control">
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select><br></br>
                        <label>Price: </label>
                        <input type="number" className="form-control" value={updatedPrice} onChange={(e) => setUpdatedPrice(Number(e.target.value))} /><br></br>
                        <label>Is Default: </label>
                        <input type="checkbox" checked={updatedIsDefault} onChange={(e) => setUpdatedIsDefault(e.target.checked)} /><br></br>
                        <label>Description: </label>
                        <textarea className="form-control" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />

                    </div>
                    <div className="mb-3 ">
                        <button type="submit" className="btn blue-btn ">
                            Update Subscription
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default Subscription;