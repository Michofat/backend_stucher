import { dbConn } from "../config/db.config.js";
import { Sequelize, DataTypes } from "sequelize";
import { userModel } from "./user/user.js";

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
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!!");
});

// await sequelize.sync({ alter: true });
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

export default db;
