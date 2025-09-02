const express = require("express");
const router = express.Router();

const customerRoutes = require("./routes/customerRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require('./routes/adminRoutes');
const recycleCentreRoutes = require("./routes/recycleCentreRoutes");
// ADD THIS LINE:
const recycleRoutes = require("./routes/recycleFormRoute");

router.use("/customers", customerRoutes);
router.use("/users", userRoutes);
router.use("/admins", adminRoutes);
router.use("/recycleCentre", recycleCentreRoutes);
// ADD THIS LINE:
router.use("/recycle", recycleRoutes);

module.exports = router;