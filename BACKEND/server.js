const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {globalErrorHandler,notFoundHnadler} = require("./middlewares/globalerrorHandler");
const userRouter = require("./routes/Users/userRouter");
const connectDB=require('./config/databse')
const categoriesRouter = require("./routes/Categories/categoriesRouter");
const postRouter = require("./routes/Posts/postRouter");
const commentRouter = require("./routes/Comments/commentRouter");
const sendEmail = require("./utils/sendEmail");
// Load environment variables
dotenv.config();

// Create an express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Setup routes
app.use("/api/v1/users/", userRouter);

app.use("/api/v1/categories", categoriesRouter);

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/comments", commentRouter);
// establsiing coonection to mngoose
connectDB();
// setup up the  middle ware
app.use(express.json());




//Not found error handler
app.use(notFoundHnadler);
//setuping global error handler
app.use(globalErrorHandler);
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
