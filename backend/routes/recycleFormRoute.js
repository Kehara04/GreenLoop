// // const express = require('express');
// // const router = express.Router();
// // const recycleController = require('../controllers/recycleController');
// // const authMiddleware = require('../middleware/authMiddleware');

// // // Apply authentication middleware to all routes
// // const userAuth = authMiddleware(['customer', 'admin']);
// // const adminAuth = authMiddleware(['admin']); // For admin-only routes

// // // @route   POST /api/recycle
// // // @desc    Create new recycle form
// // // @access  Private (authenticated users)
// // router.post('/', userAuth, recycleController.createRecycleForm);

// // // @route   GET /api/recycle
// // // @desc    Get all recycle forms for logged-in user
// // // @access  Private (authenticated users)
// // router.get('/', userAuth, recycleController.getUserRecycleForms);

// // // @route   GET /api/recycle/profile
// // // @desc    Get user profile with total points from all submissions
// // // @access  Private (authenticated users)
// // router.get('/profile', userAuth, recycleController.getUserProfile);

// // // @route   GET /api/recycle/districts
// // // @desc    Get list of districts
// // // @access  Private (authenticated users)
// // router.get('/districts', userAuth, recycleController.getDistricts);

// // // @route   GET /api/recycle/stats
// // // @desc    Get user's recycling statistics with points
// // // @access  Private (authenticated users)
// // router.get('/stats', userAuth, recycleController.getUserStats);

// // // @route   GET /api/recycle/points-history
// // // @desc    Get user's points history
// // // @access  Private (authenticated users)
// // router.get('/points-history', userAuth, recycleController.getUserPointsHistory);

// // // @route   POST /api/recycle/:id/award-points
// // // @desc    Award points to user for completed form (manual)
// // // @access  Private (authenticated users)
// // router.post('/:id/award-points', userAuth, recycleController.awardPointsToUser);

// // // @route   PUT /api/recycle/:id/status
// // // @desc    Update form status (admin only) - auto-awards points when completed
// // // @access  Private (admin only)
// // router.put('/:id/status', adminAuth, recycleController.updateFormStatus);

// // // @route   GET /api/recycle/:id
// // // @desc    Get single recycle form by ID
// // // @access  Private (authenticated users)
// // router.get('/:id', userAuth, recycleController.getRecycleForm);

// // // @route   PUT /api/recycle/:id
// // // @desc    Update recycle form (only if status is pending)
// // // @access  Private (authenticated users)
// // router.put('/:id', userAuth, recycleController.updateRecycleForm);

// // // @route   DELETE /api/recycle/:id
// // // @desc    Delete recycle form (only if status is pending)
// // // @access  Private (authenticated users)
// // router.delete('/:id', userAuth, recycleController.deleteRecycleForm);

// // module.exports = router;


// // routes/recycleFormRoute.js
// const express = require('express');
// const router = express.Router();
// const recycleController = require('../controllers/recycleController');
// const authMiddleware = require('../middleware/authMiddleware');

// const userAuth = authMiddleware(['customer', 'admin']);
// const adminAuth = authMiddleware(['admin']);

// // Create + award immediately
// router.post('/', userAuth, recycleController.createRecycleForm);

// // My forms
// router.get('/', userAuth, recycleController.getUserRecycleForms);

// // Profile with totalPoints + badges
// router.get('/profile', userAuth, recycleController.getUserProfile);

// // Districts
// router.get('/districts', userAuth, recycleController.getDistricts);

// // Stats + points history
// router.get('/stats', userAuth, recycleController.getUserStats);
// router.get('/points-history', userAuth, recycleController.getUserPointsHistory);

// // Manual award (optional)
// router.post('/:id/award-points', userAuth, recycleController.awardPointsToUser);

// // Admin status change (auto award/refund)
// router.put('/:id/status', adminAuth, recycleController.updateFormStatus);

// // Single form CRUD
// router.get('/:id', userAuth, recycleController.getRecycleForm);
// router.put('/:id', userAuth, recycleController.updateRecycleForm);
// router.delete('/:id', userAuth, recycleController.deleteRecycleForm);

// module.exports = router;


// routes/recycleFormRoute.js
const express = require('express');
const router = express.Router();
const recycleController = require('../controllers/recycleController');
const authMiddleware = require('../middleware/authMiddleware');

const userAuth = authMiddleware(['customer', 'admin']);
const adminAuth = authMiddleware(['admin']);

// ----- existing user routes (keep as-is) -----
router.post('/', userAuth, recycleController.createRecycleForm);
router.get('/', userAuth, recycleController.getUserRecycleForms);
router.get('/profile', userAuth, recycleController.getUserProfile);
router.get('/districts', userAuth, recycleController.getDistricts);
router.get('/stats', userAuth, recycleController.getUserStats);
router.get('/points-history', userAuth, recycleController.getUserPointsHistory);
router.post('/:id/award-points', userAuth, recycleController.awardPointsToUser);
router.put('/:id/status', adminAuth, recycleController.updateFormStatus);
router.get('/:id', userAuth, recycleController.getRecycleForm);
router.put('/:id', userAuth, recycleController.updateRecycleForm);
router.delete('/:id', userAuth, recycleController.deleteRecycleForm);

// ----- NEW admin analytics routes -----
router.get('/admin/overview', adminAuth, recycleController.getAdminOverview);
router.get('/admin/by-month', adminAuth, recycleController.getAdminByMonth);
router.get('/admin/by-category', adminAuth, recycleController.getAdminByCategory);
router.get('/admin/recent-forms', adminAuth, recycleController.getAdminRecentForms);
router.get('/admin/top-users', adminAuth, recycleController.getAdminTopUsers);

module.exports = router;
