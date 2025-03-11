import React, { useState, useEffect } from "react";
import StudentLayout from '../../Components/StudentLayout';
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import '../../Styles/PageStyles/CategoryPage.css'
import { FaExternalLinkAlt } from "react-icons/fa";

const CategoryPage = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [openSubjects, setOpenSubjects] = useState({});
    const [openChapters, setOpenChapters] = useState({});

    const fetchCategoryBySlug = async () => {
        try {
            const categoryResponse = await axios.get(`http://localhost:5000/api/v1/category/get-category/${slug}`);
            setCategory(categoryResponse.data.category);
        } catch (err) {
            toast.error("Failed to fetch category data.");
            console.error("Fetch Error:", err);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchCategoryBySlug();
        }
    }, [slug]);

    if (!category) {
        return <StudentLayout title="Loading...">Loading...</StudentLayout>;
    }

    const toggleSubject = (subjectId) => {
        setOpenSubjects({ ...openSubjects, [subjectId]: !openSubjects[subjectId] });
    };

    const toggleChapter = (chapterId) => {
        setOpenChapters({ ...openChapters, [chapterId]: !openChapters[chapterId] });
    };

    const getTopicNavLink = (topic) => {
        if (category.contentType === "MCQs") {
            return `/student/topic/mcqs/${topic.slug}`;
        } else if (category.contentType === "Study Material") {
            return `/student/topic/study-material/${topic.slug}`;
        }
        return `/student/topic/${topic.slug}`; 
    };

    return (
        <StudentLayout title={category.name}>
            <div className="container">
                <div className="text-center mt-4 pb-3">
                    <h3 className="mb-2 bwFormHeadings">{category.name}</h3>
                    <p className="">{category.description}</p>
                </div>

                {category.subjects && category.subjects.map((subject) => (
                    <div key={subject._id} className="mt-4">
                        <div
                            className="contentArea d-flex justify-content-between align-items-center pointer"
                            onClick={() => toggleSubject(subject._id)}
                        >
                            <h5 className="TextBlue pointer">{subject.name}</h5>
                            <div className="d-flex align-items-center">
                                <span className="me-2">
                                    {category.chapters?.filter(chapter => chapter.subject._id === subject._id).length || 0} Chapters
                                </span>
                                <IoMdArrowDropdown className={openSubjects[subject._id] ? "rotate-180" : ""} />
                            </div>
                        </div>

                        <div className={`collapse subjectDropdown ${openSubjects[subject._id] ? "show" : ""}`}>
                            {category.chapters?.filter(chapter => chapter.subject._id === subject._id).map((chapter) => (
                                <div key={chapter._id} className="mt-3 ms-4">
                                    <div
                                        className="chapterNameContainer d-flex justify-content-between align-items-center cursor-pointer"
                                        onClick={() => toggleChapter(chapter._id)}
                                    >
                                        <h5 className="chapterName">{chapter.name}</h5>
                                        <div className="d-flex align-items-center">
                                            <span className="me-2">
                                                {category.topics?.filter(topic => topic.chapter._id === chapter._id).length || 0} Topics
                                            </span>
                                            <IoMdArrowDropdown className={openChapters[chapter._id] ? "rotate-180" : ""} />
                                        </div>
                                    </div>

                                    <div className={`ChapterDropdown collapse ${openChapters[chapter._id] ? "show" : ""}`}>
                                        {category.topics?.filter(topic => topic.chapter._id === chapter._id).map((topic) => (
                                            <div key={topic._id} className="mt-2 ms-4 ">
                                                <NavLink to={getTopicNavLink(topic)} className="NavLink pb-1">
                                                    <FaExternalLinkAlt className="navIcon" />&nbsp;&nbsp;
                                                    {topic.name}
                                                </NavLink>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </StudentLayout>
    );
};

export default CategoryPage;