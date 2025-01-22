import { useEffect, useState } from "react";
import { getBeraters } from "../api/berater";
import { useNavigate } from "react-router-dom";

export default function BeraterList() {
  const [beraters, setBeraters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeraters = async () => {
      try {
        const data = await getBeraters();
        setBeraters(data);
      } catch (error) {
        console.error("Error fetching Beraters:", error);
      }
    };

    fetchBeraters();
  }, []);

  const handleSelect = (beraterId) => {
    navigate(`/appointment/${beraterId}`);
  };

  // Filtre
  const filteredBeraters = beraters.filter(
    (berater) =>
      berater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      berater.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Berater Liste</h2>
      <input
        type="text"
        placeholder="Suche nach Name oder Fachgebiet"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <ul className="space-y-4">
        {filteredBeraters.length > 0 ? (
          filteredBeraters.map((berater) => (
            <li key={berater._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{berater.name}</h3>
              <p>Email: {berater.email}</p>
              <p>Fachgebiete: {berater.specialties.join(", ")}</p>
              <button
                onClick={() => handleSelect(berater._id)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
              >
                Termin auswählen
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-600">Keine Berater gefunden.</p>
        )}
      </ul>
    </div>
  );
}
