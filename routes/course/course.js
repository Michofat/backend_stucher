import express from "express";
import {
  createCourse,
  deleteCourse,
  deleteCourseLessons,
  editCourseIntroVideo,
  getAllCourseLessonLinks,
  getAllCourses,
  getAllCourses2,
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
routes.get("/coursespaginated", getAllCourses2);

routes.patch("/publishcourse/:teacherid/:courseid", publishCourse);
routes.patch("/unpublishcourse/:teacherid/:courseid", unpublishCourse);
routes.patch("/monitizecourse/:teacherid/:courseid", monitizeCourse);
routes.get(`/searchcourses`, searchCourses);
routes.patch(
  `/editcourseintrovideo/:teacherid/:courseid`,
  editCourseIntroVideo
);
routes.get(`/courselessonlinks/:teacherid/:courseid`, getAllCourseLessonLinks);
routes.delete("/deletecourselessons/:courseid", deleteCourseLessons);

export default routes;
