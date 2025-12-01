// const RecycleCentre = require('../models/recycleCentre');
// const bcrypt = require('bcryptjs'); 
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// exports.getRecycleCentres = async (req, res) => {
//     try {
//         const recycleCentres = await RecycleCentre.find().select('-password');
//         res.status(200).json(recycleCentres);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// exports.getRecycleCentreById = async(req, res) => {
//     try {
//         const id = req.query.id;
//         const recycleCentre = await RecycleCentre.findOne({recycleCentre_id: id}).select('-password');

//         if(!recycleCentre) return res.status(404).json("Recycle centre not found");

//         res.status(200).json(recycleCentre);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// exports.getRecycleCentreByEmail = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const recycleCentre = await RecycleCentre.findOne({email: email}).select('-password');

//         if(!recycleCentre) return res.status(404).json("Recycle centre not found");

//         res.status(200).json(recycleCentre);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// exports.addRecycleCentre = async(req, res) => {
//     try {
//         const {name, address, contactNumber, email, password, confirmPassword, website, lat, lng, acceptedItems} = req.body;

//         const isRecycleCentreExist = await RecycleCentre.findOne({email});

//         if(isRecycleCentreExist){
//             return res.status(400).json({ message: "Recycle centre with this email already exists." });
//         }

//         if(password !== confirmPassword){
//             return res.status(400).json({message: "Passwords do not match"});
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);

//         const recycleCentre = new RecycleCentre({
//             name,
//             address,
//             contactNumber,
//             email,
//             password: hashedPassword,
//             website,
//             location: {
//                 lat: parseFloat(lat),
//                 lng: parseFloat(lng)
//             },
//             acceptedItems: acceptedItems || []
//         });

//         await recycleCentre.save();
        
//         res.status(200).json({ 
//             message: "Recycle centre registered successfully!",
//             recycleCentre: {
//                 recycleCentre_id: recycleCentre.recycleCentre_id,
//                 name: recycleCentre.name,
//                 email: recycleCentre.email,
//                 address: recycleCentre.address,
//                 contactNumber: recycleCentre.contactNumber
//             }
//         });
//     } catch (error) {
//         res.status(500).json(error);
//         console.log(error);
//     }
// };

// exports.updateRecycleCentre = async(req, res) => {
//     try {
//         const {name, address, contactNumber, email, website, lat, lng, acceptedItems} = req.body;
//         const recycleCentre_id = req.body.recycleCentreId; 
        
//         const existingRecycleCentre = await RecycleCentre.findOne({recycleCentre_id});
//         if (!existingRecycleCentre) {
//             return res.status(404).json({ message: "Recycle centre not found" });
//         }

//         const updateData = {
//             name,
//             address,
//             contactNumber,
//             email,
//             website,
//             location: {
//                 lat: parseFloat(lat),
//                 lng: parseFloat(lng)
//             },
//             acceptedItems: acceptedItems || []
//         };

//         const recycleCentre = await RecycleCentre.findOneAndUpdate(
//             {recycleCentre_id}, 
//             updateData, 
//             {new: true}
//         ).select('-password');

//         if(!recycleCentre) return res.status(404).json("Recycle centre not found");
        
//         res.json({ message: "Recycle centre updated successfully", recycleCentre });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// exports.updatePassword = async (req, res) => {
//     try{
//         const recycleCentre_id = req.body.recycleCentreId;
//         const {password, confirmPassword} = req.body;

//         if(password !== confirmPassword){
//             return res.status(400).json({message: "Passwords do not match"});
//         }

//         const hashedPassword = await bcrypt.hash(password, 12);
//         const recycleCentre = await RecycleCentre.findOneAndUpdate(
//             {recycleCentre_id}, 
//             {password: hashedPassword}, 
//             {new: true}
//         );

//         res.status(200).json({message: "Password updated successfully!"});
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

// exports.deleteRecycleCentre = async(req, res) => {
//     try{
//         const recycleCentre_id = req.query.id;
//         const recycleCentre = await RecycleCentre.findOneAndDelete({recycleCentre_id});
//         res.status(200).json({message: "Recycle centre deleted successfully!"});
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

