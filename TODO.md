# Detaillierte Aufgabenliste

## TODO

### 1. Projektsetup

- [x] Installation der benötigten Abhängigkeiten (Node.js, Express, MongoDB).
      npm init -y
      npm install express mongoose dotenv bcrypt jsonwebtoken cors
      npm install --save-dev nodemon

- [x] Erstellung der Projektstruktur.
      /src
      /controllers
      /models
      /routes
      /middlewares
      /config
- [x] Konfiguration der erforderlichen Dateien.+
      env - db - hash - jwt

### 2. Benutzerverwaltung

- [x] Benutzerregistrierung und Login-System
  - [x] Authentifizierung mit JWT.
        -Cookies
  - [x] Passwortverschlüsselung mit bcrypt.
- [x] Benutzerprofile
  - [x] Erstellung und Bearbeitung von Benutzerprofilen.
  - [x] Möglichkeit, Profilbilder hochzuladen.

### 3. Beraterverwaltung

- [x] Beraterprofile
  - [x] Erstellung und Verwaltung von Beraterprofilen.
  - [x] Hinzufügen von Fachgebieten und verfügbaren Zeiten.

### 4. Terminverwaltung

- [x] Terminsystem
  - [x] Planung und Buchung von Terminen durch Nutzer.
- [x] Verfügbarkeiten der Berater
  - [x] Synchronisation der Beraterverfügbarkeit.

# TODO in Zukunft

### 5. Themenauswahl und Informationsaustausch

- [ ] Erstellung von Themenkategorien.
- [ ] Teilen von Informationen zu relevanten Themen.

### 6. Zahlungsintegration

- [ ] Integration von Stripe oder PayPal.
- [ ] Verwaltung von Zahlungsstatus und Transaktionen.

### 7. Leistung und Sicherheit

- [ ] Optimierung der Backend-Performance.
- [ ] Implementierung von Sicherheitsmaßnahmen (Rate Limiting, Input Validation).

### 8. Tests und Debugging

- [ ] API-Tests
  - [ ] Unit- und Integrationstests mit Jest oder ähnlichen Frameworks.
- [ ] Debugging
  - [ ] Fehlerbehebung und Optimierung.

### 9. Deployment

- [ ] Docker-Konfiguration und Vorbereitung.
- [ ] Live-Bereitstellung auf Servern (z. B. AWS, Heroku).
- [ ] Anwendungsverwaltung nach der Bereitstellung.

### Optionale Erweiterungen

- [ ] Admin Dashboard
- [ ] Termin senden E-Mail gemacht mit npm nodemailer
- [ ] Mehrsprachige Unterstützung der Plattform.
- [ ] Integration von Video- oder Audioanrufen für Beratungen.
- [ ] Erweiterte Berichterstattung und Analysen für Berater.
