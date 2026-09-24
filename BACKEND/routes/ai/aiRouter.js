const express= require('express');
const { suggestBlogTitles } = require('../../controllers/ai/aiControler');
const isLoggedIn = require("../../middlewares/isLoggedIn");

const aiRouter=express.Router();

aiRouter.post('/generate-titles', suggestBlogTitles);

module.exports = aiRouter;