import db from "../model/index.js";
const Course = db.course;

export const createCourse = async (req, res, next) => {
  let {
    teacherid,
    title,
    description,
    videolink,
    imagelink,
    introductoryvideolink,
  } = req.body;
  const courses = {
    teacherid,
    title,
    description,
    videolink,
    imagelink,
    introductoryvideolink,
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
