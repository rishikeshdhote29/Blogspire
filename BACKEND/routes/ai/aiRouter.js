const express= require('express');
const { suggestBlogTitles, postSummary} = require('../../controllers/ai/aiControler');
const isLoggedIn = require("../../middlewares/isLoggedIn");

const aiRouter=express.Router();


aiRouter.post('/generate-titles', suggestBlogTitles);
aiRouter.get('/generate-summary/:id', postSummary);

module.exports = aiRouter;


