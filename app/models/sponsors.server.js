/**
 * VELTO - Sponsors System
 * Fichier: app/models/sponsors.server.js
 *
 * Ce fichier te permet d'ajouter un nouveau sponsor en 30 secondes
 */

import { db } from "../db.server.js";

export const SPONSOR_TEMPLATES = {
  "poste-canada": {
    id: "poste-canada",
    name: "Poste Canada",
    logo: "/sponsors/poste-canada.png",
    pointsName: "Points Colis",
    email: "partenaires.velto@postescanada.ca",
    tel: "1-866-607-6301",
    howToEarn: "Expédiez 10 colis avec Poste Canada = 500 points",
    howToRedeem: "1000 points = 1 étiquette d'envoi gratuite ou 10$ rabais",
    pointsValue: 0.01,
    minRedeem: 1000,
    category: "shipping",
    status: "active",
    isPremiumOnly: true,
    color: "#E30613",
    website: "https://www.canadapost.ca"
  },
  "td-bank": {
    id: "td-bank",
    name: "TD Bank",
    logo: "/sponsors/td-bank.png",
    pointsName: "Points TD Business",
    email: "velto.rewards@td.com",
    tel: "1-866-222-3456",
    howToEarn: "Ouvrez compte TD Business via Velto = 2000 points bonus",
    howToRedeem: "2000 points = 50$ crédit ou frais bancaires gratuits 3 mois",
    pointsValue: 0.025,
    minRedeem: 2000,
    category: "bank",
    status: "pending",
    isPremiumOnly: true,
    color: "#00A651",
    website: "https://www.td.com"
  },
  "air-canada": {
    id: "air-canada",
    name: "Air Canada",
    logo: "/sponsors/air-canada.png",
    pointsName: "Points Aeroplan Velto",
    email: "velto-rewards@aircanada.ca",
    tel: "1-800-361-5373",
    howToEarn: "Chaque tranche de 100$ de vente = 100 points Aeroplan",
    howToRedeem: "10 000 points = vol aller-retour Montréal-Toronto",
    pointsValue: 0.02,
    minRedeem: 5000,
    category: "travel",
    status: "pending",
    isPremiumOnly: true,
    color: "#F01428",
    website: "https://www.aircanada.com"
  },
  "amex": {
    id: "amex",
    name: "American Express",
    logo: "/sponsors/amex.png",
    pointsName: "Points Amex Business",
    email: "velto@amex.ca",
    tel: "1-800-869-3016",
    howToEarn: "Abonnement Velto Boss 99$ = 1000 points Amex bonus",
    howToRedeem: "Contactez Amex pour convertir en crédit voyage",
    pointsValue: 0.02,
    minRedeem: 1000,
    category: "payment",
    status: "pending",
    isPremiumOnly: true,
    color: "#2E77BB",
    website: "https://www.americanexpress.com"
  }
};

let sponsorsMemory = Object.values(SPONSOR_TEMPLATES);

export function createSponsor(sponsorData) {
  const required = ["id", "name", "email", "howToEarn", "howToRedeem"];
  for (const field of required) {
    if (!sponsorData[field]) {
      throw new Error(`Critère manquant: ${field} est obligatoire`);
    }
  }
  const newSponsor = {
   ...sponsorData,
    createdAt: new Date(),
    totalMerchants: 0,
    totalPointsDistributed: 0,
    status: sponsorData.status || "pending"
  };
  sponsorsMemory.push(newSponsor);
  console.log(`✅ Nouveau sponsor ajouté: ${newSponsor.name}`);
  return newSponsor;
}

export function getAllSponsors() {
  return sponsorsMemory;
}

export function getActiveSponsors() {
  return sponsorsMemory.filter(s => s.status === "active");
}

export function getSponsorById(id) {
  return sponsorsMemory.find(s => s.id === id);
}

export function updateSponsor(id, updates) {
  const index = sponsorsMemory.findIndex(s => s.id === id);
  if (index === -1) throw new Error(`Sponsor ${id} non trouvé`);
  sponsorsMemory[index] = {...sponsorsMemory[index],...updates, updatedAt: new Date() };
  return sponsorsMemory[index];
}

export function deleteSponsor(id) {
  const initialLength = sponsorsMemory.length;
  sponsorsMemory = sponsorsMemory.filter(s => s.id!== id);
  return sponsorsMemory.length < initialLength;
}

export function generateRedemptionEmail(merchant, sponsor, pointsToRedeem) {
  const sponsorInfo = getSponsorById(sponsor.id);
  return {
    to: sponsorInfo.email,
    cc: merchant.email,
    subject: `[VELTO] Demande d'échange ${pointsToRedeem} ${sponsorInfo.pointsName} - ${merchant.shop}`,
    body: `
Bonjour équipe ${sponsorInfo.name},

Un marchand Velto souhaite échanger ses points:
- Boutique: ${merchant.shop}
- Code Velto: ${merchant.veltoCode}
- Email: ${merchant.email}
- Points: ${pointsToRedeem} ${sponsorInfo.pointsName}
- Valeur: ${pointsToRedeem * sponsorInfo.pointsValue}$ CAD

Demande: ${sponsorInfo.howToRedeem}
Merci de contacter le marchand dans les 48h.

L'équipe Velto
    `.trim(),
    sponsorContact: {
      email: sponsorInfo.email,
      tel: sponsorInfo.tel,
      website: sponsorInfo.website
    }
  };
}