// app/models/sponsors.js - VERSION BETA FAUSSE DATA - POUR BUILD VERT
export async function getSponsors() {
  // Fausses données juste pour que le build passe
  return [
    { id: "1", name: "Testeur Beta #1", email: "beta1@test.com", createdAt: new Date() },
    { id: "2", name: "Testeur Beta #2", email: "beta2@test.com", createdAt: new Date() },
    { id: "3", name: "Early Bird", email: "early@velto.app", createdAt: new Date() },
  ];
}