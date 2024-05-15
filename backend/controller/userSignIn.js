const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
try {
    const {email, password} = req.body;
    if(!email){
        throw new Error("Please provide email");
    }
    if(!password){
        throw new Error("Please provide password")
    }

    const user = await userModel.findOne({email});
    if(!user){
        throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compareSync(password, user.password);
    console.log("checkpassword is", checkPassword);

    if(!checkPassword){
        throw new Error("Please check your password");
    }
    else{
        const tokenData = {
            _id: user._id,
            email: user.email,
        }
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY , {expiresIn: 60 * 60 * 8});
        const tokenOption = {
            httpOnly: true,
            secure: true
        }
        res.cookie("token", token, tokenOption).status(200).json({
            message: "Login successfully...",
            data: token,
            success: true,
            error: false
        })
    }

}  catch (error) {
    console.log("Error ", error);
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;