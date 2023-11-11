export const lessonModel = (sequelize, DataTypes) => {
  const Lesson = sequelize.define("lesson", {
    lessonid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    courseid: {
      type: DataTypes.UUID,
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
    quizadded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Lesson;
};
