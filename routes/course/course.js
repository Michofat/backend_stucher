import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  getSingleTeachersCourse,
  getTeachersCourse,
  updateCourse,
} from "../../controller/course.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createcourse/:teacherid", createCourse);
routes.patch("/updatecourse/:courseid/:teacherid", updateCourse);
routes.delete("/deletecourse/:courseid/:teacherid", deleteCourse);
routes.get("/getcourses/:teacherid", getTeachersCourse);
routes.get("/coursedetails/:courseid/:teacherid", getSingleTeachersCourse);
routes.get("/coursedetails/:courseid", getCourseDetails);
routes.get("/courses", getAllCourses);

export default routes;
