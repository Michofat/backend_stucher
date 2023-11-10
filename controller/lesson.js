import db from "../model/index.js";
const Lesson = db.lesson;
export const createLesson = async (req, res, next) => {
  let { courseid, teacherid } = req.params;
  let { title, description, videolink, imagelink } = req.body;
  const lessons = {
    courseid,
    teacherid,
    title,
    description,
    videolink,
    imagelink,
  };
  try {
    await Lesson.create(lessons);
    return res.status(201).send({
      message: "lesson created successfully",
    });
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
