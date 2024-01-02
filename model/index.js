import { dbConn } from "../config/db.config.js";
import { Sequelize, DataTypes } from "sequelize";
import { userModel } from "./user/user.js";
import { courseModel } from "./course/course.js";
import { lessonModel } from "./lesson/lesson.js";
import { quizModel } from "./quiz/quiz.js";
import { enrollmentModel } from "./enrollment/enrollment.js";
import { lessonlogModel } from "./lessonlog/lessonlog.js";

export const sequelize = new Sequelize(
  dbConn.DB,
  dbConn.USER,
  dbConn.PASSWORD,
  {
    host: dbConn.HOST,
    dialect: dbConn.dialect,
    operatorsAlliases: false,
    pool: {
      max: dbConn.pool.max,
      min: dbConn.pool.min,
      acquire: dbConn.pool.acquire,
      idle: dbConn.pool.idle,
    },
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("connected...");
  })
  .catch((error) => console.log(error));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = userModel(sequelize, DataTypes);
db.course = courseModel(sequelize, DataTypes);
db.lesson = lessonModel(sequelize, DataTypes);
db.quiz = quizModel(sequelize, DataTypes);
db.enrollment = enrollmentModel(sequelize, DataTypes);
db.lessonlog = lessonlogModel(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!!");
});

//await sequelize.sync({ alter: true });
// await sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Schema updated successfully.");
//   })
//   .catch((error) => {
//     console.error("Schema update error:", error);
//   });

// db.sequelize.sync({ force: true, alter: true }).then(() => {
//   console.log("Hard reset done!!");
// });  "CASCADE",

//relationship between course and the teacherid
db.user.hasMany(db.course, {
  foreignKey: "teacherid",
  onDelete: "CASCADE",
});
db.course.belongsTo(db.user, {
  foreignKey: "teacherid",
  as: "user",
  onDelete: "CASCADE",
});
//relationship between course and the teacherid

//relationship between lessons and quiz
db.lesson.hasMany(db.quiz, {
  foreignKey: "lessonid",
  onDelete: "CASCADE",
});
db.quiz.belongsTo(db.lesson, {
  foreignKey: "lessonid",
  as: "quizzes",
  onDelete: "CASCADE",
});
//relationship between lessons and quiz

//relationship between course and the enrolled
db.course.hasMany(db.enrollment, {
  foreignKey: "courseid",
  onDelete: "CASCADE",
});
db.enrollment.belongsTo(db.course, {
  foreignKey: "courseid",
  onDelete: "CASCADE",
  as: "enroledcourse",
});
//relationship between course and the enrolled

db.course.hasMany(db.lesson, {
  foreignKey: "courseid",
});
db.lesson.belongsTo(db.course, {
  foreignKey: "courseid",
  as: "course",
});

db.user.hasMany(db.lesson, {
  foreignKey: "teacherid",
});
db.lesson.belongsTo(db.user, {
  foreignKey: "teacherid",
  as: "user",
});

//relationship between quiz and lessons
db.lesson.hasMany(db.quiz, {
  foreignKey: "lessonid",
});
db.quiz.belongsTo(db.lesson, {
  foreignKey: "lessonid",
  as: "lesson",
});

//relationship between quiz and lessons

export default db;

[
  {
    courseid: "4b1e29b2-38e6-4de1-834a-7512822f9821",
    teacherid: "6190e02e-1d39-4461-b763-12aeb834d203",
    title: "Career talk",
    description: "This is the talk on career in washing metals",
    coursecode: "CT101",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701642913156.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-03T22:35:21.000Z",
    updatedAt: "2023-12-03T22:35:21.000Z",
    user: {
      userid: "6190e02e-1d39-4461-b763-12aeb834d203",
      firstname: "Omolara",
      surname: "Obisesan",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531556821.jpg",
    },
    enrollments: [],
  },
  {
    courseid: "4d27b5ed-8348-4bee-b418-e88786d78bc5",
    teacherid: "6190e02e-1d39-4461-b763-12aeb834d203",
    title: "Power in the blood",
    description: "This is called anointing",
    coursecode: "POW213",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701630361252.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-03T19:07:03.000Z",
    updatedAt: "2023-12-03T19:07:03.000Z",
    user: {
      userid: "6190e02e-1d39-4461-b763-12aeb834d203",
      firstname: "Omolara",
      surname: "Obisesan",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531556821.jpg",
    },
    enrollments: [],
  },
  {
    courseid: "70fdd9fe-021c-42b9-b0b4-b02077b9eacf",
    teacherid: "6190e02e-1d39-4461-b763-12aeb834d203",
    title: "Tutorial on marriage ",
    description: "Marriage is about communication ",
    coursecode: "MRG343",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701630240187.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-03T19:04:03.000Z",
    updatedAt: "2023-12-03T19:04:03.000Z",
    user: {
      userid: "6190e02e-1d39-4461-b763-12aeb834d203",
      firstname: "Omolara",
      surname: "Obisesan",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531556821.jpg",
    },
    enrollments: [],
  },
  {
    courseid: "d956b13b-4e2a-49b5-b440-75cb1094ccc7",
    teacherid: "d56d64f4-7f67-4bac-ba4d-58e616da1b81",
    title: "Praying Pattern Planet",
    description: "Building property",
    coursecode: "POP",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701538358762.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-02T17:32:41.000Z",
    updatedAt: "2023-12-02T17:32:41.000Z",
    user: {
      userid: "d56d64f4-7f67-4bac-ba4d-58e616da1b81",
      firstname: "Omolara",
      surname: "Obisesan",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/wtsyur78igvf1701536247508.jpg",
    },
    enrollments: [],
  },
  {
    courseid: "dd7d0f1d-ed4c-4ff6-92d6-0e4d4b5cfe7e",
    teacherid: "6190e02e-1d39-4461-b763-12aeb834d203",
    title: "The fall of Devil",
    description: "This is the fall of the angel called Lucifar",
    coursecode: "FDD302",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701538239771.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-02T17:30:43.000Z",
    updatedAt: "2023-12-02T17:30:43.000Z",
    user: {
      userid: "6190e02e-1d39-4461-b763-12aeb834d203",
      firstname: "Omolara",
      surname: "Obisesan",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531556821.jpg",
    },
    enrollments: [],
  },
];

