import jwt from "jsonwebtoken";
import User from "../../../models/userModel";
import connectDB from "../../../utils/db";
import { createAccessToken } from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(401).json({ err: "Not authenticated!" });

    const decoded = jwt.verify(rf_token, process.env.REFRESH_SECRET_TOKEN);
    if (!decoded) return res.status(401).json({ err: "Not authenticated!" });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ err: "User does not exist!" });

    const access_token = createAccessToken({ id: user._id });

    res.json({
      access_token,
      user: { name: user.name, email: user.email, role: user.role, avatar: user.avatar, root: user.root },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
