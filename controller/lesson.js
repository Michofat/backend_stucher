import db from "../model/index.js";
const Lesson = db.lesson;
const Course = db.course;
const LessonLog = db.lessonlog;

const User = db.user;
export const createLesson = async (req, res, next) => {
  let { courseid, teacherid } = req.params;
  let { title, description, videolink } = req.body;

  const lessonData = {
    courseid,
    teacherid,
    title,
    description,
    videolink,
  };

  try {
    const createdLesson = await Lesson.create(lessonData);
    await Course.update(
      { published: true },
      {
        where: { courseid },
      }
    );

    return res.status(201).send(createdLesson);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const updateLesson = async (req, res, next) => {
  let { courseid, teacherid, lessonid } = req.params;
  const doesLessonExist = await Lesson.findOne({
    where: {
      courseid,
      teacherid,
      lessonid,
    },
  });
  let { title, description, videolink } = req.body;
  const lessonupdates = {
    title,
    description,
  };
  try {
    if (doesLessonExist) {
      await Lesson.update(lessonupdates, {
        where: { courseid, teacherid, lessonid },
      });
    } else {
      return res.status(404).send({
        message: "error updating resources",
      });
    }
    return res.status(200).send({
      message: "lesson updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getTeachersLesson = async (req, res, next) => {
  let { courseid } = req.params;
  let doesLessonExist = await Lesson.findOne({
    where: { courseid },
  });
  try {
    if (!doesLessonExist) {
      return res
        .status(404)
        .send({ message: "Please add lessons to this course" });
    }
    const lessons = await Lesson.findAll({
      where: {
        courseid,
      },
      order: [["createdAt", "ASC"]],
    });
    return res.status(200).send(lessons);
  } catch (error) {
    next(error);
  }
};

export const deleteLesson = async (req, res, next) => {
  let { lessonid } = req.params;

  try {
    let doesLessonExist = await Lesson.findOne({
      where: { lessonid },
      include: [
        {
          model: Course,
          as: "course",
          include: [
            {
              model: Lesson,
              as: "lessons",
            },
          ],
        },
      ],
    });

    if (!doesLessonExist) {
      res.status(404).send({ message: "Lesson doesn't exist" });
    } else {
      await Lesson.destroy({ where: { lessonid } });

      if (
        doesLessonExist.quizadded === true &&
        doesLessonExist.course?.status === true &&
        doesLessonExist.course?.lessons.length === 1
      ) {
        // Update the course's published status to false
        await Course.update(
          { published: false },
          { where: { courseid: doesLessonExist?.course?.courseid } }
        );
      }

      res.status(200).send({ message: "Lesson deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const getLesson = async (req, res) => {
  let { lessonid, teacherid } = req.params;
  let doesExist = await Lesson.findOne({
    where: { teacherid, lessonid },
  });
  try {
    if (!doesExist) {
      res.status(404).send({ message: "error fetching lesson" });
    }
    const lessons = await Lesson.findOne({
      where: {
        teacherid,
        lessonid,
      },
    });
    res.status(200).send(lessons);
  } catch (error) {
    next(error);
  }
};

export const nextLesson = async (req, res) => {
  let { courseid, studentid } = req.params;
  let lessonlogscount = await LessonLog.count({
    where: {
      courseid,
      studentid,
    },
  });
  const nextLesson = await Lesson.findOne({
    where: {
      courseid,
    },
    order: [["createdAt", "ASC"]],
    offset: lessonlogscount,
    limit: 1,
  });
  if (!nextLesson) {
    return res.status(400).send({ message: "lesson completed" });
  }
  return res.status(200).send(nextLesson);
};

export const LessonStatus = async (req, res, next) => {
  try {
    let { courseid, studentid } = req.params;
    const lessons = await Lesson.findAll({
      where: {
        courseid,
      },
      order: [["createdAt", "ASC"]],
    });
    const lessonsWithStatus = await Promise.all(
      lessons.map(async (lesson) => {
        const lessonLog = await LessonLog.findOne({
          where: {
            lessonid: lesson.lessonid,
            studentid,
          },
        });

        const completedstatus = lessonLog ? true : false;

        return {
          ...lesson.toJSON(),
          completedstatus,
        };
      })
    );

    res.status(200).send(lessonsWithStatus);
  } catch (error) {
    next(error);
  }
};

// export const createLessonLog = async (req, res, next) => {
//   let { courseid, studentid, lessonid } = req.params;
//   console.log(courseid, studentid, lessonid);
//   try {
//     const lessonlogData = {
//       courseid,
//       studentid,
//       lessonid,
//     };
//     const doesLogExist = await LessonLog.findOne({
//       courseid,
//       studentid,
//       lessonid,
//     });
//     if (doesLogExist) {
//       res.status(400).send({ messsage: "cant post lesson log" });
//     } else {
//       await LessonLog.create(lessonlogData);
//       res.status(201).send({ messsage: "success" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const createLessonLog = async (req, res, next) => {
  let { courseid, studentid, lessonid } = req.params;
  console.log(courseid, studentid, lessonid);
  try {
    const lessonlogData = {
      courseid,
      studentid,
      lessonid,
    };
    const doesLogExist = await LessonLog.findOne({
      courseid,
      studentid,
      lessonid,
    });
    await LessonLog.create(lessonlogData);
    res.status(201).send({ messsage: "success" });
  } catch (error) {
    next(error);
  }
};
export const updateLessonVideoLink = async (req, res, next) => {
  let { courseid, teacherid, lessonid } = req.params;
  const doesLessonExist = await Lesson.findOne({
    where: {
      courseid,
      teacherid,
      lessonid,
    },
  });
  let { videolink } = req.body;
  const lessonupdates = {
    videolink,
  };
  try {
    if (doesLessonExist) {
      await Lesson.update(lessonupdates, {
        where: { courseid, teacherid, lessonid },
      });
    } else {
      return res.status(404).send({
        message: "error updating resources",
      });
    }
    return res.status(200).send({
      message: "lesson updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
