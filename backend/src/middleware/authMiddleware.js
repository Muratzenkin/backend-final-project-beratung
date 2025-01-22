import { verifyToken } from "../utils/jwt.js";
import User from "../models/userSchema.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Unauthorized");

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) return res.status(404).json("User not found");

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json("Invalid token");
  }
};
