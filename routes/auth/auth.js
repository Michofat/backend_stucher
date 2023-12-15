import express from "express";
import {
  activateUser,
  getUserDetails,
  register,
  updateProfile,
  updateProfilePicture,
} from "../../controller/auth.js";
const routes = express.Router({
  mergeParams: true,
});

routes.post("/register", register);
routes.post("/activateuser", activateUser);
routes.patch("/updateprofile/:userid", updateProfile);
routes.patch("/updateprofilepicture/:userid", updateProfilePicture);
routes.post("/details", getUserDetails);

export default routes;
