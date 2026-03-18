const express= require("express");
const {createCategory, getAllCategories, deleteCategory, updateCategory}= require("../../controllers/Categories/categoryController");

const isLoggedIn = require("../../middlewares/isLoggedIn");
const categoriesRouter=express.Router();
// create category routes
categoriesRouter.post('/',isLoggedIn,createCategory);
categoriesRouter.get('/',getAllCategories);
categoriesRouter.delete('/:id',isLoggedIn,deleteCategory);

categoriesRouter.put('/:id',isLoggedIn,updateCategory);


module.exports=categoriesRouter;