// const RecycleForm = require('../models/recycleFormModel');
// const User = require('../models/user'); // Adjust path according to your structure
// const mongoose = require('mongoose');

// const recycleController = {
//     // Create new recycle form
//     createRecycleForm: async (req, res) => {
//         try {
//             const { categories, location, notes } = req.body;
//             const userId = req.user.id;

//             // Validate required fields
//             if (!location || !location.district || !location.city) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'District and city are required'
//                 });
//             }

//             // Check if at least one category has quantity > 0
//             const hasQuantity = Object.values(categories || {}).some(qty => qty > 0);
//             if (!hasQuantity) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Please enter quantity for at least one category'
//                 });
//             }

//             const recycleForm = new RecycleForm({
//                 userId,
//                 categories: categories || {},
//                 location,
//                 notes
//             });

//             const savedForm = await recycleForm.save();
//             await savedForm.populate('userId', 'firstName lastName email totalPoints user_level');

//             res.status(201).json({
//                 success: true,
//                 message: 'Recycle form submitted successfully',
//                 data: savedForm,
//                 pointsEarned: savedForm.pointsEarned
//             });
//         } catch (error) {
//             console.error('Error creating recycle form:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error submitting recycle form',
//                 error: error.message
//             });
//         }
//     },

//     // Award points to user (can be called when form status changes to 'completed')
//     awardPointsToUser: async (req, res) => {
//         try {
//             const { id } = req.params; // form_id
//             const userId = req.user.id;

//             // Check if id is a number (form_id)
//             if (isNaN(id)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Invalid form ID'
//                 });
//             }

//             const form = await RecycleForm.findOne({ form_id: parseInt(id), userId });

//             if (!form) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Recycle form not found'
//                 });
//             }

//             if (form.pointsAwarded) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Points already awarded for this form'
//                 });
//             }

//             if (form.status !== 'completed') {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Points can only be awarded for completed forms'
//                 });
//             }

//             // Update user's total points and add to history using the User model method
//             const user = await User.findById(userId);
//             if (!user) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'User not found'
//                 });
//             }

//             // Use the User model's addPoints method
//             await user.addPoints(
//                 form.pointsEarned, 
//                 form._id, 
//                 `Points earned from recycling ${form.totalQuantity} units (Form #${form.form_id})`
//             );

//             // Mark points as awarded
//             form.pointsAwarded = true;
//             await form.save();

//             res.status(200).json({
//                 success: true,
//                 message: 'Points awarded successfully',
//                 pointsAwarded: form.pointsEarned,
//                 totalPoints: user.totalPoints,
//                 userLevel: user.getUserLevel()
//             });
//         } catch (error) {
//             console.error('Error awarding points:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error awarding points',
//                 error: error.message
//             });
//         }
//     },

//     // Update form status (admin function - can trigger point awarding)
//     updateFormStatus: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const { status } = req.body;
            
//             if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Invalid status'
//                 });
//             }

//             const form = await RecycleForm.findOne({ form_id: parseInt(id) });
//             if (!form) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Recycle form not found'
//                 });
//             }

//             const oldStatus = form.status;
//             form.status = status;
//             await form.save();

//             let pointsAwarded = 0;

//             // Auto-award points when status changes to 'completed'
//             if (status === 'completed' && oldStatus !== 'completed' && !form.pointsAwarded) {
//                 try {
//                     const user = await User.findById(form.userId);
//                     if (user) {
//                         // Use the User model's addPoints method
//                         await user.addPoints(
//                             form.pointsEarned, 
//                             form._id, 
//                             `Points earned from recycling ${form.totalQuantity} units (Form #${form.form_id})`
//                         );

//                         form.pointsAwarded = true;
//                         await form.save();
//                         pointsAwarded = form.pointsEarned;
//                     }
//                 } catch (pointError) {
//                     console.error('Error auto-awarding points:', pointError);
//                 }
//             }

//             await form.populate('userId', 'firstName lastName email totalPoints user_level');

