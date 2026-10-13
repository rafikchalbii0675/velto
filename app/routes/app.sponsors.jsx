/**
 * VELTO - Page Sponsors
 * Fichier: app/routes/app.sponsors.jsx
 * Cette page est ce que le marchand voit : Poste Canada, TD, Air Canada, Amex
 * Et le bouton "Échanger mes points" avec email + tel
 */

import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllSponsors, generateRedemptionEmail } from "../models/sponsors.server.js";

// Charge les sponsors depuis sponsors.server.js
export async function loader() {
  const sponsors = getAllSponsors();
  return json({ sponsors });
}

export default function SponsorsPage() {
  const { sponsors } = useLoaderData();
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  // Simule un marchand pour la démo pitch
  const fakeMerchant = {
    shop: "ma-boutique.myshopify.com",
    email: "rafik@velto.ca",
    veltoCode: "VELTO-BOSS-12345"
  };

  const handleRedeem = (sponsor) => {
    setSelectedSponsor(sponsor);
    // Génère l'email automatique
    const emailData = generateRedemptionEmail(fakeMerchant, sponsor, 1000);
    console.log("Email à envoyer:", emailData);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>🎁 Récompenses Sponsorisées Velto</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Tes points Velto sont offerts par nos partenaires. Clique sur "Échanger" pour utiliser tes points.
        <br />
        <strong>Modèle BOSS 99$ - Portefeuille de clientèle solvable</strong>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            style={{
              border: `3px solid ${sponsor.color}`,
              borderRadius: "12px",
              padding: "20px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0 }}>{sponsor.name}</h2>
              <span style={{
                background: sponsor.status === "active" ? "#00A651" : "#FFA500",
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                {sponsor.status === "active" ? "ACTIF" : "À VENIR"}
              </span>
            </div>

            <p style={{ fontWeight: "bold", color: sponsor.color, margin: "10px 0" }}>
              {sponsor.pointsName}
            </p>

            <div style={{ background: "#f6f6f7", padding: "12px", borderRadius: "8px", marginBottom: "12px" }}>
              <p style={{ margin: "5px 0", fontSize: "14px" }}><strong>🎯 Comment gagner:</strong><br />{sponsor.howToEarn}</p>
              <p style={{ margin: "5px 0", fontSize: "14px" }}><strong>🎁 Comment échanger:</strong><br />{sponsor.howToRedeem}</p>
            </div>

            <div style={{ fontSize: "13px", color: "#555", marginBottom: "15px" }}>
              <p style={{ margin: "3px 0" }}>📧 {sponsor.email}</p>
              <p style={{ margin: "3px 0" }}>📞 {sponsor.tel}</p>
              <p style={{ margin: "3px 0" }}>💰 Valeur: 1 point = {sponsor.pointsValue}$ | Min: {sponsor.minRedeem} pts</p>
            </div>

            <button
              onClick={() => handleRedeem(sponsor)}
              style={{
                width: "100%",
                background: sponsor.color,
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "15px"
              }}
            >
              Échanger mes points -&gt; {sponsor.name}
            </button>
          </div>
        ))}
      </div>

      {selectedSponsor && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          border: "3px solid #000",
          borderRadius: "16px",
          padding: "30px",
          width: "90%",
          maxWidth: "500px",
          zIndex: 1000,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
        }}>
          <h2>✅ Demande envoyée à {selectedSponsor.name} !</h2>
          <p><strong>Voici la méthode "il clique et hop" que tu voulais :</strong></p>
          <div style={{ background: "#f0f0f0", padding: "15px", borderRadius: "8px", margin: "15px 0" }}>
            <p>📧 Email envoyé à: <strong>{selectedSponsor.email}</strong></p>
            <p>📞 Support: <strong>{selectedSponsor.tel}</strong></p>
            <p>🏪 Boutique: {fakeMerchant.shop}</p>
            <p>🔑 Code Velto: {fakeMerchant.veltoCode}</p>
            <p>💎 Points: 1000 {selectedSponsor.pointsName}</p>
          </div>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Le sponsor a reçu l'email automatique avec tes infos. Il va te contacter dans 48h pour ton voyage / envoi gratuit / crédit.
          </p>
          <button
            onClick={() => setSelectedSponsor(null)}
            style={{ marginTop: "15px", padding: "10px 20px", background: "black", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}