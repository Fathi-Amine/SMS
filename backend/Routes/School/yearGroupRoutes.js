const express = require("express");
const {
    createYearGroup,
    deleteYearGroup,
    getYearGroup,
    getYearGroups,
    updateYearGroup,
} = require("../../Controllers/School/yearGroupController");

const isAdminMiddleware = require("../../Middlewares/isAdminMiddleware");
const {authMiddleware} = require("../../Middlewares/authMiddleware");

const yearGroupRoutes = express.Router();

yearGroupRoutes
    .route("/")
    .post(authMiddleware, isAdminMiddleware, createYearGroup)
    .get(authMiddleware, isAdminMiddleware, getYearGroups);

yearGroupRoutes
    .route("/:id")
    .get(authMiddleware, isAdminMiddleware, getYearGroup)
    .put(authMiddleware, isAdminMiddleware, updateYearGroup)
    .delete(authMiddleware, isAdminMiddleware, deleteYearGroup);

module.exports = yearGroupRoutes;
