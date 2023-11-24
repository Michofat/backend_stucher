import { userModel } from "../user/user.js";

export const courseModel = (sequelize, DataTypes) => {
  const Course = sequelize.define("course", {
    courseid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    teacherid: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coursecode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    introductoryvideolink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    localcurrency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courseicon: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn.vectorstock.com/i/1000x1000/29/55/credit-card-icon-vector-20052955.webp",
    },
    localamount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dollaramount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    monitize: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Course;
};
