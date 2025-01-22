import express from "express";
import User from "../models/userSchema.js";
import { hashPassword, verifyPassword } from "../utils/crypto.js";
import { generateToken } from "../utils/jwt.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multerConfig.js";

const router = express.Router();

//User Registration
router.post("/register", upload.single("profilePicture"), async (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);
  const { username, password, email, bio } = req.body;
  if (!username || !password || !email)
    return res.status(400).json("All fields are required");
  if (!req.file) return res.status(400).json("Profile picture is required");
  try {
    const hashedPassword = await hashPassword(password);
    const profilePicturePath = `/uploads/${req.file.filename}`;

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      bio: bio || "",
      profilePicture: profilePicturePath,
    });
    await newUser.save();
    res.status(201).json("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred during registration");
  }
});

//User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json("All fields are required");
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json("Invalid username or password");

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json("Invalid username or password");

    //Token
    const token = generateToken({ id: user._id, username: user.username });
    //TODO:HTTPOnly Cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred during login.");
  }
});

//Profil
router.get("/profile", authenticateUser, (req, res) => {
  const { username, email, bio, profilePicture } = req.user;
  res.status(200).json({ username, email, bio, profilePicture });
});

router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json({ message: "Logout successful" });
});

//ProfilFoto aktualisieren
router.put(
  "/update-profile-picture",
  authenticateUser,
  upload.single("profilePicture"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json("Profilbild ist erforderlich.");
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          profilePicture: `/uploads/${req.file.filename}`,
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json("Benutzer nicht gefunden");
      }
      res.status(200).json({
        message: "Profilbild erfolgreich aktualisiert.",
        profilePicture: updatedUser.profilePicture,
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Profilbilds:", error);
      res.status(500).json("Fehler beim Aktualisieren des Profilbilds.");
    }
  }
);

//Profilbio aktualisieren
router.put("/update-bio", authenticateUser, async (req, res) => {
  const { bio } = req.body;
  if (!bio) {
    return res.status(400).json("Bio ist erforderlich.");
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { bio },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json("Benutzer nicht gefunden");
    }
    res.status(200).json({
      message: "Bio erfolgreich aktualisiert.",
      bio: updatedUser.bio,
    });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Bio:", error);
    res.status(500).json("Fehler beim Aktualisieren des Bio.");
  }
});

export default router;
