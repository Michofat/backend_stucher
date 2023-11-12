export const enrollmentModel = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define("enrollment", {
    enrollmentid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    courseid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    studentid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    teacherid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amountpaid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Enrollment;
};
