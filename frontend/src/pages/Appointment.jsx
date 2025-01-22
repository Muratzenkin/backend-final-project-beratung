import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBeraters } from "../api/berater";
import { createAppointment } from "../api/appointment";
import { useNavigate } from "react-router-dom";

export default function Appointment() {
  const [beraterList, setBeraterList] = useState([]);
  const [selectedBerater, setSelectedBerater] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const availableTimeSlots = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "13:00",
  ];

  useEffect(() => {
    const fetchBeraters = async () => {
      try {
        const data = await getBeraters();
        setBeraterList(data);
      } catch (error) {
        console.error("Error fetching beraters:", error);
      }
    };
    fetchBeraters();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTimeSlots(availableTimeSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBerater || !selectedDate || !selectedTime) {
      alert("Bitte wählen Sie alle erforderlichen Felder aus!");
      return;
    }

    try {
      const appointmentDate = new Date(
        `${selectedDate.toISOString().split("T")[0]}T${selectedTime}`
      );

      await createAppointment({
        beraterId: selectedBerater,
        date: appointmentDate,
      });

      const wantsAnotherAppointment = window.confirm(
        "Termin erfolgreich erstellt! Möchten Sie einen weiteren Termin erstellen?"
      );
      if (!wantsAnotherAppointment) {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Fehler beim Erstellen des Termins.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        PROFESSIONELLE KARRIERE-BERATUNG
      </h2>
      <p className="text-center mb-6">
        Überprüfen Sie unsere Verfügbarkeit und wählen Sie ein Datum und eine
        Zeit aus
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <select
          onChange={(e) => setSelectedBerater(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Berater auswählen</option>
          {beraterList.map((berater) => (
            <option key={berater._id} value={berater._id}>
              {berater.name} ({berater.specialties.join(", ")})
            </option>
          ))}
        </select>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Datum auswählen
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            className="w-full p-2 border rounded"
            dateFormat="dd.MM.yyyy"
          />
        </div>

        {timeSlots.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Zeit auswählen
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`p-2 border rounded ${
                    selectedTime === time ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Termin Erstellen
        </button>
      </form>
    </div>
  );
}
