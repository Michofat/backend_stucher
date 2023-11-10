import { dbConn } from "../config/db.config.js";
import { Sequelize, DataTypes } from "sequelize";
import { userModel } from "./user/user.js";
import { courseModel } from "./course/course.js";
import { lessonModel } from "./lesson/lesson.js";

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

db.user.hasMany(db.course, {
  foreignKey: "teacherid",
  onDelete: "CASCADE",
});
db.course.belongsTo(db.user, {
  foreignKey: "teacherid",
  as: "user",
  onDelete: "CASCADE",
});

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

export default db;
