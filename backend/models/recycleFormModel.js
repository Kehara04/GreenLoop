// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Use the same Counter model as User
// const Counter = mongoose.models.counter || mongoose.model("counter", require('./user').schema.paths.counter || new Schema({
//   name: { type: String, required: true, unique: true },
//   value: { type: Number, required: true, default: 0 },
// }));

// const recycleFormSchema = new mongoose.Schema({
//     form_id: { type: Number, unique: true },
//     userId: {
//         type: 'string', // Keep as string to match your existing user ID format
//         required: true
//     },
//     categories: {
//         metal: { type: Number, default: 0, min: 0 },
//         plastic: { type: Number, default: 0, min: 0 },
//         polythene: { type: Number, default: 0, min: 0 },
//         eWaste: { type: Number, default: 0, min: 0 },
//         clothes: { type: Number, default: 0, min: 0 },
//         paper: { type: Number, default: 0, min: 0 },
//         regiform: { type: Number, default: 0, min: 0 }
//     },
//     location: {
//         district: {
//             type: String,
//             required: true,
//             enum: [
//                 'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
//                 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
//                 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
//                 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
//                 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
//             ]
//         },
//         city: {
//             type: String,
//             required: true,
//             trim: true,
//             maxlength: 50
//         }
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'processing', 'completed', 'cancelled'],
//         default: 'pending'
//     },
//     totalQuantity: { type: Number, default: 0 },
//     pointsEarned: { type: Number, default: 0 },
//     pointsAwarded: { type: Boolean, default: false },
//     notes: { type: String, maxlength: 500 }
// }, {
//     timestamps: true
// });

// // Pre-save middleware to auto-increment `form_id` and calculate points
// recycleFormSchema.pre('save', async function (next) {
//     // Calculate total quantity
//     const categories = this.categories;
//     this.totalQuantity = categories.metal + categories.plastic + categories.polythene + 
//                         categories.eWaste + categories.clothes + categories.paper + 
//                         categories.regiform;
    
//     // Calculate points (1 point per unit of total quantity)
//     this.pointsEarned = this.totalQuantity;
    
//     // Only generate form_id for new documents
//     if (!this.isNew) {
//         return next();
//     }

//     try {
//         const counter = await Counter.findOneAndUpdate(
//             { name: "form_id" },
//             { $inc: { value: 1 } },
//             { new: true, upsert: true }
//         );
//         this.form_id = counter.value;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Indexes for performance
// recycleFormSchema.index({ userId: 1, createdAt: -1 });
// recycleFormSchema.index({ 'location.district': 1 });
// recycleFormSchema.index({ status: 1 });

// module.exports = mongoose.model('RecycleForm', recycleFormSchema);

// models/recycleForm.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// If you also auto-increment form_id:
const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 0 },
});
const Counter = mongoose.models.counter || mongoose.model('counter', counterSchema);

const recycleFormSchema = new Schema({
  form_id: { type: Number, unique: true },

  userId: { type: String, required: true }, // your app uses string user_id externally

  categories: {
    metal:     { type: Number, default: 0, min: 0 },
    plastic:   { type: Number, default: 0, min: 0 },
    polythene: { type: Number, default: 0, min: 0 },
    eWaste:    { type: Number, default: 0, min: 0 },
    clothes:   { type: Number, default: 0, min: 0 },
    paper:     { type: Number, default: 0, min: 0 },
    regiform:  { type: Number, default: 0, min: 0 },
  },

  location: {
    district: {
      type: String,
      required: true,
      enum: [
        'Ampara','Anuradhapura','Badulla','Batticaloa','Colombo',
        'Galle','Gampaha','Hambantota','Jaffna','Kalutara',
        'Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar',
        'Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya',
        'Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya'
      ]
    },
    city: { type: String, required: true, trim: true, maxlength: 50 }
  },

  status: { type: String, enum: ['pending','processing','completed','cancelled'], default: 'pending' },

  totalQuantity: { type: Number, default: 0 }, // total kg
  pointsEarned:  { type: Number, default: 0 }, // = totalQuantity (1:1)
  pointsAwarded: { type: Boolean, default: false },

  notes: { type: String, maxlength: 500 }
}, { timestamps: true });

// Auto-calc quantity & points
recycleFormSchema.pre('save', async function(next) {
  const c = this.categories || {};
  this.totalQuantity =
    (c.metal||0) + (c.plastic||0) + (c.polythene||0) +
    (c.eWaste||0) + (c.clothes||0) + (c.paper||0) + (c.regiform||0);

  // 1 kg = 1 point
  this.pointsEarned = this.totalQuantity;

  // set numeric form_id once on create
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: 'form_id' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      this.form_id = counter.value;
    } catch (err) {
      return next(err);
    }
  }

  next();
});

recycleFormSchema.index({ userId: 1, createdAt: -1 });
recycleFormSchema.index({ 'location.district': 1 });
recycleFormSchema.index({ status: 1 });

module.exports = mongoose.models.RecycleForm || mongoose.model('RecycleForm', recycleFormSchema);
