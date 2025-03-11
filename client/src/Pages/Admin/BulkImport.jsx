import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import Layout from '../../Components/Layout';


const BulkImport = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Please select an Excel file.');
            return;
        }

        const formData = new FormData();
        formData.append('excelFile', selectedFile);

        setIsLoading(true); // Start loading

        try {
            const response = await axios.post('http://localhost:5000/api/v1/bulk-import/import-excel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(response.data.message);
            setSelectedFile(null); // Clear selected file after successful upload
        } catch (error) {
            console.error('Upload Error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to upload file. Please try again.');
            }
        } finally {
            setIsLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <Layout>
        <div className="container mt-4">
            <h2>Bulk Import System</h2>
            <div className="mb-3">
                <label htmlFor="excelFile" className="form-label">Select Excel File:</label>
                <input
                    type="file"
                    className="form-control"
                    id="excelFile"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? 'Uploading...' : 'Upload Excel'}
            </button>
        </div>
        </Layout>
    );
};

export default BulkImport;