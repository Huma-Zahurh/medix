const express = require('express');
const { requireSingIn, isAdmin } = require("../Middlewares/AuthMiddlewares");
const route = express.Router();
const {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
    assignSubscriptionToStudent,
    getStudentSubscriptions,
} = require('../Controllers/SubscriptionController');

// Create Subscription
route.post('/create-subscription', requireSingIn, isAdmin, createSubscription);

// Get All Subscriptions
route.get('/get-subscriptions', getAllSubscriptions);

// Get Subscription by ID
route.get('/get-subscription/:id', getSubscriptionById);

// Update Subscription
route.put('/update-subscription/:id', requireSingIn, isAdmin, updateSubscription);

// Delete Subscription
route.delete('/delete-subscription/:id', requireSingIn, isAdmin, deleteSubscription);

// Assign/Update Subscription to Student
route.post("/assign-subscription/:studentId", requireSingIn, isAdmin, assignSubscriptionToStudent);

// Get Student Subscriptions
route.get("/student-subscriptions/:studentId", requireSingIn, isAdmin, getStudentSubscriptions);

module.exports = route;