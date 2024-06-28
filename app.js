const express = require("express");
const userRouter = require("./routes/user.js");
const taskRouter = require("./routes/task.js");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/error.js");
const cors = require("cors");

const app = express();

config({
  path: "./data/config.env",
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice Working");
});

app.get(errorMiddleware);

module.exports = app;
