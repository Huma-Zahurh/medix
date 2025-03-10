import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddMcqs = () => {
  const [subjects, setSubjects] = useState([]);
  const [allChapters, setAllChapters] = useState([]); 
  const [allTopics, setAllTopics] = useState([]); 
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);

  const [formData, setFormData] = useState({
    subject: "",
    chapter: "",
    topic: "",
    questionText: "",
    options: ["", "", "", "", ""],
    answer: "",
    explanation: "",
  });

  // Fetch all subjects, chapters, and topics on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectRes = await axios.get("http://localhost:5000/api/v1/subject/get-subject");
        const chapterRes = await axios.get("http://localhost:5000/api/v1/chapter/get-chapters");
        const topicRes = await axios.get("http://localhost:5000/api/v1/topic/get-topics");
           console.log(topicRes.data.topics);
        setSubjects(subjectRes.data.subject);
        setAllChapters(chapterRes.data.chapters);
        setAllTopics(topicRes.data.topics);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Filter chapters based on selected subject
  useEffect(() => {
    if (formData.subject) {
      const filtered = allChapters.filter(chapters => chapters.subject._id === formData.subject);
      setFilteredChapters(filtered);
      setFilteredTopics([]); // Reset topics when subject changes
    } else {
      setFilteredChapters([]);
      setFilteredTopics([]);
    }
    setFormData(prev => ({ ...prev, chapter: "", topic: "" })); // Reset selected values
  }, [formData.subject, allChapters]);

  // Filter topics based on selected chapter
  useEffect(() => {
    if (formData.chapter) {
      const filtered = allTopics.filter(topics => topics.chapter._id === formData.chapter);
      setFilteredTopics(filtered);
    } else {
      setFilteredTopics([]);
    }
    setFormData(prev => ({ ...prev, topic: "" })); // Reset selected topic
  }, [formData.chapter, allTopics]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Options Change
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/mcqs/create-mcq", formData);
      toast.success("MCQ added successfully!");
      setFormData({
        subject: "",
        chapter: "",
        topic: "",
        questionText: "",
        options: ["", "", "", "", ""],
        answer: "",
        explanation: "",
      });
    } catch (error) {
      console.error("Error adding MCQ", error);
      toast.error("Something went wrong ");
    }
  };

  return (
    <Layout title={"Add MCQ's"}>
      <div className="btnContain">
        <button className="btn">Import MCQ's</button>
        <button className="btn">Manage MCQ's</button>
      </div>
      <div className="contentArea">
        <h3 className="bwFormHeadings">Add MCQ's</h3>
        <br />

        <div className="CustomerDetailsFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="sameCustomerDetailsFormContainer">
              {/* Subject Selection */}
              <div className="FormFieldContainer2">
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

              {/* Chapter Selection */}
              <div className="FormFieldContainer2">
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

              {/* Topic Selection */}
              <div className="FormFieldContainer2">
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

            
            </div>

            {/* Question Input */}
            <div className="mcqQuestionFieldsContainer">
              <div className="FormFieldContainer2">
                <label>Question Text: </label>
                <input type="text" name="questionText" value={formData.questionText} onChange={handleChange} />
              </div>

              {/* Options Inputs */}
              {formData.options.map((option, index) => (
                <div key={index} className="FormFieldContainer2">
                  <label>{`Option ${index + 1}: `}</label>
                  <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                </div>
              ))}

              {/* Answer Input */}
              <div className="FormFieldContainer2">
                <label>Answer: </label>
                <input type="text" name="answer" value={formData.answer} onChange={handleChange} />
              </div>

              {/* Explanation Input */}
              <div className="FormFieldContainer2">
                <label>Explanation: </label>
                <textarea rows="2" name="explanation" value={formData.explanation} onChange={handleChange} />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn">
              Add MCQ
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddMcqs;
