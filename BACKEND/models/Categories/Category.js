const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,

        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, shares: {
            type: Number,
            default: 0,
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }]

    },
    {timestamps: true,
     toJSON:{
        virtual:true
     },
        toObject: {
        virtual: true,
        }},
);
//convert schema to model
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
module.exports = Category;

