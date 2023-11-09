import express from "express";
import authRoutes from "./routes/auth/auth.js";
import testRoutes from "./routes/test/test.js";

import cors from "cors";
import bodyParser from "body-parser";

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
app.use("/auth", authRoutes);
app.use("/", testRoutes);

app.listen(5000, () => console.log(`server is running on port 8000`));

export default app;