//             res.status(200).json({
//                 success: true,
//                 message: 'Form status updated successfully',
//                 data: form,
//                 pointsAwarded: pointsAwarded
//             });
//         } catch (error) {
//             console.error('Error updating form status:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error updating form status',
//                 error: error.message
//             });
//         }
//     },

//     // Get all recycle forms for logged-in user
//     getUserRecycleForms: async (req, res) => {
//         try {
//             const userId = req.user.id;
//             const { page = 1, limit = 10, status } = req.query;

//             const query = { userId };
//             if (status) {
//                 query.status = status;
//             }

//             const forms = await RecycleForm.find(query)
//                 .populate('userId', 'firstName lastName email totalPoints user_level')
//                 .sort({ createdAt: -1 })
//                 .limit(limit * 1)
//                 .skip((page - 1) * limit);

//             const total = await RecycleForm.countDocuments(query);

//             // Get user's current total points
//             const user = await User.findById(userId).select('totalPoints user_level firstName lastName');

//             res.status(200).json({
//                 success: true,
//                 data: forms,
//                 userInfo: {
//                     totalPoints: user.totalPoints,
//                     userLevel: user.user_level,
//                     fullName: `${user.firstName} ${user.lastName}`
//                 },
//                 pagination: {
//                     current: parseInt(page),
//                     total: Math.ceil(total / limit),
//                     count: total
//                 }
//             });
//         } catch (error) {
//             console.error('Error fetching recycle forms:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error fetching recycle forms',
//                 error: error.message
//             });
//         }
//     },

//     // Get single recycle form by form_id
//     getRecycleForm: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const userId = req.user.id;

//             // Check if id is a number (form_id)
//             if (isNaN(id)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Invalid form ID'
//                 });
//             }

//             const form = await RecycleForm.findOne({ form_id: parseInt(id), userId })
//                 .populate('userId', 'firstName lastName email totalPoints user_level');

//             if (!form) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Recycle form not found'
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 data: form
//             });
//         } catch (error) {
//             console.error('Error fetching recycle form:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error fetching recycle form',
//                 error: error.message
//             });
//         }
//     },

//     // Update recycle form by form_id (only if status is pending)
//     updateRecycleForm: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const { categories, location, notes } = req.body;
//             const userId = req.user.id;

//             // Check if id is a number (form_id)
//             if (isNaN(id)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Invalid form ID'
//                 });
//             }

//             const form = await RecycleForm.findOne({ form_id: parseInt(id), userId });

//             if (!form) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Recycle form not found'
//                 });
//             }

//             if (form.status !== 'pending') {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Cannot update form that is not in pending status'
//                 });
//             }

//             // Check if at least one category has quantity > 0
//             if (categories) {
//                 const hasQuantity = Object.values(categories).some(qty => qty > 0);
//                 if (!hasQuantity) {
//                     return res.status(400).json({
//                         success: false,
//                         message: 'Please enter quantity for at least one category'
//                     });
//                 }
//             }

//             const updateData = {};
//             if (categories) updateData.categories = categories;
//             if (location) updateData.location = location;
//             if (notes !== undefined) updateData.notes = notes;

//             const updatedForm = await RecycleForm.findOneAndUpdate(
//                 { form_id: parseInt(id) },
//                 updateData,
//                 { new: true, runValidators: true }
//             ).populate('userId', 'firstName lastName email totalPoints user_level');

//             res.status(200).json({
//                 success: true,
//                 message: 'Recycle form updated successfully',
//                 data: updatedForm,
//                 pointsEarned: updatedForm.pointsEarned
//             });
//         } catch (error) {
//             console.error('Error updating recycle form:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error updating recycle form',
//                 error: error.message
//             });
//         }
//     },

//     // Delete recycle form by form_id (only if status is pending)
//     deleteRecycleForm: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const userId = req.user.id;

//             // Check if id is a number (form_id)
//             if (isNaN(id)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Invalid form ID'
//                 });
//             }

