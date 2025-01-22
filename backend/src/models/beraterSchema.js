import mongoose from "mongoose";

const beraterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  specialties: {
    type: [String],
    default: [],
  },
  availability: {
    type: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    default: [],
  },
});

const Berater = mongoose.model("Berater", beraterSchema);
export default Berater;
