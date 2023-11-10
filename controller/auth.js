import db from "../model/index.js";
const User = db.user;

export const register = async (req, res, next) => {
  let { phonenumber } = req.body;
  try {
    await User.create({
      phonenumber,
    });
    return res.status(201).send({
      message: "registration successful",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  let { userid } = req.params;
  let { firstname, surname, email, institution } = req.body;
  const updates = {
    firstname,
    surname,
    email,
    institution,
  };
  try {
    await User.update(updates, { where: { userid } });
    return res.status(201).send({
      message: "update successful",
    });
  } catch (error) {
    next(error);
  }
};
export const updateProfilePicture = async (req, res, next) => {
  let { userid } = req.params;
  let { profilepicture } = req.body;
  const update = {
    profilepicture,
  };
  try {
    await User.update(update, { where: { userid } });
    return res.status(201).send({
      message: "profile picture updated successful",
    });
  } catch (error) {
    next(error);
  }
};
