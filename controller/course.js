import { Op } from "sequelize";
import db from "../model/index.js";
const Course = db.course;
const User = db.user;
const Lesson = db.lesson;
const Enroll = db.enrollment;

export const createCourse = async (req, res, next) => {
  let { teacherid } = req.params;
  let { title, description, coursecode, introductoryvideolink, courseimage } =
    req.body;
  const courses = {
    teacherid,
    title,
    description,
    coursecode,
    introductoryvideolink,
    courseimage,
  };
  try {
    let results = await Course.create(courses);
    console.log(results);
    return res.status(201).send({
      id: results.courseid,
      title: results.title,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  let { courseid, teacherid } = req.params;
  const doesCourseExist = await Course.findOne({
    where: {
      courseid,
      teacherid,
    },
  });
  let {
    title,
    description,
    videolink,
    imagelink,
    introductoryvideolink,
    courseimage,
    monitize,
  } = req.body;
  const courseupdates = {
    title,
    description,
    videolink,
    imagelink,
    introductoryvideolink,
    courseimage,
    monitize,
  };
  try {
    if (doesCourseExist) {
      await Course.update(courseupdates, { where: { courseid, teacherid } });
    } else {
      return res.status(404).send({
        message: "error updating resources",
      });
    }
    return res.status(200).send({
      message: "course updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  let { courseid, teacherid } = req.params;
  const doesCourseExist = await Course.findOne({
    where: {
      courseid,
      teacherid,
    },
  });
  try {
    const update = {
      status: false,
    };
    if (doesCourseExist) {
      await Course.update(update, {
        where: {
          courseid,
          teacherid,
        },
      });
    } else {
      return res.status(404).send({
        message: "error deleting resources",
      });
    }

    return res.status(200).send({
      message: "course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// export const getTeachersCourses = async (req, res) => {
//   let { teacherid } = req.params;
//   let doesUserExist = await User.findOne({
//     where: { userid: teacherid },
//   });
//   try {
//     if (!doesUserExist) {
//       res.status(404).send({ message: "user doesnt exist" });
//     }
//     const courses = await Course.findAll({
//       where: {
//         teacherid,
//       },
//       include: [
//         {
//           model: User,
//           as: "user",
//           attibutes: ["id"],
//         },
//         {
//           model: Lesson,
//           as: "lesson",
//         },
//       ],
//     });
//     res.status(200).send(courses);
//   } catch (error) {}
// };

export const getSingleTeachersCourse = async (req, res) => {
  let { courseid, teacherid } = req.params;
  let doesExist = await Course.findOne({
    where: { teacherid, courseid },
  });
  try {
    if (!doesExist) {
      res.status(404).send({ message: "doesnt exist" });
    } else if (doesExist.status === false) {
      res.status(404).send({ message: "course has been unpublished" });
    }
    const courses = await Course.findOne({
      where: {
        teacherid,
        courseid,
        published: true,
        status: true,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userid", "firstname", "surname"],
        },
        {
          model: Enroll,
          as: "enrollments",
          attributes: ["enrollmentid", "courseid", "studentid"],
        },
      ],
    });
    res.status(200).send(courses);
  } catch (error) {}
};

export const getCourseDetails = async (req, res) => {
  let { courseid } = req.params;
  let doesExist = await Course.findOne({
    where: { courseid },
  });
  try {
    if (!doesExist) {
      res.status(404).send({ message: "course doesnt exist" });
    } else if (doesExist.status === false) {
      res
        .status(404)
        .send({ message: "cant view course that has been unpublished" });
    }
    const course = await Course.findOne({
      where: {
        courseid,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userid", "firstname", "surname", "profilepicture"],
        },
        {
          model: Enroll,
          as: "enrollments",
          attributes: ["enrollmentid", "courseid", "studentid"],
        },
      ],
    });
    const numberOfStudents = course.enrollments.length;

    course.dataValues.enrollmentcount = numberOfStudents;
    res.status(200).send(course);
  } catch (error) {}
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      order: [["createdAt", "DESC"]],
      where: { status: true, published: true },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userid", "firstname", "surname", "profilepicture"],
        },
        {
          model: Enroll,
          as: "enrollments",
          attributes: ["enrollmentid", "courseid", "studentid"],
        },
      ],
    });

    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getTeachersCourses = async (req, res, next) => {
  const { teacherid } = req.params;

  try {
    const courseWithLessons = await Course.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        teacherid,
        published: true,
        status: true,
      },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Lesson,
          as: "lessons",
        },
      ],
    });

    if (!courseWithLessons) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(courseWithLessons);
  } catch (error) {
    next(error);
  }
};

export const publishCourse = async (req, res, next) => {
  const { teacherid, courseid } = req.params;
  console.log(teacherid, courseid);
  let { monetize, localcurrency, localamount, dollaramount, country } =
    req.body;
  console.log(courseid);
  try {
    // Find the course and include its associated lessons
    const courseWithLessons = await Course.findOne({
      where: {
        teacherid,
        courseid,
      },
      include: [
        {
          model: Lesson,
          as: "lessons",
        },
      ],
    });
    if (!courseWithLessons) {
      return res.status(404).json({ message: "Course not found" });
    } else {
      if (courseWithLessons.lessons.length >= 1 && courseWithLessons?.status) {
        await Course.update(
          {
            published: 1,
            localcurrency,
            localamount,
            dollaramount,
            country,
            monetize,
          },
          { where: { courseid } }
        );
      } else {
        return res
          .status(404)
          .json({ message: "Cant publish course without lesson" });
      }
    }
    return res.status(200).json({ message: "course published successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const unpublishCourse = async (req, res, next) => {
  const { teacherid, courseid } = req.params;

  try {
    const courseWithLessons = await Course.findOne({
      where: {
        teacherid,
        courseid,
      },
    });
    console.log(courseWithLessons);
    if (!courseWithLessons) {
      return res.status(404).json({ message: "Course not found" });
    } else {
      if (courseWithLessons.published === true) {
        await Course.update({ published: 0 }, { where: { courseid } });
        return res
          .status(200)
          .json({ message: "course unpublished successfully" });
      } else {
        return res
          .status(404)
          .json({ message: "course has already been unpublished" });
      }
    }
  } catch (error) {
    next(error);
  }
};
export const monitizeCourse = async (req, res, next) => {
  let { courseid, teacherid } = req.params;
  const doesCourseExist = await Course.findOne({
    where: {
      courseid,
      teacherid,
    },
  });
  let { localcurrency, localamount, dollaramount, country } = req.body;
  const courseupdates = {
    localcurrency,
    localamount,
    dollaramount,
    country,
    monitize: true,
  };
  try {
    if (doesCourseExist) {
      await Course.update(courseupdates, {
        where: { courseid, teacherid },
      });
    } else {
      return res.status(404).send({
        message: "error updating resources",
      });
    }
    return res.status(200).send({
      message: "course monitized successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const searchCourses = async (req, res, next) => {
  const { title, description } = req.query;
  const searchParams = {
    title,
    description,
  };

  try {
    const courses = await Course.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        [Op.and]: [
          {
            [Op.and]: [
              {
                title: {
                  [Op.like]: `%${searchParams.title}%`,
                },
              },
              {
                description: {
                  [Op.like]: `%${searchParams.description}%`,
                },
              },
              {
                status: true,
              },
            ],
          },
        ],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userid", "firstname", "surname"],
        },
        {
          model: Enroll,
          as: "enrollments",
          attributes: ["enrollmentid", "courseid", "studentid"],
        },
      ],
    });

    res.status(200).send(courses);
  } catch (error) {
    next(error);
  }
};
