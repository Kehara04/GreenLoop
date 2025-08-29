const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Counter Schema (to keep track of recycleCentre_id)
const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 0 },
});

const Counter = mongoose.models.counterRecycleCentre || mongoose.model("counterRecycleCentre", counterSchema);

const recycleCentreSchema = new Schema({
  recycleCentre_id: { type: Number, unique: true }, // Auto increment ID
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String },
  role: {type: String,enum: ['recycleCentre'],default: 'recycleCentre'},
  password: {type: String,required: true},
  website: { type: String },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  acceptedItems: [{ type: String }] // e.g., ["Plastic", "Paper", "Electronics"]
}, { timestamps: true });

// Pre-save middleware to auto-increment recycleCentre_id
recycleCentreSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "recycleCentre_id" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.recycleCentre_id = counter.value;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("RecycleCentre", recycleCentreSchema);
