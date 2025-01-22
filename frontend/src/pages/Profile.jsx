import { useEffect, useState } from "react";
import { FiEdit, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  logoutUser,
  updateBio,
  updateProfilePicture,
} from "../api/auth";
import { deleteAppointment, getAppointments } from "../api/appointment";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newBio, setNewBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error(error);
        alert("Profil konnte nicht geladen werden.");
        navigate("/");
      }
    };

    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Termine konnten nicht abgerufen werden:", error);
      }
    };

    fetchProfile();
    fetchAppointments();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Erfolgreich abgemeldet");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Abmeldung fehlgeschlagen");
    }
  };

  const handleAppointment = () => {
    navigate("/berater");
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Sind Sie sicher, dass Sie diesen Termin löschen möchten")
    ) {
      return;
    }
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter((appt) => appt._id !== id));
      alert("Termin erfolgreich gelöscht");
    } catch (error) {
      console.error("Fehler beim Löschen des Termins:", error);
      alert("Termin konnte nicht gelöscht werden.");
    }
  };

  const handleProfilePictureChange = async (e) => {
    e.preventDefault();
    if (!newProfilePicture) {
      alert("Bitte wählen Sie ein Bild aus!");
      return;
    }
    const formData = new FormData();
    formData.append("profilePicture", newProfilePicture);
    try {
      const response = await updateProfilePicture(formData);
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: response.profilePicture,
      }));
      setIsEditingProfilePicture(false);
      alert("Profilbild erfolgreich aktualisiert");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Profilbilds:", error);
      alert("Profilbild konnte nicht aktualisiert werden.");
    }
  };

  const handleBioChange = async (e) => {
    e.preventDefault();
    if (!newBio) {
      alert("Bitte geben Sie eine Bio ein!");
      return;
    }
    try {
      const response = await updateBio(newBio);
      setUser((prevUser) => ({
        ...prevUser,
        bio: response.bio,
      }));
      setIsEditingBio(false);
      alert("Bio erfolgreich aktualisiert.");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Bio:", error);
      alert("Bio konnte nicht aktualisiert werden.");
    }
  };

  if (!user) return <p>Lädt...</p>;

  return (
    <div className="flex flex-row p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* Profilbereich */}
      <div className="w-1/3 pr-6 border-r">
        <h2 className="text-2xl font-bold mb-6">Profil</h2>
        <div className="flex flex-col items-center mb-6">
          <img
            src={`http://localhost:4000${user.profilePicture}`}
            alt="Profilbild"
            className="w-36 h-50 rounded-full object-cover mb-4 border"
          />
          <p className="text-lg font-medium">{user.username}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600 mt-2 text-center">{user.bio}</p>
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={() => setIsEditingBio((prev) => !prev)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FiEdit size={20} />
            </button>
            <button
              onClick={() => setIsEditingProfilePicture((prev) => !prev)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FiCamera size={20} />
            </button>
          </div>
        </div>
        {isEditingBio && (
          <form onSubmit={handleBioChange} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio aktualisieren
            </label>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              placeholder="Neue Bio eingeben"
              className="block w-full p-2 border rounded mb-4"
              rows={3}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Bio Aktualisieren
            </button>
          </form>
        )}
        {isEditingProfilePicture && (
          <form onSubmit={handleProfilePictureChange} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Neues Profilbild hochladen
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProfilePicture(e.target.files[0])}
              className="block w-full p-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Profilbild Aktualisieren
            </button>
          </form>
        )}

        <button
          onClick={handleAppointment}
          className="w-full bg-green-600 text-white py-2 rounded mb-4 hover:bg-green-700"
        >
          Termin Buchen
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Abmelden
        </button>
      </div>

      {/* Terminbereich */}
      <div className="w-2/3 pl-6">
        <h3 className="text-lg font-bold mb-4">Termine</h3>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment._id}
                className="border p-4 rounded-lg shadow-md flex flex-col"
              >
                <p>
                  <strong>Berater:</strong> {appointment.berater.name}
                </p>
                <p>
                  <strong>Fachgebiete:</strong>{" "}
                  {appointment.berater.specialties.join(", ")}
                </p>
                <p>
                  <strong>Datum:</strong>{" "}
                  {new Date(appointment.date).toLocaleString("de-DE")}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>
                <button
                  onClick={() => handleDelete(appointment._id)}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Löschen
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Sie haben noch keine Termine.</p>
        )}
      </div>
    </div>
  );
}
