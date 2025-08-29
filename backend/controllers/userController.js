// const User = require('../models/user');
// const bcrypt = require('bcryptjs'); 
// const jwt = require('jsonwebtoken');
// const { sendResetPassword } = require('../utils/mailer');
// require("dotenv").config();

// exports.getUsers = async(req,res) => {
//     try {
//         const users = await User.find();
//         if(!users) {
//             return res.status(404).json({message: "No users found"});
//         }
//         res.status(200).json(users);
//     }catch (error) {
//         res.status(500).json({message: "Error fetching users"});
//     }
// }

// exports.getUserById = async(req, res) => {
//     try {
//         const id = req.query.id;
//         const user = await User.findOne({user_id:id});
//         if(!user) {
//             return res.status(404).json({message: "User not found"});
//         }
//         res.status(200).json(user);
//     }catch (error) {
//         res.status(500).json({message: "Error fetching user"});
//     }
// };

// exports.forgotPassword = async (req,res) => {
//     try{
//         const email = req.body.email;
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(404).json({message: "User not found"});
//         }

//         const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" });

//         await sendResetPassword(email, token);

//         res.status(200).json({message: "Reset link send successfully"});
//     }catch(error){
//         return res.status(500).json("Error", error);
//     }
// }

// exports.resetPassword = async(req,res) => {
//     try{
//         const {token} = req.params;
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);

//         const user = await User.findOne({email: decoded.email}).select("-password");
//         if(!user) return res.status(400).json({message: 'Invalid Token'});

//         const password = req.body.password;
//         const hashedPassword = await bcrypt.hash(password,12);
//         user.password = hashedPassword;
//         await user.save();
//         res.json({message: "Password reset successfully!"});

//     }catch(error){
//         res.status(500).json({ message: `Something went wrong 123: ${error}` });
//     }
// }


// exports.login = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;



//         // Check if user exists
//         const user = await User.findOne({ email });



//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // if(!user.isVerified){
//         //     return res.status(401).json({message: "Please verify your account before login. Check inbox or Spam list for further details."})
//         // }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);


//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT Token
//         const token = jwt.sign(
//             { id: user.user_id, role: user.role },
//             process.env.SECRET_KEY,
//             { expiresIn: "30m" }
//         );



//         // Send response with token
//         res.status(200).json({ 
//             message: "Login successful", 
//             token,
//             role: user.role,
//             id: user.user_id  
//         });

//     } catch (err) {
//         console.error("Login Error:", err.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };


// exports.authentication = async (req, res) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized: No user data found" });
//       }
  
//       const user = await User.findOne({user_id:req.user.id}).select("-password"); 
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.status(200).json(user);
//     } catch (error) {
//       console.error("Authentication error:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
// };


// exports.verifyemail = async(req, res) => {
//   try {
//     const {token} = req.params;
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     const user = await User.findOne({email: decoded.email}).select("-password");
//     if(!user) return res.status(400).json({message: 'Invalid Token'});

//     user.isVerified = true;
//     await user.save();

//     res.json({message: "Email verified successfully!"});
//   } catch (error) {
//     res.status(400).json({message: "Invalid or Expired token"});
//   }
// };


// exports.updateUser = async(req,res) => {
//     try {
//         const {firstName, lastName,email,address,phone} = req.body;
//         const user_id = req.body.userId; 
        
//         const existingUser = await User.findOne({user_id});
//         if (!existingUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // If a new file is uploaded, use it; otherwise, keep the existing profilePic
//         const profilePic = req.file ? `/uploads/${req.file.filename}` : existingUser.profilePic;

//         const updateData = {
//             firstName,
//             lastName,
//             email,
//             address,
//             phone,
//             profilePic , 
//         }

//         const user = await User.findOneAndUpdate({user_id},updateData, {new:true});
//         if(!user) return res.status(404).json("User not found");
//         console.log(user);
//         res.json({ message: "User updated successfully", user });
//     }catch (error) {
//         res.status(500).json(error);
//     }
   
