import express from "express";
import uploadfile from "../helper/multer";
import AdminAuthorization from "../middleware/authenticate";
import { createPost, deletePost, getAdminPosts, getAllPosts, getOnePost, updatePost } from "../controller/postController";

const routePost = express.Router();
routePost.post("/create",AdminAuthorization,uploadfile.single("image"),createPost);
routePost.get("/getall",getAllPosts)
routePost.get("/adminPosts",AdminAuthorization,getAdminPosts);
routePost.get("/getone/:id",getOnePost);
routePost.put("/update/:id",AdminAuthorization,uploadfile.single("image"),updatePost);
routePost.delete("/delete/:id",AdminAuthorization,deletePost);

export default routePost;
