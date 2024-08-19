const express = require("express");
const validateuser = require("../middleware/validateUser");
const usermodel = require("../models/User-model");
const Account = require("../models/Account-model");
const router = express.Router();
const bcrypt = require("bcryptjs");
const createpassword = require("../utils/lockingwithbcrypt");
const getRandomColor = require("../utils/generateRandomColor");
const generateToken = require("../utils/generate-token");
const authProtect = require("../middleware/authProtect");


router.post("/signup", validateuser, async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await usermodel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await createpassword(password);

    // Generate random background color
    const bgcolor = getRandomColor();

    // Create new user
    const newUser = await usermodel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      bgcolor
    });

    // Create account for the new user
    const userId = newUser._id;
    const newAccount = await Account.create({
      userId,
      balance: 1 + Math.random() * 10000
    });

    // Update the new user with the reference to the created account
    newUser.account.push(newAccount._id);
    await newUser.save();

    // Generate JWT token
    const token = generateToken({ email });

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      path: '/' // Ensure the path is set correctly
    });
    
    return res.status(201).json({
      msg: "User created successfully",
      already: false
    });
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ message: "Something went wrong!" });
  }
});


// router.post("/login", validateuser, async (req, res) => {
//   const { email, password } = req.body;
//   // console.log(email,password);
//   try {
//     const user = await usermodel.findOne({ email: email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "User not found", already: false });
//     }
//     const check = bcrypt.compare(password, user.password);
//     if (check) {
//       const token =  generateToken({ email });
//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         sameSite: "None",
//         path: '/' // Ensure the path is set correctly
//       });
      
//       return res
//         .status(200)
//         .json({ msg: "User logged in successfully", already: true });
//     } else {
//       return res.status(500).json({ msg: "password incorrect" });
//     }
//   } catch (error) {
//     // console.error(error); // Log the error for debugging
//     return res.status(500).send("Something went wrong!");
//   }
// });

router.post("/login", validateuser, async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await usermodel.findOne({ email: email });
    
    if (!user) {
      return res.status(400).json({ message: "User not found", already: false });
    }

    const check = await bcrypt.compare(password, user.password);
    
    if (check) {
      const token = generateToken({ email });
      
      res.cookie("token", token, {
        httpOnly: true,
        secure:true, // Ensure this is true in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "None", // Required for cross-origin cookies
        path: '/' // Ensure the path is set correctly
      });

      return res.status(200).json({ msg: "User logged in successfully", already: true });
    } else {
      return res.status(500).json({ msg: "Password incorrect" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send("Something went wrong!");
  }
});



router.put("/edituser", authProtect, validateuser, async (req, res) => {
  try {
    // Step 1: Fetch the current user data
    const currentUser = await usermodel.findById(req.user._id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Prepare an update object by comparing new values with current values
    const updateFields = {};

    if (req.body.firstname && req.body.firstname !== currentUser.firstname) {
      updateFields.firstname = req.body.firstname;
    }

    if (req.body.lastname && req.body.lastname !== currentUser.lastname) {
      updateFields.lastname = req.body.lastname;
    }

    if (req.body.email && req.body.email !== currentUser.email) {
      updateFields.email = req.body.email;
    }

    if (req.body.password) {
      const hashedPassword = await createpassword(req.body.password);
      if (hashedPassword !== currentUser.password) {
        updateFields.password = hashedPassword;
      }
    }

    if (req.body.bgcolor && req.body.bgcolor !== currentUser.bgcolor) {
      updateFields.bgcolor = req.body.bgcolor;
    }

    // Step 3: Update the user only if there are changes
    if (Object.keys(updateFields).length > 0) {
      const updatedUser = await usermodel.updateOne(
        { _id: req.user._id },
        { $set: updateFields }
      );
      return res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } else {
      return res
        .status(200)
        .json({ message: "No changes detected, user not updated" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong!");
  }
});

router.get("/user/bulk", authProtect, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    // console.log(filter);
    // Find users with firstname containing the filter string (case-insensitive)
    const users = await usermodel.find({
      $or: [
        { firstname: { $regex: filter, $options: "i" } }, // Case-insensitive match for firstname
        { lastname: { $regex: filter, $options: "i" } },  // Case-insensitive match for lastname
        { email: { $regex: filter, $options: "i" } },     // Case-insensitive match for email
      ],
    });


    // Map the response to include only specific fields
    const filteredUsers = users.map((user) => ({
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id,
      email: user.email,
      bgcolor: user.bgcolor,
    }));

    res.json({ users: filteredUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/islogin",authProtect,(req, res) =>{
  res.json({
      firstname:req.user.firstname,
      lastName:req.user.lastname,
      email:req.user.email,
      isAuthenticated:true,
      bgcolor:req.user.bgcolor,
  })
})



router.post("/logout",authProtect,(req, res) => {
  try {
    res.clearCookie('token'); // Clear the authentication token cookie
    res.json({msg:"Logout successfully"})
} catch (error) {
    res.json({msg:"error in loging out",
        error:error
    })
}
})





module.exports = router;
