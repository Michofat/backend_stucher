import express from "express";
import {
  activateUser,
  register,
  updateProfile,
  updateProfilePicture,
} from "../../controller/auth.js";
const routes = express.Router({
  mergeParams: true,
});

routes.post("/register", register);
routes.post("/activateuser", activateUser);
routes.patch("/updateProfile/:userid", updateProfile);
routes.patch("/updateProfilePicture/:userid", updateProfilePicture);

export default routes;
