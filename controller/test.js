import db from "../model/index.js";
const User = db.user;

export const test1 = async (req, res, next) => {
  return res.status(200).send({ message: "Welcome to Michofat Stucher App" });
};
export const test2 = async (req, res, next) => {
  return res
    .status(200)
    .send({ message: "Michofat is one of the best African ICT companies" });
};
