// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Counter Schema to keep track of `user_id`
// const counterSchema = new Schema({
//   name: { type: String, required: true, unique: true },
//   value: { type: Number, required: true, default: 0 },
// });

// const Counter = mongoose.models.counter || mongoose.model("counter", counterSchema);

// const userSchema = new Schema({
//     user_id: { type: Number, unique: true },
//     firstName: {type: String, required: true},
//     lastName: {type: String, required: true},
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true},
//     profilePic: {type: String},
//     role: {type: String, enum: ['admin', 'customer'], default: 'customer'},
//     address: {type: String},
//     phone: {type: String},
//     userStatus: {type: String, enum: ['active', 'inactive'], default: 'active'},
//     token: {type: String},
//     isVerified: { type: Boolean, default: false },
//     points: {type: Number, default: 0}, // Keep existing points field
//     // NEW FIELDS FOR RECYCLING SYSTEM:
//     totalPoints: {type: Number, default: 0, min: 0}, // Total recycling points
//     pointsHistory: [{
//         recycleFormId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'RecycleForm'
//         },
//         points: {
//             type: Number,
//             required: true
//         },
//         date: {
//             type: Date,
//             default: Date.now
//         },
//         description: {
//             type: String,
//             default: 'Points earned from recycling'
//         }
//     }],
//     user_level: {type: String, enum:['Bronze','Silver', 'Gold', 'Platinum'], default: "Bronze"},
//     createdAt: {type: Date, default: Date.now()}
// });

// // Pre-save middleware to auto-increment `user_id` and update user level
// userSchema.pre('save', async function (next) {
//     // Only generate user_id for new documents
//     if (this.isNew) {
//         try {
//             const counter = await Counter.findOneAndUpdate(
//                 { name: "user_id" },
//                 { $inc: { value: 1 } },
//                 { new: true, upsert: true }
//             );
//             this.user_id = counter.value;
//         } catch (error) {
//             return next(error);
//         }
//     }

//     // Update user level based on total points
//     if (this.isModified('totalPoints') || this.isNew) {
//         if (this.totalPoints >= 1000) {
//             this.user_level = 'Platinum';
//         } else if (this.totalPoints >= 500) {
//             this.user_level = 'Gold';
//         } else if (this.totalPoints >= 100) {
//             this.user_level = 'Silver';
//         } else {
//             this.user_level = 'Bronze';
//         }
//     }

//     next();
// });

// // Method to add points and update history
// userSchema.methods.addPoints = function(points, recycleFormId, description = 'Points earned from recycling') {
//     this.totalPoints += points;
//     this.pointsHistory.push({
//         recycleFormId,
//         points,
//         description
//     });
//     return this.save();
// };

// // Method to get user level based on points
// userSchema.methods.getUserLevel = function() {
//     if (this.totalPoints >= 1000) return 'Platinum';
//     if (this.totalPoints >= 500) return 'Gold';
//     if (this.totalPoints >= 100) return 'Silver';
//     return 'Bronze';
// };

// // Virtual for user's full name
// userSchema.virtual('fullName').get(function() {
//     return `${this.firstName} ${this.lastName}`;
// });

// // Add index for totalPoints
// userSchema.index({ totalPoints: -1 });

// module.exports = mongoose.models.User || mongoose.model('User', userSchema);

// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// --- Counter (for auto-increment IDs if you use them elsewhere) ---
const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 0 },
});
const Counter = mongoose.models.counter || mongoose.model('counter', counterSchema);

// --- User Schema ---
const userSchema = new Schema({
  user_id: { type: Number, unique: true },
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  profilePic:{ type: String },
  role:      { type: String, enum: ['admin', 'customer'], default: 'customer' },
  address:   { type: String },
  phone:     { type: String },
  userStatus:{ type: String, enum: ['active', 'inactive'], default: 'active' },
  token:     { type: String },
  isVerified:{ type: Boolean, default: false },

  // --- Points & badges ---
  totalPoints: { type: Number, default: 0, min: 0 },
  pointsHistory: [{
    recycleFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'RecycleForm' },
    points: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, default: 'Points earned from recycling' }
  }],

  // Eco Levels (derived from totalPoints, but stored for quick reads)
  user_level: {
    type: String,
    enum: ['Beginner Recycler', 'Eco Learner', 'Eco Star', 'Earth Champion'],
    default: 'Beginner Recycler'
  },

  createdAt: { type: Date, default: Date.now }
});

// --- Helpers: compute level & badges from points ---
function levelFromPoints(pts) {
  if (pts >= 100) return 'Earth Champion';
  if (pts >= 50)  return 'Eco Star';
  if (pts >= 20)  return 'Eco Learner';
  return 'Beginner Recycler';
}

function badgesFromPoints(pts) {
  return [
    { key: 'Beginner Recycler', threshold: 0,   earned: pts >= 0 },
    { key: 'Eco Learner',       threshold: 20,  earned: pts >= 20 },
    { key: 'Eco Star',          threshold: 50,  earned: pts >= 50 },
    { key: 'Earth Champion',    threshold: 100, earned: pts >= 100 },
  ];
}

// --- Pre-save: auto-increment user_id + sync level ---
userSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'user_id' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      this.user_id = counter.value;
    } catch (err) {
      return next(err);
    }
  }

  if (this.isModified('totalPoints') || this.isNew) {
    this.user_level = levelFromPoints(this.totalPoints);
  }

  next();
});

// --- Instance methods for points ---
userSchema.methods.addPoints = async function(points, recycleFormId, description='Points earned from recycling') {
  const delta = Math.max(0, Number(points) || 0);
  if (delta > 0) {
    this.totalPoints += delta;
    this.pointsHistory.push({ recycleFormId, points: delta, description });
    this.user_level = levelFromPoints(this.totalPoints);
  }
  return this.save();
};

userSchema.methods.removePoints = async function(points, recycleFormId, description='Points adjusted/refunded') {
  const delta = Math.max(0, Number(points) || 0);
  if (delta > 0) {
    this.totalPoints = Math.max(0, this.totalPoints - delta);
    this.pointsHistory.push({ recycleFormId, points: -delta, description });
    this.user_level = levelFromPoints(this.totalPoints);
  }
  return this.save();
};

userSchema.methods.getBadges = function() {
  return badgesFromPoints(this.totalPoints);
};

// --- Virtual full name ---
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// --- Indexes ---
userSchema.index({ totalPoints: -1 });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