[
  {
    courseid: "d0f74116-420f-4910-b414-e0819c0963f7",
    teacherid: "6190e02e-1d39-4461-b763-12aeb834d203",
    title: "Pool",
    description: "Describe me b4",
    coursecode: "Paal",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701537995341.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-02T17:26:44.000Z",
    updatedAt: "2023-12-02T17:26:44.000Z",
    user: {
      userid: "6190e02e-1d39-4461-b763-12aeb834d203",
      firstname: "Omolara",
      surname: "Obisesan",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531556821.jpg",
    },
    enrollments: [],
  },
  {
    courseid: "c4877f8b-4a5a-4df0-b095-b3c60b54f551",
    teacherid: "c8f2b67f-0597-438e-bb8d-ea6ff996df9b",
    title: "Pooo",
    description: "Played",
    coursecode: "Loop",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701537984787.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-02T17:26:26.000Z",
    updatedAt: "2023-12-02T17:26:26.000Z",
    user: {
      userid: "c8f2b67f-0597-438e-bb8d-ea6ff996df9b",
      firstname: "Omotayo",
      surname: "Iyiola",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531414908.jpg",
    },
    enrollments: [],
  },
  {
    courseid: "f105ccc7-c531-4a79-bf87-c9c983d415a3",
    teacherid: "c8f2b67f-0597-438e-bb8d-ea6ff996df9b",
    title: "Polly",
    description: "Trend now or later",
    coursecode: "Yuy",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701537000703.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-02T17:11:32.000Z",
    updatedAt: "2023-12-02T17:11:32.000Z",
    user: {
      userid: "c8f2b67f-0597-438e-bb8d-ea6ff996df9b",
      firstname: "Omotayo",
      surname: "Iyiola",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531414908.jpg",
    },
    enrollments: [],
  },
  {
    courseid: "89e407e1-fde6-4c15-82db-dfd7047c55f1",
    teacherid: "c8f2b67f-0597-438e-bb8d-ea6ff996df9b",
    title: "Youube",
    description: "The land",
    coursecode: "Yuy",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701535851098.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-02T16:50:52.000Z",
    updatedAt: "2023-12-02T16:50:52.000Z",
    user: {
      userid: "c8f2b67f-0597-438e-bb8d-ea6ff996df9b",
      firstname: "Omotayo",
      surname: "Iyiola",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531414908.jpg",
    },
    enrollments: [],
  },
  {
    courseid: "e7e1cd73-c9af-48b4-a023-d21ac95c678b",
    teacherid: "c8f2b67f-0597-438e-bb8d-ea6ff996df9b",
    title: "Poland is down",
    description: "This is not what you think ",
    coursecode: "POL23",
    status: true,
    introductoryvideolink:
      "http://stucherstorage.michofat.com/public/videos/videoss-1701535219349.mp4",
    published: true,
    localcurrency: null,
    courseimage: null,
    courseicon:
      "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    localamount: null,
    dollaramount: null,
    monetize: false,
    createdAt: "2023-12-02T16:40:35.000Z",
    updatedAt: "2023-12-02T16:40:35.000Z",
    user: {
      userid: "c8f2b67f-0597-438e-bb8d-ea6ff996df9b",
      firstname: "Omotayo",
      surname: "Iyiola",
      profilepicture:
        "http://stucherstorage.michofat.com/public/images/profilepix/995f53av9dj31701531414908.jpg",
    },
    enrollments: [],
  },
];
