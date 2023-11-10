import db from "../model/index.js";
const Course = db.course;
const User = db.user;
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

export const updateCourse = async (req, res, next) => {
  let { courseid, teacherid } = req.params;
  const doesCourseExist = await Course.findOne({
    where: {
      courseid,
      teacherid,
    },
  });
  let { title, description, videolink, imagelink, introductoryvideolink } =
    req.body;
  const courseupdates = {
    title,
    description,
    videolink,
    imagelink,
    introductoryvideolink,
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
    if (doesCourseExist) {
      await Course.destroy({
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

export const getTeachersCourse = async (req, res) => {
  let { teacherid } = req.params;
  let doesUserExist = await User.findOne({
    where: { userid: teacherid },
  });
  try {
    if (!doesUserExist) {
      res.status(404).send({ message: "user doesnt exist" });
    }
    const courses = await Course.findAll({
      where: {
        teacherid,
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
