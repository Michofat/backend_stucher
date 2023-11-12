import db from "../model/index.js";

let Enroll = db.enrollment;
let Course = db.course;

export const enrollFreeCourse = async (req, res, next) => {
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
        return res.status(404).send({
          message: "you cant freely enroll for a paid course",
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
        await Enroll.create(enrollcourse);
        return res.status(404).send({
          message: "You cant pay for free course",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

// export const enrollPaidCourse2 = async (req, res, next) => {
//   let { searcherid, courseid, teacherid } = req.params;
//   let { currency, amountpaid } = req.body;
//   let doesCourseExist = await Course.findOne({ where: { courseid } });

//   const enrollcourse = {
//     teacherid,
//     studentid: searcherid,
//     currency,
//     amountpaid,
//     status: 1,
//     courseid,
//   };
//   try {
//     if (!doesCourseExist) {
//       return res.status(404).send({
//         message: "course doesnt exist",
//       });
//     } else {
//       if (doesCourseExist.monitize === true) {
//         await Enroll.create(enrollcourse);
//         return res.status(200).send({
//           message: "course enrolled successfully",
//         });
//       } else {
//         await Enroll.create(enrollcourse);
//         return res.status(404).send({
//           message: "You cant pay for free course",
//         });
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const coursesEnrolled = async (req, res) => {};
