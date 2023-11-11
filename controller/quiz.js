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

export const publishCourse = async (req, res) => {};
