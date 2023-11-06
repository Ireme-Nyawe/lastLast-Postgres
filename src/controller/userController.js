import { uploadToCloud } from "../helper/cloud";
import Jwt from "jsonwebtoken";
import ms from "ms";
import bcrypt, {genSalt, hash} from "bcrypt";
import db from "../db/models";

const users = db['users'];

// Create Users

export const createUser = async(req,res) => {
  try {
    const {firstname, lastname, email, password, profile} = req.body;
// check user existence
console.log(users)
const checkEmail = await users.findOne({
  where: {email: email}
});
if(checkEmail) {
  return res.status(400).json({
      status: "400",
      message: "User With Simillar Email Registered , Try Another!",
  });
}
    // validate password
    const validatePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!validatePassword.test(password)) {
          return res.status(400).json({
              status: "400",
              message: "A Weak Password, Use Both Characters And Number And Not Less Than 6 Digits!",
          });
      }
    const encrypt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, encrypt);
    let userprof;
    if(req.file) userprof = await uploadToCloud(req.file, res);
    const SignUp = await users.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      profile: userprof?.secure_url
  });
  return res.status(200).json({
    status: "200",
    message: "Good Job, User Account Created Successfully; Check Data:",
    data: SignUp,
  });

  } catch (error) {
    if(error.name === "SequelizeValidationError"){
    console.log("Validation error: " + error.error);
  }else{
    console.log("Unhandled Error:" + error)
  }
    return res.status(500).json({
      status: "500",
      message: "Failed To create User Account; Check Back!",
      error:error.message,
    
  });
}
}

// view all users

export const getAllUsers = async (req, res) => {
  try {
    const availableUsers = await users.findAll();

    return res.status(200).json({
      status: "200",
      message: "Users Retrieved; Check below:",
      data: availableUsers,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "error, occured faided to retrieve users",
      error: error.message,
    });
  }
};

// user Login
export const postLogin = async (req, res) => {
  try {
    const check =await users.findOne(
      {where: 
        {email: req.body.email}
    });
    if(!check){
      return res.status(404).json({
        status: "404",
        message: "User Not Found, Top Up SignUp!",
      });
    }
    const comparePassword = await bcrypt.compare(req.body.password, check.password);
    if(!comparePassword){
      return res.status(404).json({
        status: "404",
        message: "Incorrect Password!",
      });
    }
    const expire=ms(process.env.EXPIREDTIME);
    const token = await Jwt.sign(
      { id: check.id},
      process.env.JWT_SECRET,
      { expiresIn: expire}
    );
    return res.status(200).json({
      status: "200 ",
      message: "Good Job, You are Logged In",
      data: check,
      token: token,
    })
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed To Login, CheckBack",
      error: error.message,
    });
  }
};

// Update user information 

export const updateUser = async (req,res) =>{
  try {
    const id = req.userModel.id;
    const {firstname, lastname,email,password,profile} = req.body;

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validateEmail.test(email)) {
        return res.status(400).json({
            status: "400",
            message: "Invalid Email, Use Similar To 'example@gmail.com'",
        });
    }
    const validatePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!validatePassword.test(password)) {
        return res.status(400).json({
            status: "400",
            message: "A Weak Password, Use Both Characters And Number And Not Less Than 6 Digits!",
        });
    }

    let userProf;
    if(req.file) userProf = await uploadToCloud(req.file, res);
    const encrypt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, encrypt);
    const editAccount = await users.update({
        firstname,
        lastname,
        email,
        password: hashedpass,
        profile: userProf?.secure_url
    },
    {where:{id:id}});

    return res.status(200).json({
      status: "200",
      message: "Good Job, User Account Updated Successfully;",
    });

  } catch (error) {
      return res.status(500).json({
          status: "500",
          message: "Failed To UpdateUser Account; Check Back!",
          error:error.message,
      });
  }
};

//Delete An Existing User

export const deleteUser = async(req, res) => {
  try {
    const id = req.userModel.id;
    const checkId = await users.findByPk(id);
    if(!checkId){
      return res.status(404).json({
        status : "404",
        message : "Id Do Not Correspond To Any User!"
      });
    }
    const deleteU= await users.destroy({
      where:{id:id}
    });
    return res.status(201).json({
      status : "201",
      message : "Good Job, User Deleted Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      status : "500",
      message : "Error Occured, Failed To Delete User!",
      error : error.message,

    })
  }
}

