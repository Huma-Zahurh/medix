import React, { useState, useEffect } from 'react';
import StudentLayout from '../../Components/StudentLayout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../Styles/PageStyles/CategoryPage.css';

const TopicMCQs = () => {
    const { slug } = useParams();
    const [topic, setTopic] = useState(null);
    const [mcqs, setMcqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [showNoMCQs, setShowNoMCQs] = useState(false); // Add no MCQs state

    useEffect(() => {
        const fetchTopicAndMcqs = async () => {
            try {
                const topicResponse = await axios.get(`http://localhost:5000/api/v1/topic/single-topic/${slug}`);
                const topicData = topicResponse.data.topic;
                setTopic(topicData);

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
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        };

        fetchTopicAndMcqs();
    }, [slug]);

    useEffect(() => {
        if (topic && mcqs.length === 0 && !isLoading) {
            const timeoutId = setTimeout(() => {
                setShowNoMCQs(true);
            }, 10000); // 10 seconds

            return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
        } else {
            setShowNoMCQs(false); // Reset if MCQs are present or loading
        }
    }, [topic, mcqs, isLoading]);

    if (isLoading) {
        return <StudentLayout title="Loading...">Loading topic data...</StudentLayout>;
    }

    if (!topic) {
        return <StudentLayout title="Error">Failed to load topic.</StudentLayout>;
    }

    if (showNoMCQs) {
        return <StudentLayout title={`${topic.name} MCQ's`}>No MCQ's Found in this topic</StudentLayout>;
    }

    return (
        <StudentLayout title={`${topic.name} MCQ's`}>
            <div className="container mt-2">
                {mcqs.map((mcq, index) => (
                    <div key={mcq._id} className="mb-3 contentArea">
                        <div className="">
                            <h5 className="">
                                <span className='indexNum'>{index + 1}.</span> {mcq.questionText}
                            </h5>
                            <div className="row pt-3 px-1">
                                {mcq.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="col-auto ">
                                        <p className="mr-5">
                                            <span className='indexNum'>{String.fromCharCode(97 + optionIndex)}.</span> {option}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-3">
                                <strong className='indexNum'>Correct Answer:</strong> {mcq.answer}
                            </p>
                            <p className="mt-2 pb-4">
                                <strong className='indexNum'>Explanation:</strong> {mcq.explanation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </StudentLayout>
    );
};

export default TopicMCQs;