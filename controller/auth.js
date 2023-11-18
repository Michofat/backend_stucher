import axios from "axios";
import db from "../model/index.js";
import { randomNumber, validatePhoneNumber } from "../utils/utils.js";
import { sendActivationEmail } from "../utils/email.config.js";
import sequelize from "sequelize";
const User = db.user;

export const register = async (req, res, next) => {
  let { phonenumber } = req.body;
  const isValidPhoneNumber = validatePhoneNumber(phonenumber);

  const phonenumberexist = await User.findOne({
    where: {
      phonenumber,
    },
  });
  try {
    if (!phonenumber) {
      return res.status(404).send({
        message: "please complete the field",
      });
    } else if (phonenumberexist) {
      return res.status(404).send({
        message: "phone number already exists",
      });
    } else if (!isValidPhoneNumber) {
      return res.status(404).send({
        message: "phonenumber not valid",
      });
    } else {
      if (phonenumber) {
        let randomdigit = randomNumber();
        const response = await axios.post(
          `https://termii.com/api/sms/send?to=${phonenumber}&from=N-Alert&sms=Your Michofat confirmation code for Stuther App is ${randomdigit}. It expires in 30 minutes&type=plain&channel=dnd&api_key=TLb0sqAbAGo46iyz4ZhRtjbQ988I5tR4UDRdYukeD6aKVidegXv0bvZCFDKf3P`
        );
        if (response.status === 200) {
          await User.create({
            phonenumber,
            actcode: randomdigit,
          });
          return res.status(200).send({
            message: "Activation code has been sent to ur phone. Please check",
          });
        }
      } else {
        return res.status(200).send({ message: "unable to send OTP code" });
      }
    }
  } catch (error) {
    next(error);
  }
};
export const activateUser = async (req, res, next) => {
  let {
    actcode,
    phonenumber,
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
  console.log(phonenumber);
  const user = await User.findOne({
    where: { phonenumber },
  });
  const updates = {
    status: "active",
    activationdate: sequelize.literal("CURRENT_TIMESTAMP"),
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
    if (actcode != user.actcode) {
      res.status(404).send({ message: "activation code is not correct" });
    } else {
      if (user.status === "active") {
        res.status(404).send({ message: "user already activated" });
      } else {
        let activationCode = user.actcode;
        let phonenumber = user.phonenumber;
        sendActivationEmail(
          "michofatltd@gmail.com",
          phonenumber,
          activationCode
        );

        await User.update(updates, {
          where: {
            phonenumber,
            actcode,
          },
        });
        res.status(200).send({ message: "activation was successful" });
      }
    }
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  let { userid } = req.params;
  let { firstname, surname, email } = req.body;
  const updates = {
    firstname,
    surname,
    email,
  };
  try {
    email && (await User.update(updates, { where: { userid } }));
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
      message: "profile picture updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getPhoneDetails = async (req, res, next) => {
  let { phonenumber } = req.body;

  try {
    let user = await User.findOne({ where: { phonenumber } });
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
