import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import videosRoute from "./routes/videos";
import photosRoute from "./routes/photos";
import linksRoute from "./routes/links";
import usersRoute from "./routes/users";
import activitiesRoute from "./routes/activities";
import feedbacksRoute from "./routes/feedbacks";
import workflowsRoute from "./routes/workflows";
import path from "path";
import helmet from "helmet";
const xssClean = require("xss-clean");
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import IUser from "./utils/interfaces";
import User from "./models/user";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(hpp());

app.use(xssClean());

app.use(
  mongoSanitize({
    replaceWith: "_",
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/videos", videosRoute);
app.use("/api/links", linksRoute);
app.use("/api/photos", photosRoute);
app.use("/api/workflows", workflowsRoute);
app.use("/api/users", usersRoute);
app.use("/api/activities", activitiesRoute);
app.use("/api/feedbacks", feedbacksRoute);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("connected");
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
