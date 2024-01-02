export const lessonlogModel = (sequelize, DataTypes) => {
  const Lessonlog = sequelize.define("lessonlog", {
    lessonlogid: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    lessonid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    courseid: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    studentid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return Lessonlog;
};
