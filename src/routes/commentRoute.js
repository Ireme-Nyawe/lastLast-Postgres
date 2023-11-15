import express from "express";
import { getAllComments, postCommment } from "../controller/commentController";
import uploadfile from "../helper/multer";
import Authorization from "../middleware/authenticateUser";
import AdminAuthorization from "../middleware/authenticate";

const routeComment = express.Router();

//set endpoints
routeComment.get("/getall",AdminAuthorization,getAllComments);
routeComment.post("/create/:id",Authorization,uploadfile.single("profile"),postCommment);

export default routeComment;
