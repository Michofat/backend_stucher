import axios from "axios";
import db from "../model/index.js";
import { randomNumber, validatePhoneNumber } from "../utils/utils.js";
import { sendActivationEmail } from "../utils/email.config.js";
const User = db.user;

export const register = async (req, res, next) => {
  let { email, phonenumber } = req.body;
  const isValidPhoneNumber = validatePhoneNumber(phonenumber);

  const emailexist = await User.findOne({
    where: {
      email,
    },
  });
  const phonenumberexist = await User.findOne({
    where: {
      phonenumber,
    },
  });
  try {
    if (!phonenumber || !email) {
      return res.status(404).send({
        message: "please complete the field",
      });
    } else if (emailexist || phonenumberexist) {
      return res.status(404).send({
        message: "email or phone number already exists",
      });
    } else if (!isValidPhoneNumber) {
      return res.status(404).send({
        message: "phone number not valid",
      });
    } else {
      if (phonenumber && email) {
        let randomdigit = randomNumber();
        await sendActivationEmail(email, phonenumber, randomdigit);
        const response = await axios.post(
          `https://termii.com/api/sms/send?to=${phonenumber}&from=N-Alert&sms=Your Michofat confirmation code for Stuther App is ${randomdigit}. It expires in 30 minutes&type=plain&channel=generic&api_key=TLb0sqAbAGo46iyz4ZhRtjbQ988I5tR4UDRdYukeD6aKVidegXv0bvZCFDKf3P`
        );
        if (response.status === 200) {
          sendActivationEmail(email, phonenumber, randomdigit);
          await User.create({
            phonenumber,
            email,
            actcode: randomdigit,
          });
          return res.status(200).send({
            message: "Code successuffully, please activate your email",
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
  let { actcode, phonenumber } = req.body;
  const user = await User.findOne({
    phonenumber,
  });
  const updates = { status: "active" };
  console.log(actcode, user.actcode);
  try {
    if (actcode != user.actcode) {
      res.status(404).send({ message: "activation code is not correct" });
    } else {
      await User.update(updates, {
        where: {
          phonenumber,
          actcode,
        },
      });
      res.status(200).send({ message: "activation successful" });
    }
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
