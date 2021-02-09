import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dzsmd6eoh/image/upload/v1612240669/breeze/avatar/avatar_kpu4eg.png",
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.User || mongoose.model("User", userSchema);

export default Dataset;
