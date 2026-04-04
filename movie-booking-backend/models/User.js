// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: String,
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
// });

// export default mongoose.model("User", userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
