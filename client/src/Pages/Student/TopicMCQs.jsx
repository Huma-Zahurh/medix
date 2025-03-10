import React, { useState, useEffect } from 'react';
import StudentLayout from '../../Components/StudentLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../Styles/PageStyles/CategoryPage.css'

const TopicMCQs = () => {
    const { slug } = useParams();
    const [topic, setTopic] = useState(null);
    const [mcqs, setMcqs] = useState([]);

    useEffect(() => {
        const fetchTopicAndMcqs = async () => {
            try {
                const topicResponse = await axios.get(`http://localhost:5000/api/v1/topic/single-topic/${slug}`);
                const topicData = topicResponse.data.topic;
                setTopic(topicData);
                console.log(topicData);
                if (topicData.mcqs) {
                    const mcqPromises = topicData.mcqs.map(async (mcqId) => {
                        try {
                            const mcqResponse = await axios.get(`http://localhost:5000/api/v1/mcqs/single-mcq/${mcqId}`);
                            return mcqResponse.data.mcq;
                        } catch (mcqError) {
                            console.error(`Error fetching MCQ with ID ${mcqId}:`, mcqError);
                            return null;
                        }
                    });

                    const fetchedMcqs = (await Promise.all(mcqPromises)).filter(mcq => mcq !== null);
                    setMcqs(fetchedMcqs);
                }
            } catch (error) {
                toast.error("Failed to fetch topic or MCQs.");
                console.error('Error fetching topic or MCQs:', error);
            }
        };

        fetchTopicAndMcqs();
    }, [slug]);

    if (!topic) {
        return <StudentLayout title="Loading...">Loading topic data...</StudentLayout>;
    }

    return (
        <StudentLayout title={topic.name}>
            <div className="container mt-4">
                {/* <h2>{topic.name} MCQs</h2> */}
                {mcqs.map((mcq, index) => (
                    <div key={mcq._id} className=" mb-3">
                        <div className="">
                            <h5 className="">
                                {index + 1}. {mcq.questionText}
                            </h5>
                            <div className="row">
                                {mcq.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="col-auto">
                                        <p className="m-0">
                                            {String.fromCharCode(97 + optionIndex)}. {option}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-2">
                                <strong>Correct Answer:</strong> {mcq.answer}
                            </p>
                            <p className="mt-2">
                                <strong>Explanation:</strong> {mcq.explanation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </StudentLayout>
    );
};

export default TopicMCQs;