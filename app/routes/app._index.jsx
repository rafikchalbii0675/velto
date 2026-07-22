import { useState } from "react";

export default function AppIndex() {
  const [onboardingStarted, setOnboardingStarted] = useState(false);

  if (onboardingStarted) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <p style={styles.step}>Étape 1 sur 2</p>

          <h1 style={styles.title}>Quelle est votre priorité ?</h1>

          <p style={styles.description}>
            Choisissez ce que Velto doit vous aider à accomplir en premier.
          </p>

          <div style={styles.options}>
            <button type="button" style={styles.option}>
              🔍 Trouver des produits prometteurs
            </button>

            <button type="button" style={styles.option}>
              📢 Préparer des promotions
            </button>

            <button type="button" style={styles.option}>
              🔔 Recevoir des alertes utiles
            </button>

            <button type="button" style={styles.option}>
              💳 Découvrir les paiements crypto
            </button>
          </div>

          <button
            type="button"
            style={styles.backButton}
            onClick={() => setOnboardingStarted(false)}
          >
            Retour
          </button>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.brand}>VELTO — TEST ROUTE ACTIVE</p>

        <h1 style={styles.title}>Votre coéquipier commercial</h1>

        <p style={styles.description}>
          Velto vous aide à découvrir des opportunités, accélérer certaines
          tâches et passer plus rapidement à l’action.
        </p>

        <div style={styles.security}>
          🔒 Votre boutique est connectée de manière sécurisée avec Shopify.
          Aucun nouveau mot de passe n’est nécessaire.
        </div>

        <button
          type="button"
          style={styles.primaryButton}
          onClick={() => setOnboardingStarted(true)}
        >
          Commencer
        </button>

        <p style={styles.footer}>Configuration en moins de deux minutes</p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    background: "#f6f6f7",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "680px",
    padding: "48px",
    background: "#ffffff",
    border: "1px solid #e1e3e5",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },

  brand: {
    margin: "0 0 16px",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "3px",
  },

  step: {
    margin: "0 0 16px",
    color: "#616161",
    fontSize: "14px",
  },

  title: {
    margin: "0 0 16px",
    fontSize: "36px",
    lineHeight: "1.2",
  },

  description: {
    margin: "0 0 28px",
    color: "#4a4a4a",
    fontSize: "18px",
    lineHeight: "1.6",
  },

  security: {
    marginBottom: "28px",
    padding: "16px",
    background: "#f1f8f5",
    border: "1px solid #b7d8c8",
    borderRadius: "10px",
    lineHeight: "1.5",
  },

  primaryButton: {
    width: "100%",
    padding: "14px 20px",
    background: "#202223",
    color: "#ffffff",
    border: "none",
    borderRadius: "9px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
  },

  options: {
    display: "grid",
    gap: "12px",
  },

  option: {
    width: "100%",
    padding: "18px",
    background: "#ffffff",
    border: "1px solid #c9cccf",
    borderRadius: "10px",
    textAlign: "left",
    fontSize: "16px",
    cursor: "pointer",
  },

  backButton: {
    marginTop: "24px",
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
  },

  footer: {
    margin: "16px 0 0",
    color: "#6d7175",
    textAlign: "center",
    fontSize: "14px",
  },
};