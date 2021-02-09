import bcrypt from "bcryptjs";
import User from "../../../models/userModel";
import connectDB from "../../../utils/db";
import valid from "../../../utils/valid";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, c_password } = req.body;

    const errorMsg = valid(name, email, password, c_password);

    if (errorMsg) return res.status(400).json(err.errorMsg);

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ err: "This email already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      c_password,
    });

    res.status(201).json({ msg: "Register Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
