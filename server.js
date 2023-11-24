import express from "express";
import authRoutes from "./routes/auth/auth.js";
import testRoutes from "./routes/test/test.js";
import courseRoutes from "./routes/course/course.js";
import lessonRoutes from "./routes/lesson/lesson.js";
import quizRoutes from "./routes/quiz/quiz.js";
import enrollRoutes from "./routes/enroll/enroll.js";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./error/error.js";
import dotenv from "dotenv";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

let PORT = process.env.PORT;

//routes
app.use("/mobile/v1", authRoutes);
app.use("/mobile/v1", courseRoutes);
app.use("/mobile/v1", lessonRoutes);
app.use("/mobile/v1", quizRoutes);
app.use("/mobile/v1", enrollRoutes);
app.use("/", testRoutes);

//error
app.use(errorHandler);

app.listen(7000, () => console.log(`server is running on port 7000`));

export default app;
