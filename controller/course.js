import db from "../model/index.js";
const Course = db.course;
const User = db.user;
const Lesson = db.lesson;

export const createCourse = async (req, res, next) => {
  let { teacherid } = req.params;
  let {
    title,
    description,
    videolink,
    imagelink,
    introductoryvideolink,
    courseimage,
  } = req.body;
  const courses = {
    teacherid,
    title,
    description,
    videolink,
    imagelink,
    introductoryvideolink,
    courseimage,
  };
  try {
    await Course.create(courses);
    return res.status(201).send({
      message: "course created successfully",
    });
  } catch (error) {
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
  } = req.body;
  const courseupdates = {
    title,
    description,
    videolink,
    imagelink,
    introductoryvideolink,
    courseimage,
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
    }
    const courses = await Course.findOne({
      where: {
        teacherid,
        courseid,
      },
      include: [
        {
          model: User,
          as: "user",
          attibutes: ["id"],
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
    }
    const course = await Course.findOne({
      where: {
        courseid,
      },
      include: [
        {
          model: User,
          as: "user",
          attibutes: ["id"],
        },
      ],
    });
    res.status(200).send(course);
  } catch (error) {}
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "user",
          attibutes: ["id"],
        },
      ],
    });
    res.status(200).send(courses);
  } catch (error) {}
};

export const getTeachersCourses = async (req, res, next) => {
  const { teacherid } = req.params;

  try {
    // Find the course and include its associated lessons
    const courseWithLessons = await Course.findAll({
      where: {
        teacherid,
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

    // Access the lessons using courseWithLessons.Lessons
    //  const lessons = courseWithLessons.course;

    return res.status(200).json(courseWithLessons);
  } catch (error) {
    next(error);
  }
};

export const publishCourse = async (req, res, next) => {
  const { teacherid, courseid } = req.params;

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
      if (courseWithLessons.lessons.length > 1) {
        await Course.update({ published: 1 }, { where: { courseid } });
      } else {
        return res
          .status(404)
          .json({ message: "Cant publish course without lesson" });
      }
    }
    return res.status(200).json({ message: "course published successfully" });
  } catch (error) {
    next(error);
  }
};

export const unpublishCourse = async (req, res, next) => {
  const { teacherid, courseid } = req.params;

  try {
    // Find the course and include its associated lessons
    const courseWithLessons = await Course.findOne({
      where: {
        teacherid,
        courseid,
      },
    });

    if (!courseWithLessons) {
      return res.status(404).json({ message: "Course not found" });
    } else {
      await Course.update({ published: 0 }, { where: { courseid } });
      return res
        .status(200)
        .json({ message: "course unpublished successfully" });
    }
  } catch (error) {
    next(error);
  }
};
