import express from "express";
import authRoutes from "./routes/auth/auth.js";
import testRoutes from "./routes/test/test.js";
import courseRoutes from "./routes/course/course.js";
import lessonRoutes from "./routes/lesson/lesson.js";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./error/error.js";

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
app.use("/mobile/v1/course", courseRoutes);
app.use("/mobile/v1/lesson", lessonRoutes);
app.use("/", testRoutes);

//error
app.use(errorHandler);

app.listen(6000, () => console.log(`server is running on port 8000`));

export default app;
