import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  getSingleTeachersCourse,
  getTeachersCourses,
  monitizeCourse,
  publishCourse,
  searchCourses,
  unpublishCourse,
  updateCourse,
} from "../../controller/course.js";

const routes = express.Router({
  mergeParams: true,
});

routes.post("/createcourse/:teacherid", createCourse);
routes.patch("/updatecourse/:courseid/:teacherid", updateCourse);
routes.delete("/deletecourse/:courseid/:teacherid", deleteCourse);
routes.get("/getcourses/:teacherid", getTeachersCourses);
//routes.get("/coursedetails/:courseid/:teacherid", getSingleTeachersCourse);
routes.get("/coursedetails/:courseid", getCourseDetails);
routes.get("/courses", getAllCourses);
routes.patch("/publishcourse/:teacherid/:courseid", publishCourse);
routes.patch("/unpublishcourse/:teacherid/:courseid", unpublishCourse);
routes.patch("/monitizecourse/:teacherid/:courseid", monitizeCourse);
routes.get(`/searchcourses`, searchCourses);

export default routes;
