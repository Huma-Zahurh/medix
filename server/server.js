const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./Config/db");
const authRoutes = require("./Routes/AuthRoutes");
const SubjectRoutes = require("./Routes/SubjectRoutes");
const ChapterRoutes = require("./Routes/ChapterRoutes");
const TopicRoutes = require("./Routes/TopicRoutes");
const McqRoutes = require("./Routes/McqRoutes");
const StudyMaterialRoutes = require("./Routes/StudyMaterialRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");
const SubscriptionRoutes = require("./Routes/SubscriptionRoutes");
 require('./Utils/SubscriptionExpiration');

// database config
connectDb();
// SubscriptionExpiration();

//rest object
const app = express();

//midwares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/subject", SubjectRoutes);
app.use("/api/v1/chapter", ChapterRoutes);
app.use("/api/v1/topic", TopicRoutes);
app.use("/api/v1/mcqs", McqRoutes);
app.use("/api/v1/material", StudyMaterialRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/subscription", SubscriptionRoutes);

//rest api
app.get("/", (req, res) => {
    res.send("<h1>first route is here</h1>");
  });
  
  //port
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server started successfully at port ${PORT}`);
  });