//             const form = await RecycleForm.findOne({ form_id: parseInt(id), userId });

//             if (!form) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Recycle form not found'
//                 });
//             }

//             if (form.status !== 'pending') {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Cannot delete form that is not in pending status'
//                 });
//             }

//             await RecycleForm.findOneAndDelete({ form_id: parseInt(id) });

//             res.status(200).json({
//                 success: true,
//                 message: 'Recycle form deleted successfully'
//             });
//         } catch (error) {
//             console.error('Error deleting recycle form:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error deleting recycle form',
//                 error: error.message
//             });
//         }
//     },

//     // Get districts list
//     getDistricts: async (req, res) => {
//         try {
//             const districts = [
//                 'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
//                 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
//                 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
//                 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
//                 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
//             ];

//             res.status(200).json({
//                 success: true,
//                 data: districts
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: 'Error fetching districts',
//                 error: error.message
//             });
//         }
//     },

//     // Get user's recycling statistics with points
//     getUserStats: async (req, res) => {
//         try {
//             const userId = req.user.id;

//             const stats = await RecycleForm.aggregate([
//                 { $match: { userId: userId } },
//                 {
//                     $group: {
//                         _id: null,
//                         totalForms: { $sum: 1 },
//                         totalQuantity: { $sum: '$totalQuantity' },
//                         totalPointsEarned: { $sum: '$pointsEarned' },
//                         pointsAwarded: { $sum: { $cond: ['$pointsAwarded', '$pointsEarned', 0] } },
//                         metalTotal: { $sum: '$categories.metal' },
//                         plasticTotal: { $sum: '$categories.plastic' },
//                         polytheneTotal: { $sum: '$categories.polythene' },
//                         eWasteTotal: { $sum: '$categories.eWaste' },
//                         clothesTotal: { $sum: '$categories.clothes' },
//                         paperTotal: { $sum: '$categories.paper' },
//                         regiformTotal: { $sum: '$categories.regiform' },
//                         pending: {
//                             $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
//                         },
//                         processing: {
//                             $sum: { $cond: [{ $eq: ['$status', 'processing'] }, 1, 0] }
//                         },
//                         completed: {
//                             $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
//                         },
//                         cancelled: {
//                             $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
//                         }
//                     }
//                 }
//             ]);

//             // Get user's current total points from User model
//             const user = await User.findById(userId).select('totalPoints user_level firstName lastName');
            
//             const result = stats.length > 0 ? stats[0] : {
//                 totalForms: 0,
//                 totalQuantity: 0,
//                 totalPointsEarned: 0,
//                 pointsAwarded: 0,
//                 metalTotal: 0,
//                 plasticTotal: 0,
//                 polytheneTotal: 0,
//                 eWasteTotal: 0,
//                 clothesTotal: 0,
//                 paperTotal: 0,
//                 regiformTotal: 0,
//                 pending: 0,
//                 processing: 0,
//                 completed: 0,
//                 cancelled: 0
//             };

//             // Add user's total accumulated points and profile info
//             result.userProfile = {
//                 totalPoints: user ? user.totalPoints : 0,
//                 userLevel: user ? user.user_level : 'Bronze',
//                 fullName: user ? `${user.firstName} ${user.lastName}` : 'Unknown User',
//                 totalFormsSubmitted: result.totalForms,
//                 totalItemsRecycled: result.totalQuantity
//             };

//             res.status(200).json({
//                 success: true,
//                 data: result
//             });
//         } catch (error) {
//             console.error('Error fetching user stats:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error fetching statistics',
//                 error: error.message
//             });
//         }
//     },

//     // Get user's points history
//     getUserPointsHistory: async (req, res) => {
//         try {
//             const userId = req.user.id;
//             const { page = 1, limit = 10 } = req.query;

//             const user = await User.findById(userId)
//                 .select('totalPoints pointsHistory firstName lastName user_level')
//                 .populate({
//                     path: 'pointsHistory.recycleFormId',
//                     select: 'form_id totalQuantity status createdAt'
//                 });

