import express from "express";
import { enrollFreeCourse, enrollPaidCourse } from "../../controller/enroll.js";
const routes = express.Router({
  mergeParams: true,
});

routes.post("/enroll/:searcherid/:courseid/:teacherid", enrollFreeCourse);
routes.post("/enrollpay/:searcherid/:courseid/:teacherid", enrollPaidCourse);
//routes.get("/coursesenrolled/:studentid/:courseid/:courseid", coursesEnrolled);

export default routes;
