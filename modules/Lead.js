import mongoose from "mongoose";
const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  jobDetails: String,
  type: {               // New field for lead category
    type: String,
    default: "landscape" // Automatically set for landscaping leads
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