const RecycleCentre = require('../models/recycleCentre');
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Get all recycle centres (public)
exports.getRecycleCentres = async (req, res) => {
    try {
        const recycleCentres = await RecycleCentre.find().select('-password');
        res.status(200).json(recycleCentres);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get recycle centre by ID
exports.getRecycleCentreById = async(req, res) => {
    try {
        const id = req.query.id;
        const recycleCentre = await RecycleCentre.findOne({ recycleCentre_id: id }).select('-password');

        if (!recycleCentre) return res.status(404).json("Recycle centre not found");

        res.status(200).json(recycleCentre);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get recycle centre by email
exports.getRecycleCentreByEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const recycleCentre = await RecycleCentre.findOne({ email: email }).select('-password');

        if (!recycleCentre) return res.status(404).json("Recycle centre not found");

        res.status(200).json(recycleCentre);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Register new recycle centre
exports.addRecycleCentre = async (req, res) => {
    try {
        const {
            name,
            address,
            contactNumber,
            email,
            password,
            confirmPassword,
            website,
            city,
            district,
            acceptedItems
        } = req.body;

        const isRecycleCentreExist = await RecycleCentre.findOne({ email });
        if (isRecycleCentreExist) {
            return res.status(400).json({ message: "Recycle centre with this email already exists." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
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
                city: city.toLowerCase().trim(),
                district: district.toLowerCase().trim()
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
                contactNumber: recycleCentre.contactNumber,
                location: recycleCentre.location
            }
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

// Update recycle centre
exports.updateRecycleCentre = async (req, res) => {
    try {
        const {
            name,
            address,
            contactNumber,
            email,
            website,
            city,
            district,
            acceptedItems
        } = req.body;

        const recycleCentre_id = req.body.recycleCentreId; 
        
        const existingRecycleCentre = await RecycleCentre.findOne({ recycleCentre_id });
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
                city: city?.toLowerCase().trim(),
                district: district?.toLowerCase().trim()
            },
            acceptedItems: acceptedItems || []
        };

        const recycleCentre = await RecycleCentre.findOneAndUpdate(
            { recycleCentre_id }, 
            updateData, 
            { new: true }
        ).select('-password');

        if (!recycleCentre) return res.status(404).json("Recycle centre not found");
        
        res.json({ message: "Recycle centre updated successfully", recycleCentre });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update password
exports.updatePassword = async (req, res) => {
    try {
        const recycleCentre_id = req.body.recycleCentreId;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await RecycleCentre.findOneAndUpdate(
            { recycleCentre_id }, 
            { password: hashedPassword }, 
            { new: true }
        );

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete recycle centre
exports.deleteRecycleCentre = async (req, res) => {
    try {
        const recycleCentre_id = req.query.id;
        await RecycleCentre.findOneAndDelete({ recycleCentre_id });
        res.status(200).json({ message: "Recycle centre deleted successfully!" });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Add these new functions to your backend/controllers/recycleCentreController.js

// Get centres by district and city with optional item filter
exports.getCentresByArea = async (req, res) => {
    try {
        const district = (req.query.district || '').toLowerCase().trim();
        const city = (req.query.city || '').toLowerCase().trim();
        const acceptedItems = req.query.acceptedItems ? 
            req.query.acceptedItems.split(',').map(item => item.trim().toLowerCase()) : 
            [];

        if (!district) {
            return res.status(400).json({ 
                success: false, 
                message: 'District is required' 
            });
        }

        // Build query - prioritize same city, then same district
        let query = { 'location.district': district };
        
        // If city is provided, prefer exact city matches first
        if (city) {
            query['location.city'] = city;
        }

        // Filter by accepted items if provided
        if (acceptedItems.length > 0) {
            query.acceptedItems = { 
                $in: acceptedItems.map(item => new RegExp(item, 'i')) 
            };
        }

        const sortObj = { name: 1 };
        if (city) {
            sortObj['location.city'] = 1;
        }
        const centres = await RecycleCentre.find(query).select('-password').sort(sortObj);

        // If no exact city match and city was provided, try broader district search
        let alternateCentres = [];
        if (city && centres.length === 0) {
            const broadQuery = { 'location.district': district };
            if (acceptedItems.length > 0) {
                broadQuery.acceptedItems = { 
                    $in: acceptedItems.map(item => new RegExp(item, 'i')) 
                };
            }
            alternateCentres = await RecycleCentre.find(broadQuery).select('-password').sort({ name: 1 });
        }

        const finalCentres = centres.length > 0 ? centres : alternateCentres;

        res.status(200).json({
            success: true,
            count: finalCentres.length,
            searchCriteria: {
                district,
                city: city || null,
                acceptedItems: acceptedItems.length > 0 ? acceptedItems : null
            },
            centres: finalCentres
        });
    } catch (error) {
        console.error('Error fetching centres by area:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recycle centres',
            error: error.message
        });
    }
};

exports.getSuggestedCentres = async (req, res) => {
    try {
        const { district, city, categories } = req.body;
        
        if (!district) {
            return res.status(400).json({ 
                success: false, 
                message: 'District is required' 
            });
        }

        // Extract categories with quantity > 0 and map them to searchable terms
        const recycleItems = [];
        if (categories) {
            Object.entries(categories).forEach(([key, quantity]) => {
                if (quantity > 0) {
                    // Enhanced mapping for better matching
                    const itemMap = {
                        metal: ['metal', 'aluminum', 'aluminium', 'steel', 'iron', 'copper', 'brass', 'tin'],
                        plastic: ['plastic', 'pet', 'bottle', 'container', 'polypropylene', 'polyethylene'],
                        polythene: ['polythene', 'plastic', 'bag', 'shopping bag', 'carrier bag'],
                        eWaste: ['electronic', 'ewaste', 'e-waste', 'computer', 'phone', 'mobile', 'laptop', 'tablet', 'appliance'],
                        clothes: ['textile', 'clothes', 'fabric', 'clothing', 'garment', 'apparel', 'cotton', 'wool'],
                        paper: ['paper', 'cardboard', 'newspaper', 'magazine', 'book', 'document', 'office paper'],
                        regiform: ['foam', 'polystyrene', 'styrofoam', 'expanded polystyrene', 'eps']
                    };
                    recycleItems.push(...(itemMap[key] || [key]));
                }
            });
        }

        // Build base query
        const baseQuery = { 'location.district': district.toLowerCase().trim() };

        // First, try to find centers in the same city
        let centres = [];
        if (city) {
            const cityQuery = {
                ...baseQuery,
                'location.city': city.toLowerCase().trim()
            };
            centres = await RecycleCentre.find(cityQuery).select('-password');
        }

        // If no centers found in the city, expand to district level
        if (centres.length === 0) {
            centres = await RecycleCentre.find(baseQuery).select('-password');
        }

        // Score and filter centres based on accepted items
        if (recycleItems.length > 0) {
            centres = centres.map(centre => {
                const acceptedItems = centre.acceptedItems || [];
                let matchScore = 0;
                
                recycleItems.forEach(item => {
                    const matches = acceptedItems.some(accepted => {
                        const acceptedLower = accepted.toLowerCase();
                        const itemLower = item.toLowerCase();
                        return acceptedLower.includes(itemLower) || 
                               itemLower.includes(acceptedLower) ||
                               // Check for partial matches
                               acceptedLower.split(' ').some(word => itemLower.includes(word)) ||
                               itemLower.split(' ').some(word => acceptedLower.includes(word));
                    });
                    if (matches) matchScore++;
                });

                return {
                    ...centre.toObject(),
                    matchScore,
                    matchPercentage: recycleItems.length > 0 ? 
                        Math.round((matchScore / recycleItems.length) * 100) : 0
                };
            });

            // Sort by match score (highest first), then by name
            centres.sort((a, b) => {
                if (b.matchScore !== a.matchScore) {
                    return b.matchScore - a.matchScore;
                }
                return a.name.localeCompare(b.name);
            });

            // Optionally filter out centers with very low match scores
            // centres = centres.filter(centre => centre.matchScore > 0);
        }

        res.status(200).json({
            success: true,
            count: centres.length,
            searchCriteria: {
                district,
                city: city || null,
                recycleItems: recycleItems.length > 0 ? recycleItems : null
            },
            centres
        });

    } catch (error) {
        console.error('Error getting suggested centres:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get suggested centres',
            error: error.message
        });
    }
};