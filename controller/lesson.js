import db from "../model/index.js";
const Lesson = db.lesson;
const Course = db.course;
const Quiz = db.quiz;

const User = db.user;
export const createLesson = async (req, res, next) => {
  let { courseid, teacherid } = req.params;
  let { title, description, videolink, imagelink } = req.body;

  const lessonData = {
    courseid,
    teacherid,
    title,
    description,
    videolink,
    imagelink,
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
  let { title, description, videolink, imagelink } = req.body;
  const lessonupdates = {
    title,
    description,
    videolink,
    imagelink,
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
  let doesUserExist = await Lesson.findOne({
    where: { courseid },
  });
  try {
    if (!doesUserExist) {
      return res.status(404).send({ message: "user doesnt exist" });
    }
    const lessons = await Lesson.findAll({
      where: {
        courseid,
      },
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
      res.status(404).send({ message: "doesnt exist" });
    }
    const lessons = await Lesson.findOne({
      where: {
        teacherid,
        lessonid,
      },
    });
    res.status(200).send(lessons);
  } catch (error) {}
};
