import { userModel } from "../user/user.js";

export const courseModel = (sequelize, DataTypes) => {
  const Course = sequelize.define("course", {
    courseid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
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
    videolink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagelink: {
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
  });

  return Course;
};