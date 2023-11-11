import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  getSingleTeachersCourse,
  getTeachersCourses,
  publishCourse,
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
routes.post("/publishcourse/:teacherid/:courseid", publishCourse);
routes.patch("/unpublishcourse/:teacherid/:courseid", unpublishCourse);

export default routes;
