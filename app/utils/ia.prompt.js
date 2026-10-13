//
// Velto – Prompts IA centralisés
// Toutes les routes IA utilisent ce fichier
//

// Optimisation d’un produit Shopify
export const optimizeProductPrompt = (product) => `
Tu es Velto IA Optimisation Produit.

Produit :
${product}

Génère :
- Un titre optimisé SEO
- Une description complète et persuasive
- Des bullet points clairs
- Des mots-clés SEO pertinents
- Un prix recommandé basé sur le marché
- Des tags Shopify
- Un positionnement marketing
- Une version alternative du texte
`;


// Création d’un produit à partir d’une idée
export const createProductPrompt = (idea) => `
Tu es Velto IA Création Produit.

Idée :
${idea}

Crée un produit complet :
- Titre
- Description
- Prix recommandé
- Tags Shopify
- Catégorie
- Positionnement marketing
- Avantages du produit
- Public cible
`;


// Duplication intelligente d’un produit
export const duplicateProductPrompt = (product) => `
Tu es Velto IA Duplication Produit.

Produit original :
${product}

Crée une version alternative :
- Nouveau titre
- Nouvelle description
- Variation du style
- Variation du ton
- Variation du positionnement marketing
- Tags différents
- Version plus courte
- Version plus longue
`;


// Auto‑optimisation complète d’un produit
export const autoOptimizePrompt = (product) => `
Tu es Velto IA Auto-Optimisation.

Produit :
${product}

Analyse et génère :
- Score SEO (0 à 100)
- Score marketing (0 à 100)
- Score conversion (0 à 100)
- Recommandations d’amélioration
- Version optimisée du produit
- Liste des mots-clés SEO
- Tags Shopify recommandés
`;


// Analyse IA d’un produit Shopify
export const analyzeProductPrompt = (product) => `
Tu es Velto IA Analyse Produit.

Produit :
${product}

Analyse :
- Forces du produit
- Faiblesses du produit
- Opportunités SEO
- Opportunités marketing
- Recommandations concrètes
- Version améliorée
`;


// Génération IA de tags Shopify
export const generateTagsPrompt = (product) => `
Tu es Velto IA Génération de Tags.

Produit :
${product}

Génère :
- 10 tags Shopify pertinents
- 10 mots-clés SEO
- 5 catégories possibles
`;


// Génération IA de titres Shopify
export const generateTitlePrompt = (product) => `
Tu es Velto IA Génération de Titres.

Produit :
${product}

Génère :
- 5 titres optimisés SEO
- 5 titres orientés conversion
- 5 titres orientés marketing
`;


// Génération IA de descriptions Shopify
export const generateDescriptionPrompt = (product) => `
Tu es Velto IA Description Produit.

Produit :
${product}

Génère :
- Une description longue
- Une description courte
- Une description orientée SEO
- Une description orientée conversion
`;
