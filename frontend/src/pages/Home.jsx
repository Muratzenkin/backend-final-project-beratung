function Home() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Willkommen bei meinem Beratungsmanagement-Projekt
      </h1>
      <p className="text-lg mb-4">
        Dieses Projekt ist ein vollständiges Beratungsmanagementsystem, das als
        Studienprojekt entwickelt wurde. Es bietet folgende Funktionen:
      </p>

      <ul className="list-disc list-inside mb-6">
        <li>
          <strong>Benutzerregistrierung und Login:</strong> Erstellen Sie ein
          Benutzerkonto oder melden Sie sich an, um das System zu nutzen.
        </li>
        <li>
          <strong>Profilverwaltung:</strong> Anzeigen und Bearbeiten Ihres
          Profils, einschließlich Profilbild.
        </li>
        <li>
          <strong>Beraterliste:</strong> Durchsuchen Sie eine Liste von Beratern
          mit deren Fachgebieten und Verfügbarkeiten.
        </li>
        <li>
          <strong>Terminmanagement:</strong> Vereinbaren Sie Termine mit
          Beratern basierend auf deren Verfügbarkeit.
        </li>
      </ul>

      <p className="text-lg mb-6">
        Dieses System wurde mit modernen Technologien wie <strong>React</strong>
        , <strong>Node.js</strong>, <strong>Express</strong> und{" "}
        <strong>MongoDB</strong> entwickelt. Es ist einfach zu bedienen und
        bietet eine klare Benutzeroberfläche.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Was können Sie tun?</h2>
      <p className="text-lg mb-4">
        Sobald Sie sich registriert haben, können Sie:
      </p>
      <ol className="list-decimal list-inside mb-6">
        <li>Einloggen und Ihr Profil ansehen.</li>
        <li>Eine Liste von Beratern durchsuchen.</li>
        <li>Termine vereinbaren und verwalten.</li>
        <li>Ihre Termine in Ihrem Profil anzeigen.</li>
      </ol>
    </div>
  );
}

export default Home;
