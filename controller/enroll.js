import db from "../model/index.js";

let Enroll = db.enrollment;
let Course = db.course;
let User = db.user;

export const enrollFreeCourse = async (req, res, next) => {
  let { searcherid, courseid } = req.params;
  console.log(searcherid, courseid);
  let { currency, amountpaid } = req.body;
  let doesCourseExist = await Course.findOne({ where: { courseid } });
  console.log(doesCourseExist);
  const enrollcourse = {
    studentid: searcherid,
    currency,
    amountpaid,
    status: 1,
    courseid,
  };
  try {
    if (!doesCourseExist) {
      return res.status(404).send({
        message: "course doesnt exist",
      });
    } else {
      const isAlreadyEnrolled = await Enroll.findOne({
        where: { studentid: searcherid, courseid },
      });

      if (isAlreadyEnrolled) {
        return res.status(400).send({
          message: "You have already enrolled in this course.",
        });
      }

      if (doesCourseExist.monitize === true) {
        return res.status(404).send({
          message: "you cant freely enroll for a paid course",
        });
      }
      if (doesCourseExist.teacherid === searcherid) {
        return res.status(404).send({
          message: "you cant  enroll for your  course",
        });
      } else if (
        doesCourseExist.published === false ||
        doesCourseExist.status === false
      ) {
        return res.status(404).send({
          message:
            "you cant enroll for a course that has not been published or activated",
        });
      } else {
        await Enroll.create(enrollcourse);
        return res.status(200).send({
          message: "course enrolled successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const enrollPaidCourse = async (req, res, next) => {
  let { searcherid, courseid, teacherid } = req.params;
  let { currency, amountpaid } = req.body;
  let doesCourseExist = await Course.findOne({ where: { courseid } });
  const enrollcourse = {
    teacherid,
    studentid: searcherid,
    currency,
    amountpaid,
    status: 1,
    courseid,
  };
  try {
    if (!doesCourseExist) {
      return res.status(404).send({
        message: "course doesnt exist",
      });
    } else {
      const isAlreadyEnrolled = await Enroll.findOne({
        where: { studentid: searcherid, courseid },
      });

      if (isAlreadyEnrolled) {
        return res.status(400).send({
          message: "You are already enrolled in this course.",
        });
      }

      if (doesCourseExist.monitize === true) {
        await Enroll.create(enrollcourse);
        return res.status(200).send({
          message: "course enrolled successfully",
        });
      } else if (
        doesCourseExist.published === false ||
        doesCourseExist.status === false
      ) {
        return res.status(404).send({
          message:
            "you cant enroll for a course that has not been published or activated",
        });
      } else {
        return res.status(404).send({
          message: "You cant pay for free course",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getCoursesEnrolled = async (req, res) => {
  let { studentid } = req.params;
  let enrolled = await Enroll.findAll({
    where: { studentid },
    include: [
      {
        model: Course,
        as: "enroledcourse",
        attributes: ["title"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["firstname", "surname", "profilepicture"],
          },
        ],
      },
    ],
  });
  try {
    res.status(200).send(enrolled);
  } catch (error) {}
};

export const enrollstatus = async (req, res, next) => {
  let { studentid, courseid } = req.params;
  console.log(studentid, courseid);
  try {
    let enrollstatus = await Enroll.findOne({
      where: { studentid, courseid },
    });
    if (!enrollstatus) {
      return res.status(200).send({ enrollstatus: false });
    }
    if (enrollstatus.status === 0) {
      return res.status(200).send({ enrollstatus: false });
    } else if (enrollstatus.status === 1) {
      return res.status(200).send({ enrollstatus: true });
    } else {
      return res.status(200).send({ enrollstatus: "completed" });
    }
  } catch (error) {
    next(error);
  }
};

export const enrolledcourses = async (req, res, next) => {
  let { studentid } = req.params;
  try {
    let enrolledcourses = await Enroll.findAll({
      where: { studentid, status: 1 },
    });
    return res.status(200).send(enrolledcourses);
  } catch (error) {
    next(error);
  }
};

//get my enrolled courses -studentid

//lesson log table
//on continue button studentid, courseid will be sent..
