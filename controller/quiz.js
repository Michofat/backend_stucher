import db from "../model/index.js";

const Quiz = db.quiz;
const Lesson = db.lesson;

export const createQuiz = async (req, res, next) => {
  let { courseid, teacherid, lessonid } = req.params;
  let { question, optionA, optionB, optionC, optionD, correctoption } =
    req.body;

  const quizData = {
    courseid,
    lessonid,
    teacherid,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctoption,
  };

  try {
    const createdQuiz = await Quiz.create(quizData);
    await Lesson.update(
      { quizadded: true },
      {
        where: { lessonid },
      }
    );
    return res.status(201).send(createdQuiz);
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res, next) => {
  let { quizid, teacherid } = req.params;
  const doesQuizExist = await Quiz.findOne({
    where: {
      quizid,
      teacherid,
    },
  });
  let { question, optionA, optionB, optionC, optionD, correctoption } =
    req.body;
  const quizupdates = {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctoption,
  };
  try {
    if (doesQuizExist) {
      await Quiz.update(quizupdates, { where: { quizid, teacherid } });
    } else {
      return res.status(404).send({
        message: "error updating resources",
      });
    }
    return res.status(200).send({
      message: "quiz updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonQuiz = async (req, res, next) => {
  let { lessonid, teacherid } = req.params;
  try {
    const quiz = await Quiz.findAll({
      where: {
        lessonid,
        teacherid,
      },
    });
    res.status(200).send(quiz);
  } catch (error) {
    next(error);
  }
};
export const getSingleQuiz = async (req, res, next) => {
  let { quizid } = req.params;
  let doesExist = await Quiz.findOne({
    where: { quizid },
  });
  try {
    if (!doesExist) {
      res.status(404).send({ message: "quiz doesnt exist" });
    }
    const quiz = await Quiz.findOne({
      where: {
        quizid,
      },
    });
    res.status(200).send(quiz);
  } catch (error) {
    next(error);
  }
};
export const deleteQuiz = async (req, res, next) => {
  try {
    let { quizid, teacherid } = req.params;

    let doesExist = await Quiz.findOne({
      where: { quizid, teacherid },
    });

    if (!doesExist) {
      return res.status(404).send({ message: "Quiz doesn't exist" });
    }

    await Quiz.destroy({
      where: {
        quizid,
      },
    });

    return res.status(200).send({ message: "Deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
