import express from "express";
import {
  register,
  updateProfile,
  updateProfilePicture,
} from "../../controller/auth.js";
const routes = express.Router({
  mergeParams: true,
});

routes.post("/register", register);
routes.patch("/updateProfile/:userid", updateProfile);
routes.patch("/updateProfilePicture/:userid", updateProfilePicture);

export default routes;
