const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Load environment variables
const envFile = fs.existsSync(path.join(__dirname, ".env")) ? ".env" : "env";
dotenv.config({ path: path.join(__dirname, envFile) });

const cors = require("cors");
const {globalErrorHandler,notFoundHandler} = require("./middlewares/globalErrorHandler");
const userRouter = require("./routes/Users/userRouter");
const connectDB=require('./config/databse')
const categoriesRouter = require("./routes/Categories/categoriesRouter");
const postRouter = require("./routes/Posts/postRouter");
const commentRouter = require("./routes/Comments/commentRouter");
const sendEmail = require("./utils/sendEmail");
const aiRouter = require("./routes/ai/aiRouter");

// Create an express app
const app = express();
const serverStartedAt = Date.now();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Setup routes
app.use("/api/v1/users", userRouter);

app.use("/api/v1/categories", categoriesRouter);

app.use("/api/v1/posts", postRouter);

app.use("/api/v1/comments", commentRouter);
// ai routes

app.use("/api/v1/ai",aiRouter);
// Lightweight health endpoint for uptime checks and frontend status page.
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "blogspire-backend",
    uptimeSeconds: Math.floor((Date.now() - serverStartedAt) / 1000),
    timestamp: new Date().toISOString(),
  });
});
// establsiing coonection to mngoose
connectDB();
// setup up the  middle ware
app.use(express.json());




//Not found error handler
app.use(notFoundHandler);
//setuping global error handler
app.use(globalErrorHandler);
// Start server
const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
