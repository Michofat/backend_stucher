export const quizModel = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("quiz", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quizid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    courseid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    lessonid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    teacherid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    optionA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correctoption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Quiz;
};
