import db from "../model/index.js";
const User = db.user;

export const register = async (req, res, next) => {
  let { phonenumber, email } = req.body;
  try {
    await User.create({
      phonenumber,
      email,
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
  let {
    firstname,
    surname,
    email,
    institution,
    currencycode,
    currencysymbol,
    languagecode,
    regioncode,
    timezone,
    devicebrand,
    devicedesign,
    devicename,
    devicetype,
    deviceyearclass,
    devicemode,
    devicemanufacturer,
    devicemodeid,
    devicemodelname,
    deviceosversion,
    devicetotalmemory,
  } = req.body;
  const updates = {
    firstname,
    surname,
    email,
    institution,
    currencycode,
    currencysymbol,
    languagecode,
    regioncode,
    timezone,
    devicebrand,
    devicedesign,
    devicename,
    devicetype,
    deviceyearclass,
    devicemode,
    devicemanufacturer,
    devicemodeid,
    devicemodelname,
    deviceosversion,
    devicetotalmemory,
  };
  try {
    await User.update(updates, { where: { userid } });
    return res.status(200).send({
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
    return res.status(200).send({
      message: "profile picture updated successful",
    });
  } catch (error) {
    next(error);
  }
};
