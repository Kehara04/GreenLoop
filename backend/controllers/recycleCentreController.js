// const RecycleCentre = require("../models/recycleCentre");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();


// // ✅ Register Recycle Centre
// exports.registerRecycleCentre = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword, address, contactNumber, website, location, acceptedItems } = req.body;

//     // Check if recycle centre already exists
//     const existingCentre = await RecycleCentre.findOne({ email });
//     if (existingCentre) {
//       return res.status(400).json({ message: "Recycle Centre with this email already exists" });
//     }

//     // Passwords match?
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Create new recycle centre
//     const newCentre = new RecycleCentre({
//       name,
//       email,
//       password: hashedPassword,
//       address,
//       contactNumber,
//       website,
//       location,
//       acceptedItems,
//     });

//     await newCentre.save();

//     res.status(201).json({ message: "Recycle Centre registered successfully!" });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ message: "Server error while registering recycle centre" });
//   }
// };

// // ✅ Login Recycle Centre
// exports.loginRecycleCentre = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find recycle centre
//     const centre = await RecycleCentre.findOne({ email });
//     if (!centre) {
//       return res.status(404).json({ message: "Recycle Centre not found" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, centre.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: centre.recycleCentre_id, role: "recycleCentre" },
//       process.env.SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       role: "recycleCentre",
//       id: centre.recycleCentre_id,
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error while logging in recycle centre" });
//   }
// };


// // Get all recycle centres
// exports.getRecycleCentres = async (req, res) => {
//   try {
//     const centres = await RecycleCentre.find();
//     res.status(200).json(centres);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching recycle centres", error });
//   }
// };

// // Get single recycle centre by recycleCentre_id
// exports.getRecycleCentreById = async (req, res) => {
//   try {
//     const id = req.query.id; // e.g., /api/recycle-centres/id?id=1
//     const centre = await RecycleCentre.findOne({ recycleCentre_id: id });
//     if (!centre) return res.status(404).json({ message: "Recycle centre not found" });
//     res.status(200).json(centre);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching recycle centre", error });
//   }
// };

// // Add new recycle centre
// exports.addRecycleCentre = async (req, res) => {
//   try {
//     const newCentre = new RecycleCentre(req.body);
//     await newCentre.save();
//     res.status(201).json({ message: "Recycle centre added successfully", centre: newCentre });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding recycle centre", error });
//   }
// };

// // Update recycle centre by recycleCentre_id
// exports.updateRecycleCentre = async (req, res) => {
//   try {
//     const id = req.query.id; // pass recycleCentre_id in query
//     const updatedCentre = await RecycleCentre.findOneAndUpdate(
//       { recycleCentre_id: id },
//       req.body,
//       { new: true }
//     );
//     if (!updatedCentre) return res.status(404).json({ message: "Recycle centre not found" });
//     res.status(200).json({ message: "Recycle centre updated successfully", centre: updatedCentre });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating recycle centre", error });
//   }
// };

// // Delete recycle centre by recycleCentre_id
// exports.deleteRecycleCentre = async (req, res) => {
//   try {
//     const id = req.query.id; // pass recycleCentre_id in query
//     const deleted = await RecycleCentre.findOneAndDelete({ recycleCentre_id: id });
//     if (!deleted) return res.status(404).json({ message: "Recycle centre not found" });
//     res.status(200).json({ message: "Recycle centre deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting recycle centre", error });
//   }
// };

const RecycleCentre = require('../models/recycleCentre');
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getRecycleCentres = async (req, res) => {
    try {
        const recycleCentres = await RecycleCentre.find().select('-password');
        res.status(200).json(recycleCentres);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getRecycleCentreById = async(req, res) => {
    try {
        const id = req.query.id;
        const recycleCentre = await RecycleCentre.findOne({recycleCentre_id: id}).select('-password');

        if(!recycleCentre) return res.status(404).json("Recycle centre not found");

        res.status(200).json(recycleCentre);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getRecycleCentreByEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const recycleCentre = await RecycleCentre.findOne({email: email}).select('-password');

        if(!recycleCentre) return res.status(404).json("Recycle centre not found");

        res.status(200).json(recycleCentre);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.addRecycleCentre = async(req, res) => {
    try {
        const {name, address, contactNumber, email, password, confirmPassword, website, lat, lng, acceptedItems} = req.body;

        const isRecycleCentreExist = await RecycleCentre.findOne({email});

        if(isRecycleCentreExist){
            return res.status(400).json({ message: "Recycle centre with this email already exists." });
        }

        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const recycleCentre = new RecycleCentre({
            name,
            address,
            contactNumber,
            email,
            password: hashedPassword,
            website,
            location: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },
            acceptedItems: acceptedItems || []
        });

        await recycleCentre.save();
        
        res.status(200).json({ 
            message: "Recycle centre registered successfully!",
            recycleCentre: {
                recycleCentre_id: recycleCentre.recycleCentre_id,
                name: recycleCentre.name,
                email: recycleCentre.email,
                address: recycleCentre.address,
                contactNumber: recycleCentre.contactNumber
            }
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

exports.updateRecycleCentre = async(req, res) => {
    try {
        const {name, address, contactNumber, email, website, lat, lng, acceptedItems} = req.body;
        const recycleCentre_id = req.body.recycleCentreId; 
        
        const existingRecycleCentre = await RecycleCentre.findOne({recycleCentre_id});
        if (!existingRecycleCentre) {
            return res.status(404).json({ message: "Recycle centre not found" });
        }

        const updateData = {
            name,
            address,
            contactNumber,
            email,
            website,
            location: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },
            acceptedItems: acceptedItems || []
        };

        const recycleCentre = await RecycleCentre.findOneAndUpdate(
            {recycleCentre_id}, 
            updateData, 
            {new: true}
        ).select('-password');

        if(!recycleCentre) return res.status(404).json("Recycle centre not found");
        
        res.json({ message: "Recycle centre updated successfully", recycleCentre });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updatePassword = async (req, res) => {
    try{
        const recycleCentre_id = req.body.recycleCentreId;
        const {password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const recycleCentre = await RecycleCentre.findOneAndUpdate(
            {recycleCentre_id}, 
            {password: hashedPassword}, 
            {new: true}
        );

        res.status(200).json({message: "Password updated successfully!"});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteRecycleCentre = async(req, res) => {
    try{
        const recycleCentre_id = req.query.id;
        const recycleCentre = await RecycleCentre.findOneAndDelete({recycleCentre_id});
        res.status(200).json({message: "Recycle centre deleted successfully!"});
    } catch (error) {
        res.status(500).json(error);
    }
};
