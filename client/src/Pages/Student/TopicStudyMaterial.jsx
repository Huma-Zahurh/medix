import React, { useState, useEffect } from 'react';
import StudentLayout from '../../Components/StudentLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../Styles/PageStyles/CategoryPage.css';

const TopicStudyMaterials = () => {
    const { slug } = useParams();
    const [topic, setTopic] = useState(null);
    const [studyMaterials, setStudyMaterials] = useState([]);

    useEffect(() => {
        const fetchTopicAndStudyMaterials = async () => {
            try {
                const topicResponse = await axios.get(`http://localhost:5000/api/v1/topic/single-topic/${slug}`);
                const topicData = topicResponse.data.topic;
                setTopic(topicData);
                if (topicData.studyMaterial) {
                    const studyMaterialPromises = topicData.studyMaterial.map(async (materialId) => {
                        try {
                            const materialResponse = await axios.get(`http://localhost:5000/api/v1/material/single-material/${materialId}`);
                            return materialResponse.data;
                        } catch (materialError) {
                            console.error(`Error fetching study material with ID ${materialId}:`, materialError);
                            return null;
                        }
                    });

                    const fetchedMaterials = (await Promise.all(studyMaterialPromises)).filter(material => material !== null);
                    setStudyMaterials(fetchedMaterials);
                }
            } catch (error) {
                toast.error("Failed to fetch topic or study materials.");
                console.error('Error fetching topic or study materials:', error);
            }
        };

        fetchTopicAndStudyMaterials();
    }, [slug]);

    if (!topic) {
        return <StudentLayout title="Loading...">Loading topic data...</StudentLayout>;
    }

    if (studyMaterials.length === 0) {
        return <StudentLayout title={`${topic.name} Materials`}>No Materials Found in this topic</StudentLayout>;
    }

    return (
        <StudentLayout title={`${topic.name} Study Materials`}>
            <div className="container mt-4">
                <div className="row">
                    {studyMaterials.map((material, index) => (
                        <div key={material._id} className="col-md-3 mb-4">
                            <div className="h-100">
                                <div className="contentArea d-flex flex-column">
                                    <h5 className=""><span className='indexNum'>{index + 1}.</span> {material.title}</h5>
                                    <p className="">{material.description}</p>
                                    <a href={material.file_url} target="_blank" rel="noopener noreferrer" className="btn mt-3">
                                        Open Material
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
};

export default TopicStudyMaterials;