import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../Components/Layout'
import { toast } from "react-hot-toast";

const BannerUpload = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append('bannerImage', selectedImage);

        try {
            await axios.post('http://localhost:5000/api/v1/banner/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success("Banner uploaded successfully!");
            setPreviewImage(null);
            setSelectedImage(null);
        } catch (error) {
            console.error('Upload Error:', error);;
            toast.error("Failed to upload banner.");
        }
    };

  return (
    <Layout title={"Banner Upload"}>
       <div className="container mt-4"> 
            <div className="mb-3">
                <label htmlFor="bannerUpload" className="form-label">Upload Banner Image</label>
                <input
                    className="form-control"
                    type="file"
                    id="bannerUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            {previewImage && (
                <div className="mb-3">
                    <img
                        src={previewImage}
                        alt="Banner Preview"
                        className="img-fluid rounded" // Make image responsive and rounded
                        style={{ maxWidth: '300px' }}
                    />
                </div>
            )}
            <button className="btn btn-primary" onClick={handleUpload}>
                Upload Banner
            </button>
        </div>
    </Layout>
  )
}

export default BannerUpload
