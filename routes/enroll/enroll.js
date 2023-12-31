import express from "express";
import {
  enrollFreeCourse,
  enrollPaidCourse,
  enrolledcourses,
  enrollstatus,
  getCoursesEnrolled,
} from "../../controller/enroll.js";
const routes = express.Router({
  mergeParams: true,
});

routes.post("/enroll/:searcherid/:courseid", enrollFreeCourse);
routes.post("/enrollpay/:searcherid/:courseid/:teacherid", enrollPaidCourse);
routes.get("/coursesenrolled/:studentid", getCoursesEnrolled);
routes.get("/enrollstatus/:studentid/:courseid", enrollstatus);
routes.get("/enrolledcourses/:studentid", enrolledcourses);

export default routes;
