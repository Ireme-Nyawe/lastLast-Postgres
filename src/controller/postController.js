import { uploadToCloud } from "../helper/cloud";
import db from "../db/models";
const userModel=db['users'];
const postModel=db['posts'];
const commentModel=db['comments'];

// Create a new post
export const createPost = async(req,res) => {
  try {
        const { image, title, header, category, description} = req.body;
    
        const checkTitle = await postModel.findOne(
          {where: {title:title}}
          );
        if(checkTitle) {
          return res.status(400).json({
              status: "400",
              message: "Post With Simillar Title Exists , Try Another!",
          });
        }
    let picture;
    if(req.file) picture = await uploadToCloud(req.file, res);
    const post = await postModel.create({
      image: picture?.secure_url,
      title,
      header,
      category,
      description,
      user: req.userModel.id,
  });
  return res.status(200).json({
    status: "200",
    message: "Good Job, Post Added Successfuly; Check Data:",
    data: post,
  });

} 
  catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Error Occured, Failed To Create A Post",
      error: error.message,
    });
  }
};

// retrieve posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      include: [
        {
          model: commentModel,
          as: 'comments',
          include: [
            {
              model: userModel,
              as: 'commenter',
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      status: "200",
      message: "Posts Retrieved; Check:",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "error, occured failed to retrieve posts",
      error: error.message,
    });
  }
};

//  view a specific post
export const getOnePost = async (req, res) => {
  try {
    const {id} = req.params;
    
    const post = await postModel.findByPk(id,{
      include: [
        {
          model: commentModel,
          as: 'comments',
          include: [
            {
              model: userModel,
              as: 'commenter',
            },
          ],
        },
      ],
    });      
      if(!post){
        return res.status(404).json({
          ststus:404,
          message: "Post Not Found"
        })
      }
      else{
        const addView = await postModel.update(
          {views:post.views+1},{
          where: {id:id}}
        );
      }
      return res.status(200).json({
      status: "200",
      message: "Post Retrieved; Check:",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "error, occured failed to retrieve posts",
      error: error.message,
    });
  }
};
// retrieve posts respective to Admin
export const getAdminPosts = async (req, res) => {
  try {
    const posts = await postModel.findAll({where: {user:req.userModel.id}},{
      include: [
        {
          model: commentModel,
          as: 'comments',
          include: [
            {
              model: userModel,
              as: 'commenter',
            },
          ],
        },
      ],
    })

    return res.status(200).json({
      status: "200",
      message: "Your Posts Retrieved; Check:",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "error, occured failed to retrieve your Posts",
      error: error.message,
    });
  }
};

// Update post

export const updatePost = async (req, res) => {
  try {
    const {id}=req.params;
    const { image, title, header, category, description} = req.body;
    let picture;
      if(req.file) picture = await uploadToCloud(req.file, res);

    const updatedPost = await postModel.update({
      image : picture?.secure_url,
      title,
      header,
      category,
      description,
      user : req.userModel._id
    },
    {where:{id:id}});
    return res.status(201).json({
      status: "201",
      message: "Good Job, A Post Updated Succesfully.",
      data: updatePost,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Error Occured, Failed To Update A Post",
      error: error.message,
    });
  }
};

//Delete An Existing post

export const deletePost = async(req, res) => {
  try {
    const {id} = req.params;
    const checkId = await postModel.findByPk(id);
    if(!checkId){
      return res.status(404).json({
        status : "404",
        message : "Id Do Not Correspond To Any Post!"
      });
    }
    const deletep= await postModel.destroy({
      where:{id:id},
      include: [{
        model: commentModel,
        as: 'comments',
      }]
    });
    return res.status(201).json({
      status : "201",
      message : "Good Job, Post Deleted Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      status : "500",
      message : "Error Occured, Failed To Delete Post!",
      error : error.message,

    })
  }
}

