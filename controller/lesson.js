import db from "../model/index.js";
const Lesson = db.lesson;
const Course = db.course;

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

export const getTeachersLesson = async (req, res) => {
  let { teacherid, courseid } = req.params;
  let doesUserExist = await Lesson.findOne({
    where: { teacherid, courseid },
  });
  try {
    if (!doesUserExist) {
      res.status(404).send({ message: "user doesnt exist" });
    }
    const lessons = await Lesson.findAll({
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
    res.status(200).send(lessons);
  } catch (error) {}
};
