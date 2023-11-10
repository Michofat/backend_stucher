import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getAnySingleCourse,
  getSingleTeachersCourse,
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
routes.get(
  "/getsingleteachersCourse/:courseid/:teacherid",
  getSingleTeachersCourse
);
routes.get("/getAnySinglecourse/:courseid", getAnySingleCourse);
routes.get("/getAllCourses", getAllCourses);

export default routes;
