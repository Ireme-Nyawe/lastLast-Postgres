import express from "express";
import { createUser, deleteUser, getAllUsers, postLogin, updateUser } from "../controller/userController";
import uploadfile from "../helper/multer";
import AdminAuthorization from "../middleware/authenticate";
import Authorization from "../middleware/authenticateUser";
const routeUser = express.Router();

routeUser.post("/create",uploadfile.single("profile"), createUser);
routeUser.post("/login",uploadfile.single("profile"), postLogin);
routeUser.put("/update",Authorization,uploadfile.single("profile"),updateUser);
routeUser.delete("/delete",Authorization,deleteUser);
routeUser.get("/users",AdminAuthorization,getAllUsers);

export default routeUser;