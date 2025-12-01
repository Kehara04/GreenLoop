// const express = require("express");
// const router = express.Router();

// const recycleCentreController = require("../controllers/recycleCentreController");
// const authMiddleware = require("../middleware/authMiddleware"); // your auth middleware

// // Public routes
// router.get("/", recycleCentreController.getRecycleCentres);
// router.get("/id", recycleCentreController.getRecycleCentreById);

// // Restricted routes (admin & recycleCentre only)
// router.post("/", authMiddleware(["admin", "recycleCentre"]), recycleCentreController.addRecycleCentre);
// router.put("/update", authMiddleware(["admin", "recycleCentre"]), recycleCentreController.updateRecycleCentre);
// router.delete("/delete", authMiddleware(["admin", "recycleCentre"]), recycleCentreController.deleteRecycleCentre);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');

// const recycleCentreController = require("../controllers/recycleCentreController");

// // ✅ Public routes (no auth required)
// router.post("/register", recycleCentreController.registerRecycleCentre);
// router.post("/login", recycleCentreController.loginRecycleCentre);

// router.get("/", recycleCentreController.getRecycleCentres);
// router.get("/id", recycleCentreController.getRecycleCentreById);
// router.put("/update", recycleCentreController.updateRecycleCentre);
// router.delete("/delete", recycleCentreController.deleteRecycleCentre);

//   router.get('/recycle_centre-dashboard', authMiddleware(['recycleCentre']), (req, res) => {
//     res.json({ message: 'Welcome to Recycle Centre Dashboard' });
//   });

// module.exports = router;

const express = require("express");
const router = express.Router();

const recycleCentreController = require("../controllers/recycleCentreController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", recycleCentreController.getRecycleCentres);
router.get("/id", recycleCentreController.getRecycleCentreById);
router.post("/email", recycleCentreController.getRecycleCentreByEmail);

// Registration route (public)
router.post("/signup", recycleCentreController.addRecycleCentre);

// NEW: Get centres by area (district/city)
router.get("/by-area", recycleCentreController.getCentresByArea);

// NEW: Get suggested centres based on recycle form data
router.post("/suggest", recycleCentreController.getSuggestedCentres);

// Restricted routes (admin & recycleCentre only)
router.put("/update", authMiddleware(["admin", "recycleCentre"]), recycleCentreController.updateRecycleCentre);
router.put("/update-password", authMiddleware(["admin", "recycleCentre"]), recycleCentreController.updatePassword);
router.delete("/delete", authMiddleware(["admin", "recycleCentre"]), recycleCentreController.deleteRecycleCentre);

module.exports = router;