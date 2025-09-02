const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Counter Schema to keep track of `user_id`
const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 0 },
});

const Counter = mongoose.models.counter || mongoose.model("counter", counterSchema);

const userSchema = new Schema({
    user_id: { type: Number, unique: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: {type: String},
    role: {type: String, enum: ['admin', 'customer'], default: 'customer'},
    address: {type: String},
    phone: {type: String},
    userStatus: {type: String, enum: ['active', 'inactive'], default: 'active'},
    token: {type: String},
    isVerified: { type: Boolean, default: false },
    points: {type: Number, default: 0}, // Keep existing points field
    // NEW FIELDS FOR RECYCLING SYSTEM:
    totalPoints: {type: Number, default: 0, min: 0}, // Total recycling points
    pointsHistory: [{
        recycleFormId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RecycleForm'
        },
        points: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            default: 'Points earned from recycling'
        }
    }],
    user_level: {type: String, enum:['Bronze','Silver', 'Gold', 'Platinum'], default: "Bronze"},
    createdAt: {type: Date, default: Date.now()}
});

// Pre-save middleware to auto-increment `user_id` and update user level
userSchema.pre('save', async function (next) {
    // Only generate user_id for new documents
    if (this.isNew) {
        try {
            const counter = await Counter.findOneAndUpdate(
                { name: "user_id" },
                { $inc: { value: 1 } },
                { new: true, upsert: true }
            );
            this.user_id = counter.value;
        } catch (error) {
            return next(error);
        }
    }

    // Update user level based on total points
    if (this.isModified('totalPoints') || this.isNew) {
        if (this.totalPoints >= 1000) {
            this.user_level = 'Platinum';
        } else if (this.totalPoints >= 500) {
            this.user_level = 'Gold';
        } else if (this.totalPoints >= 100) {
            this.user_level = 'Silver';
        } else {
            this.user_level = 'Bronze';
        }
    }

    next();
});

// Method to add points and update history
userSchema.methods.addPoints = function(points, recycleFormId, description = 'Points earned from recycling') {
    this.totalPoints += points;
    this.pointsHistory.push({
        recycleFormId,
        points,
        description
    });
    return this.save();
};

// Method to get user level based on points
userSchema.methods.getUserLevel = function() {
    if (this.totalPoints >= 1000) return 'Platinum';
    if (this.totalPoints >= 500) return 'Gold';
    if (this.totalPoints >= 100) return 'Silver';
    return 'Bronze';
};

// Virtual for user's full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Add index for totalPoints
userSchema.index({ totalPoints: -1 });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);