//             if (!user) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'User not found'
//                 });
//             }

//             // Sort points history by date (newest first)
//             const sortedHistory = user.pointsHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

//             // Paginate
//             const startIndex = (page - 1) * limit;
//             const endIndex = page * limit;
//             const paginatedHistory = sortedHistory.slice(startIndex, endIndex);

//             res.status(200).json({
//                 success: true,
//                 data: {
//                     userProfile: {
//                         fullName: `${user.firstName} ${user.lastName}`,
//                         totalPoints: user.totalPoints,
//                         userLevel: user.user_level
//                     },
//                     pointsHistory: paginatedHistory,
//                     pagination: {
//                         current: parseInt(page),
//                         total: Math.ceil(user.pointsHistory.length / limit),
//                         count: user.pointsHistory.length
//                     }
//                 }
//             });
//         } catch (error) {
//             console.error('Error fetching points history:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error fetching points history',
//                 error: error.message
//             });
//         }
//     },

//     // Get user profile with total points (NEW ENDPOINT)
//     getUserProfile: async (req, res) => {
//         try {
//             const userId = req.user.id;

//             const user = await User.findById(userId).select('firstName lastName email totalPoints user_level profilePic createdAt');
            
//             if (!user) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'User not found'
//                 });
//             }

//             // Get total forms submitted by user
//             const totalFormsSubmitted = await RecycleForm.countDocuments({ userId });
            
//             // Get total items recycled
//             const recyclingStats = await RecycleForm.aggregate([
//                 { $match: { userId: userId } },
//                 {
//                     $group: {
//                         _id: null,
//                         totalItemsRecycled: { $sum: '$totalQuantity' },
//                         completedForms: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
//                         totalPointsEarned: { $sum: '$pointsEarned' },
//                         pointsAwarded: { $sum: { $cond: ['$pointsAwarded', '$pointsEarned', 0] } }
//                     }
//                 }
//             ]);

//             const stats = recyclingStats.length > 0 ? recyclingStats[0] : {
//                 totalItemsRecycled: 0,
//                 completedForms: 0,
//                 totalPointsEarned: 0,
//                 pointsAwarded: 0
//             };

//             res.status(200).json({
//                 success: true,
//                 data: {
//                     profile: {
//                         fullName: `${user.firstName} ${user.lastName}`,
//                         email: user.email,
//                         totalPoints: user.totalPoints, // This is the cumulative points from all submissions
//                         userLevel: user.user_level,
//                         profilePic: user.profilePic,
//                         memberSince: user.createdAt
//                     },
//                     recyclingStats: {
//                         totalFormsSubmitted: totalFormsSubmitted,
//                         completedForms: stats.completedForms,
//                         totalItemsRecycled: stats.totalItemsRecycled,
//                         totalPointsEarned: stats.totalPointsEarned,
//                         pointsAwarded: stats.pointsAwarded,
//                         pendingPoints: stats.totalPointsEarned - stats.pointsAwarded
//                     }
//                 }
//             });
//         } catch (error) {
//             console.error('Error fetching user profile:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Error fetching user profile',
//                 error: error.message
//             });
//         }
//     }
// };

// module.exports = recycleController;

// controllers/recycleController.js
const RecycleForm = require('../models/recycleFormModel');
const User = require('../models/user');

// Read user id from token payload or request — adjust if your token uses different field
function getAuthUserId(req) {
  // You may store numeric user_id or DB _id; here we assume user_id was embedded
  // Fallback to req.user.id if you store Mongo ObjectId in token
  return String(req.user?.id || req.user?.user_id || req.body.userId || req.query.userId || '');
}

// Helper: fetch user by user_id (string/number) with role='customer'
async function findCustomerByUserId(user_id) {
  // user_id in DB is Number; convert from string if needed
  const numericId = Number(user_id);
  return await User.findOne({ user_id: numericId, role: 'customer' });
}

