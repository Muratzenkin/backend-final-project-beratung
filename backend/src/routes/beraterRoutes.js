import express from "express";
import Berater from "../models/beraterSchema.js";

const router = express.Router();

//Berater
router.post("/", async (req, res) => {
  const { name, email, specialties, availability } = req.body;
  try {
    const newBerater = new Berater({
      name,
      email,
      specialties,
      availability,
    });
    await newBerater.save();
    res.status(201).json("Berater erfolgreich erstellt!");
  } catch (error) {
    console.error("Error creating Berater:", error);
    res.status(500).json("Fehler beim Erstellen eines Beraters.");
  }
});

//LIST
router.get("/", async (req, res) => {
  try {
    const beraters = await Berater.find();
    res.status(200).json(beraters);
  } catch (error) {
    console.error("Error fetching Beraters:", error);
    res.status(500).json("Fehler beim Abrufen der Berater.");
  }
});

// Update Berater
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, specialties, availability } = req.body;
  try {
    const updatedBerater = await Berater.findByIdAndUpdate(
      id,
      { name, email, specialties, availability },
      { new: true }
    );
    if (!updatedBerater) return res.status(404).json("Berater nicht gefunden");
    res.status(200).json("Berater erfolgreich aktualisiert");
  } catch (error) {
    console.error("Error updating Berater:", error);
    res.status(500).json("Fehler beim Aktualisieren eines Beraters.");
  }
});

//Delete Berater
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBerater = await Berater.findByIdAndDelete(id);
    if (!deletedBerater) return res.status(404).json("Berater nicht gefunden");
    res.status(200).json("Berater erfolgreich gelöscht");
  } catch (error) {
    console.error("Error deleting Berater:", error);
    res.status(500).json("Fehler beim Löschen eines Beraters.");
  }
});

export default router;
