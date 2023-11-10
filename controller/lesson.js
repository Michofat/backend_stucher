import db from "../model/index.js";
const Lesson = db.lesson;
export const createLesson = async (req, res, next) => {
  let { courseid, teacherid, title, description, videolink, imagelink } =
    req.body;
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
  let { coursid, teachid, lessonid } = req.params;
  console.log(coursid, teachid, lessonid);
  const doesLessonExist = await Lesson.findOne({
    where: {
      courseid: coursid,
      teacherid: teachid,
      lessonid,
    },
  });
  let { courseid, teacherid, title, description, videolink, imagelink } =
    req.body;
  const lessonupdates = {
    courseid,
    teacherid,
    title,
    description,
    videolink,
    imagelink,
  };
  try {
    if (doesLessonExist) {
      await Lesson.update(lessonupdates, {
        where: { courseid: coursid, teacherid: teachid, lessonid },
      });
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
