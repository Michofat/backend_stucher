export const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    userid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [3, 30],
          msg: "firstname must be between 3 and 30 characters",
        },
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [4, 20],
          msg: "surname must be between 3 and 30 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please provide a valid email address",
        },
      },
    },
    phonenumber: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Please provide your 11 digits phonenumber",
        },
        isNumeric: {
          msg: "Phone only numbers",
        },
      },
    },
    profilepicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: "inactive",
      values: ["active", "inactive"],
    },
    bankname: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    accountnumber: {
      type: DataTypes.STRING(11),
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: {
          msg: "Phone only numbers",
        },
      },
    },
    ninlink: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  });

  return User;
};
