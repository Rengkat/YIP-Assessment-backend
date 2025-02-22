const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
dotenv.config();

const customerRoute = require("./routes/customerRoute");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: "https://yip-assessment-frontend.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/customers", customerRoute);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Database connection and start server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
