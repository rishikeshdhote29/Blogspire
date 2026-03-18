const Category = require('../../models/Categories/Category');
const asyncHandler = require("express-async-handler");
const User = require("../../models/Users/User");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");


//@desc create new category
//@route POST /api/v1/categories/
//@access private
const saltRounds = 10;

exports.createCategory = asyncHandler(async (req, res, next) => {
	
	const {name} = req.body;
	const isAvailable = await Category.findOne({name});
	if (isAvailable) {
		throw new Error("Category already exists");
	}
	const category = await Category.create({name: name, author: req?.userAuth?._id});
	res.json({
		status: "success",
		message: "category created",
		category: category
	})
	
	
})


//@desc Find all  category
//@route GET /api/v1/categories/
//@access public
exports.getAllCategories = asyncHandler(async (req, res, next) => {
	const allCategories = await Category.find({}).populate({
		path:"posts",
		model:"Post",
		
	});
	
	res.status(201).json({
		status: "success",
		message: "all categories fetched succesfuly",
		 allCategories
		
	})
	
})


//@desc Delete single category
//@route DELETE /api/v1/categories/:id
//@access private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
	const catId = req.params.id;
	const deleteCategory = await Category.findByIdAndDelete(catId);
	res.status(200).json({
		status: "success",
		message: "category successfully deleted",
	})
	
})
//@desc update category
//@route PUT /api/v1/categories/
//@access private
exports.updateCategory = asyncHandler(async (req, res, next) => {
	const catId = req.params.id;
	const newName = req.body.name;
	const updatedCategory = await Category.findByIdAndUpdate(catId, {name: newName}, {new: true, runValidator: true});
	res.status(200).json({
		status: "success",
		message: "category successfully updated",
		category: updatedCategory
	})
	
})