// ------------------ Create Recycle Form (award immediately) ------------------
exports.createRecycleForm = async (req, res) => {
  try {
    const user_id = getAuthUserId(req) || req.body.userId; // string form id used by your app
    if (!user_id) return res.status(400).json({ message: 'Missing userId' });

    const form = new RecycleForm({
      userId: String(user_id),
      categories: req.body.categories || {},
      location: req.body.location,
      status: 'pending',
      notes: req.body.notes || ''
    });

    await form.save(); // pre-save computes totalQuantity & pointsEarned

    // award immediately at submission
    const user = await findCustomerByUserId(user_id);
    if (!user) return res.status(404).json({ message: 'Customer not found' });

    if (!form.pointsAwarded && form.pointsEarned > 0) {
      await user.addPoints(form.pointsEarned, form._id, 'Points from recycling submission');
      form.pointsAwarded = true;
      await form.save();
    }

    const profile = {
      totalPoints: user.totalPoints,
      user_level: user.user_level,
      badges: user.getBadges()
    };

    return res.status(201).json({ message: 'Recycle form created', form, profile });
  } catch (err) {
    console.error('createRecycleForm error', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ Get all forms for logged-in user ------------------
exports.getUserRecycleForms = async (req, res) => {
  try {
    const user_id = getAuthUserId(req) || req.query.userId;
    const forms = await RecycleForm.find({ userId: String(user_id) }).sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ Profile (points + level + badges) ------------------
exports.getUserProfile = async (req, res) => {
  try {
    const user_id = getAuthUserId(req) || req.query.userId;
    const user = await findCustomerByUserId(user_id);
    if (!user) return res.status(404).json({ message: 'Customer not found' });

    const totals = await RecycleForm.aggregate([
      { $match: { userId: String(user_id) } },
      {
        $group: {
          _id: '$userId',
          totalForms: { $sum: 1 },
          totalKg: { $sum: '$totalQuantity' },
          lastSubmission: { $max: '$createdAt' }
        }
      }
    ]);

    const info = totals[0] || { totalForms: 0, totalKg: 0, lastSubmission: null };

    res.json({
      user: {
        user_id: user.user_id,
        name: user.fullName,
        email: user.email,
        user_level: user.user_level
      },
      totalPoints: user.totalPoints,
      badges: user.getBadges(),
      totals: info
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ District list ------------------
exports.getDistricts = async (_req, res) => {
  res.json([
    'Ampara','Anuradhapura','Badulla','Batticaloa','Colombo',
    'Galle','Gampaha','Hambantota','Jaffna','Kalutara',
    'Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar',
    'Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya',
    'Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya'
  ]);
};

// ------------------ Stats (by month & categories) ------------------
exports.getUserStats = async (req, res) => {
  try {
    const user_id = getAuthUserId(req) || req.query.userId;

    const byMonth = await RecycleForm.aggregate([
      { $match: { userId: String(user_id) } },
      {
        $group: {
          _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } },
          totalKg: { $sum: '$totalQuantity' },
          totalPoints: { $sum: '$pointsEarned' }
        }
      },
      { $sort: { '_id.y': 1, '_id.m': 1 } }
    ]);

    const byCategory = await RecycleForm.aggregate([
      { $match: { userId: String(user_id) } },
      {
        $group: {
          _id: '$userId',
          metal:   { $sum: '$categories.metal' },
          plastic: { $sum: '$categories.plastic' },
          polythene:{ $sum: '$categories.polythene' },
          eWaste:  { $sum: '$categories.eWaste' },
          clothes: { $sum: '$categories.clothes' },
          paper:   { $sum: '$categories.paper' },
          regiform:{ $sum: '$categories.regiform' },
        }
      }
    ]);

    res.json({ byMonth, byCategory: byCategory[0] || {} });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ Points history ------------------
exports.getUserPointsHistory = async (req, res) => {
  try {
    const user_id = getAuthUserId(req) || req.query.userId;
    const user = await findCustomerByUserId(user_id);
    if (!user) return res.status(404).json({ message: 'Customer not found' });

    // latest first
    const history = [...user.pointsHistory].sort((a, b) => b.date - a.date);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ Award points (manual) ------------------
exports.awardPointsToUser = async (req, res) => {
  try {
    const formId = req.params.id;
    const form = await RecycleForm.findById(formId);
    if (!form) return res.status(404).json({ message: 'Recycle form not found' });

    const user = await findCustomerByUserId(form.userId);
    if (!user) return res.status(404).json({ message: 'Customer not found' });

    if (!form.pointsAwarded && form.pointsEarned > 0) {
      await user.addPoints(form.pointsEarned, form._id, 'Manual award');
      form.pointsAwarded = true;
      await form.save();
    }

    res.json({ message: 'Points awarded', totalPoints: user.totalPoints, user_level: user.user_level });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ Admin: update form status (auto award/refund) ------------------
exports.updateFormStatus = async (req, res) => {
  try {
    const formId = req.params.id;
    const { status } = req.body;

    const form = await RecycleForm.findById(formId);
    if (!form) return res.status(404).json({ message: 'Recycle form not found' });

    const user = await findCustomerByUserId(form.userId);
    if (!user) return res.status(404).json({ message: 'Customer not found' });

    const prevStatus = form.status;
    form.status = status;

    // transitions
    if (status === 'completed' && !form.pointsAwarded && form.pointsEarned > 0) {
      await user.addPoints(form.pointsEarned, form._id, 'Auto award on completion');
      form.pointsAwarded = true;
    }

    if ((status === 'cancelled' || status === 'pending') && prevStatus === 'completed' && form.pointsAwarded) {
      // refund
      await user.removePoints(form.pointsEarned, form._id, 'Refund after status change');
      form.pointsAwarded = false;
    }

    await form.save();
    res.json({ message: 'Status updated', form, totalPoints: user.totalPoints, user_level: user.user_level });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ Get single form ------------------
exports.getRecycleForm = async (req, res) => {
  try {
    const form = await RecycleForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Not found' });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ Update form (recalc and adjust points) ------------------
exports.updateRecycleForm = async (req, res) => {
  try {
    const form = await RecycleForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Not found' });

    // Only allow edit if not cancelled; adapt to your rule
    if (form.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending forms can be edited' });
    }

    const oldPoints = form.pointsEarned;

    // Update fields
    if (req.body.categories) form.categories = req.body.categories;
    if (req.body.location) form.location = req.body.location;
    if (typeof req.body.notes === 'string') form.notes = req.body.notes;

    await form.save(); // this recalculates points via pre-save
    const newPoints = form.pointsEarned;

    // If already awarded (we award at submit), adjust delta
    if (form.pointsAwarded && oldPoints !== newPoints) {
      const user = await findCustomerByUserId(form.userId);
      if (!user) return res.status(404).json({ message: 'Customer not found' });

      if (newPoints > oldPoints) {
        await user.addPoints(newPoints - oldPoints, form._id, 'Adjustment after edit (+)');
      } else if (oldPoints > newPoints) {
        await user.removePoints(oldPoints - newPoints, form._id, 'Adjustment after edit (-)');
      }
    }

    res.json({ message: 'Recycle form updated', form });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ------------------ Delete form (refund if needed) ------------------
exports.deleteRecycleForm = async (req, res) => {
  try {
    const form = await RecycleForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Not found' });

    // Only allow delete if pending; adapt rule as needed
    if (form.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending forms can be deleted' });
    }

    if (form.pointsAwarded && form.pointsEarned > 0) {
      const user = await findCustomerByUserId(form.userId);
      if (user) {
        await user.removePoints(form.pointsEarned, form._id, 'Refund on form delete');
      }
    }

    await form.deleteOne();
    res.json({ message: 'Recycle form deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// ... keep ALL your existing exports above ...

/* =======================
 *       ADMIN STATS
 * ======================= */

// GET /api/recycle/admin/overview
// KPIs + by-district
exports.getAdminOverview = async (_req, res) => {
  try {
    const [totals, byDistrictAgg, userCount, activeUsers] = await Promise.all([
      RecycleForm.aggregate([
        {
          $group: {
            _id: null,
            totalForms: { $sum: 1 },
            totalKg: { $sum: '$totalQuantity' },
            totalPoints: { $sum: '$pointsEarned' }
          }
        }
      ]),
      RecycleForm.aggregate([
        {
          $group: {
            _id: '$location.district',
            totalKg: { $sum: '$totalQuantity' },
            forms: { $sum: 1 }
          }
        },
        { $sort: { totalKg: -1 } }
      ]),
      User.countDocuments({}),
      User.countDocuments({ userStatus: 'active' })
    ]);

    const t = totals[0] || { totalForms: 0, totalKg: 0, totalPoints: 0 };
    res.json({
      kpis: {
        totalForms: t.totalForms,
        totalKg: t.totalKg,
        totalPoints: t.totalPoints,
        totalUsers: userCount,
        activeUsers
      },
      byDistrict: byDistrictAgg
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/recycle/admin/by-month
exports.getAdminByMonth = async (_req, res) => {
  try {
    const byMonth = await RecycleForm.aggregate([
      {
        $group: {
          _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } },
          totalKg: { $sum: '$totalQuantity' },
          totalPoints: { $sum: '$pointsEarned' },
          forms: { $sum: 1 }
        }
      },
      { $sort: { '_id.y': 1, '_id.m': 1 } }
    ]);

    // format to {monthLabel, totalKg, totalPoints, forms}
    const fmt = byMonth.map((r) => {
      const m = r._id.m.toString().padStart(2, '0');
      return {
        month: `${r._id.y}-${m}`,
        totalKg: r.totalKg,
        totalPoints: r.totalPoints,
        forms: r.forms
      };
    });

    res.json(fmt);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/recycle/admin/by-category
exports.getAdminByCategory = async (_req, res) => {
  try {
    const byCategory = await RecycleForm.aggregate([
      {
        $group: {
          _id: null,
          metal: { $sum: '$categories.metal' },
          plastic: { $sum: '$categories.plastic' },
          polythene: { $sum: '$categories.polythene' },
          eWaste: { $sum: '$categories.eWaste' },
          clothes: { $sum: '$categories.clothes' },
          paper: { $sum: '$categories.paper' },
          regiform: { $sum: '$categories.regiform' }
        }
      }
    ]);
    res.json(byCategory[0] || {});
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/recycle/admin/recent-forms?limit=10
exports.getAdminRecentForms = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const forms = await RecycleForm.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // attach user basic info
    const usersMap = new Map();
    for (const f of forms) {
      if (!usersMap.has(f.userId)) {
        const u = await User.findOne({ user_id: Number(f.userId) })
          .select('firstName lastName email user_id')
          .lean();
        usersMap.set(f.userId, u || null);
      }
      f.user = usersMap.get(f.userId);
    }

    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/recycle/admin/top-users?limit=5
exports.getAdminTopUsers = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 5, 50);

    // Leaderboard by totalPoints (from User doc)
    const users = await User.find({ role: 'customer' })
      .select('firstName lastName email user_id totalPoints user_level')
      .sort({ totalPoints: -1 })
      .limit(limit)
      .lean();

    // Also compute totalKg per user from forms
    const byUserKg = await RecycleForm.aggregate([
      { $group: { _id: '$userId', totalKg: { $sum: '$totalQuantity' }, forms: { $sum: 1 } } }
    ]);
    const kgMap = new Map(byUserKg.map((r) => [r._id, r]));

    const out = users.map((u) => {
      const kg = kgMap.get(String(u.user_id));
      return {
        ...u,
        totalKg: kg?.totalKg || 0,
        forms: kg?.forms || 0
      };
    });

    res.json(out);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
