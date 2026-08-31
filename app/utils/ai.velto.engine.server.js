// AI Velto Engine — Le cerveau central de Velto
import { generateVeltoSuggestions } from "./ai.suggestions.server";
import { generateVeltoAdvancedSuggestions } from "./ai.suggestions.advanced.server";
import { generateVeltoMlSuggestions } from "./ai.ml.suggestions.server";
import { recordAiScoreHistory } from "./ai.scorehistory.server";
import { generateAiInsights } from "./ai.insights.server";
import { collectUserFeedback } from "./ai.feedback.server";
import { generateVeltoUpdates } from "./ai.updates.server";
import { generateVeltoRoadmap } from "./ai.roadmap.server";
import { processUserVotes } from "./ai.votes.server";

export async function runVeltoAIEngine() {
  // 1) Suggestions simples
  await generateVeltoSuggestions();

  // 2) Suggestions avancées (ventes, tendances, saisons)
  await generateVeltoAdvancedSuggestions();

  // 3) Machine Learning léger
  const mlResults = await generateVeltoMlSuggestions();

  // 4) Historique des scores
  await recordAiScoreHistory(mlResults);

  // 5) Insights AI (tableau pour Dashboard PRO)
  await generateAiInsights();

  // 6) Feedback utilisateurs
  await collectUserFeedback();

  // 7) Mises à jour Velto (release notes)
  await generateVeltoUpdates();

  // 8) Roadmap publique
  await generateVeltoRoadmap();

  // 9) Votes utilisateurs
  await processUserVotes();

  return { ok: true };
}
