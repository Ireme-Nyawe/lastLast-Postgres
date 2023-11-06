import db from "../db/models";
const commentModel=db['comments'];
const postModel=db['posts'];


export const postCommment = async (req, res) => {
  try {
    const { id } = req.params;

    const checkPost = await postModel.findByPk(id);
    if(!checkPost) {
      return res.status(400).json({
          status: "400",
          message: "Post Not Found , Try Another!",
      });
    }
    const { commentBody } = req.body;
    const commenting = await commentModel.create({
      commentBody,
      post: id,
      user: req.userModel.id,
    });

    return res.status(201).json({
      status: "201",
      message: "Comment Sent Successfully.",
      data: commenting,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed,  Comment Not Sent!",
      error: error.message,
    });
  }
};
//  comment Viewing
export const getAllComments = async(req,res) => {
  try {
    const comments = await commentModel.findAll();
    return res.status(200).json({
      status: "200",
      message: "Comments Retrived; Check:",
      data: comments,
      });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "error, occured failed to retrive comments",
      error: error.message,
    });
  }
}