// }

// exports.deleteUser = async(req,res) => {
//     try {
//         const user_id = req.query.id; 
//         const user = await User.findOneAndDelete({user_id});
//         res.json({message: "User deleted successfully"});
//     }catch (error) {
//         res.status(500).json({message: "Error deleting user"});
//     }
// }

const User = require('../models/user');
const RecycleCentre = require('../models/recycleCentre');
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken");
const {sendVerificationEmail} = require("../utils/mailer");
require("dotenv").config();

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getUserById = async(req, res) => {
    try {
        const id = req.query.id;
        const user = await User.findOne({user_id: id}).select('-password');

        if(!user) return res.status(404).json("User not found");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // First check in User collection
        let user = await User.findOne({ email });
        let userType = 'user';
        let userId = null;

        // If not found in User collection, check RecycleCentre collection
        if (!user) {
            user = await RecycleCentre.findOne({ email });
            userType = 'recycleCentre';
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Get the appropriate ID based on user type
        if (userType === 'user') {
            userId = user.user_id;
        } else {
            userId = user.recycleCentre_id;
        }

        // Determine role
        let role = userType === 'recycleCentre' ? 'recycleCentre' : user.role;

        const token = jwt.sign(
            { 
                id: userId, 
                email: user.email, 
                role: role,
                userType: userType 
            }, 
            process.env.SECRET_KEY, 
            { expiresIn: "24h" }
        );

        res.status(200).json({
            token,
            role,
            id: userId,
            userType,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.authentication = async (req, res) => {
    try {
        const { id, userType } = req.user;
        let user;

        if (userType === 'recycleCentre') {
            user = await RecycleCentre.findOne({ recycleCentre_id: id }).select('-password');
        } else {
            user = await User.findOne({ user_id: id }).select('-password');
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.verifyemail = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { email } = decoded;

        // Check both User and RecycleCentre collections
        let user = await User.findOne({ email });
        if (!user) {
            user = await RecycleCentre.findOne({ email });
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // Update verification status
        if (user.user_id) {
            await User.findOneAndUpdate({ email }, { isVerified: true });
        } else {
            // For recycle centres, we might need to add isVerified field to the model
            // await RecycleCentre.findOneAndUpdate({ email }, { isVerified: true });
        }

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, address, phone, userId, userType } = req.body;
        
        let user;
        const profilePic = req.file ? `/uploads/${req.file.filename}` : undefined;

        if (userType === 'recycleCentre') {
            const updateData = { 
                name: firstName, // RecycleCentre uses 'name' instead of firstName/lastName
                email, 
                address, 
                contactNumber: phone 
            };
            user = await RecycleCentre.findOneAndUpdate(
                { recycleCentre_id: userId }, 
                updateData, 
                { new: true }
            ).select('-password');
        } else {
            const existingUser = await User.findOne({ user_id: userId });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const updateData = {
                firstName,
                lastName,
                email,
                address,
                phone,
                profilePic: profilePic || existingUser.profilePic
            };

            user = await User.findOneAndUpdate(
                { user_id: userId }, 
                updateData, 
                { new: true }
            ).select('-password');
        }

        if (!user) return res.status(404).json("User not found");

        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        let user = await User.findOne({ email });
        if (!user) {
            user = await RecycleCentre.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" });
        
        // Store token in database (you might want to add a resetToken field to both models)
        // await sendResetPasswordEmail(email, resetToken);

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { email } = decoded;

        const hashedPassword = await bcrypt.hash(password, 12);

        let user = await User.findOne({ email });
        if (user) {
            await User.findOneAndUpdate({ email }, { password: hashedPassword });
        } else {
            await RecycleCentre.findOneAndUpdate({ email }, { password: hashedPassword });
        }

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id, userType } = req.user;

        if (userType === 'recycleCentre') {
            await RecycleCentre.findOneAndDelete({ recycleCentre_id: id });
        } else {
            await User.findOneAndDelete({ user_id: id });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};

  
