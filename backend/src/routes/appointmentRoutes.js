import express from "express";
import Appointment from "../models/appointmentSchema.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

//TERmin
router.post("/", authenticateUser, async (req, res) => {
  const { beraterId, date } = req.body;
  try {
    const existingAppointment = await Appointment.findOne({
      berater: beraterId,
      date,
    });
    if (existingAppointment) {
      return res.status(400).json("Der Termin ist bereits vergeben");
    }

    const newAppointment = new Appointment({
      user: req.user._id,
      berater: beraterId,
      date,
    });
    await newAppointment.save();
    res.status(201).json("Termin erfolgreich erstellt");
  } catch (error) {
    console.error("Error creating appointment: ", error);
    res.status(500).json("Fehler beim Erstellen des Termins");
  }
});

// Liste der Termine des Benutzers
router.get("/", authenticateUser, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate("berater", "name email specialties")
      .sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json("Fehler beim Abrufen der Termine.");
  }
});

// Termin löschen
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!appointment) {
      return res.status(404).json("Termin nicht gefunden");
    }
    res.status(200).json("Termin erfolgreich gelöscht");
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json("Fehler beim Löschen des Termins.");
  }
});

export default router;
