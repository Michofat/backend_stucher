import express from "express";
import {
  createCourse,
  deleteCourse,
  getTeachersCourse,
  updateCourse,
} from "../../controller/course.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createcourse", createCourse);
routes.patch("/updatecourse/:courseid/:teacherid", updateCourse);
routes.delete("/deletecourse/:courseid/:teacherid", deleteCourse);
routes.get("/getteachersCourse/:teacherid", getTeachersCourse);

export default routes;
