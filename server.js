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
import e from "express";

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

//routes
app.use("/mobile/v1", authRoutes);
app.use("/mobile/v1", courseRoutes);
app.use("/mobile/v1", lessonRoutes);
app.use("/mobile/v1", quizRoutes);
app.use("/mobile/v1", enrollRoutes);
app.use("/", testRoutes);

//error
app.use(errorHandler);

app.listen(7000, () => console.log(`server is running on port 6000`));

export default app;
function missingNumber(nums) {
  const n = nums.length;
  const result = [];
  for (let i = 0; i <= n; i++) {
    result.push(i);
  }
  return result;
}

const nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
console.log(missingNumber(nums));
