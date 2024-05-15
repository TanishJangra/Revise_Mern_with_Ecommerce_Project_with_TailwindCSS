const express = require('express');
const router = express.Router();

const userSignUpController = require("../controller/userSignUp.js");
const userSignInController = require('../controller/userSignIn.js');
const userDetailsController = require('../controller/userDetails.js');
const authToken = require('../middleware/authToken.js');
const userLogout = require('../controller/userLogout.js');
const allUsers = require('../controller/allUsers.js');
const updateUser = require('../controller/updateUser.js');

router.post("/signup", userSignUpController);

router.post("/signin/", userSignInController);

router.get("/user-details", authToken, userDetailsController)

router.get("/userLogout", userLogout)

router.get("/all-users", authToken, allUsers)

router.post("/update-user", updateUser)

module.exports = router