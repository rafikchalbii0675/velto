# ================================
#  Velto Cozy Warm — Organisation PRO
#  Script PowerShell
# ================================

Write-Host "Organisation PRO de Velto Cozy Warm..." -ForegroundColor Cyan

# --- Création des dossiers ---
$folders = @(
    "app/utils/ai",
    "app/utils/crypto",
    "app/utils/history",
    "app/utils/charts",
    "app/utils/helpers"
)

foreach ($folder in $folders) {
    if (-Not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "Dossier créé : $folder" -ForegroundColor Green
    } else {
        Write-Host "Dossier déjà existant : $folder" -ForegroundColor Yellow
    }
}

# --- Déplacements des fichiers ---
$filesToMove = @{
    "app/utils/ai.suggestions.server.js"           = "app/utils/ai/ai.suggestions.server.js";
    "app/utils/ai.suggestions.advanced.server.js"  = "app/utils/ai/ai.suggestions.advanced.server.js";
    "app/utils/ai.sales.predict.server.js"         = "app/utils/ai/ai.sales.predict.server.js";
    "app/utils/ai.product.analysis.server.js"      = "app/utils/ai/ai.product.analysis.server.js";
    "app/utils/ai.marketing.server.js"             = "app/utils/ai/ai.marketing.server.js";

    "app/utils/crypto.ai.server.js"                = "app/utils/crypto/crypto.ai.server.js";

    "app/utils/history.server.js"                  = "app/utils/history/history.server.js";

    "app/utils/charts.js"                          = "app/utils/charts/charts.js";
}

foreach ($source in $filesToMove.Keys) {
    $destination = $filesToMove[$source]

    if (Test-Path $source) {
        Move-Item -Path $source -Destination $destination -Force
        Write-Host "Déplacé : $source → $destination" -ForegroundColor Green
    } else {
        Write-Host "Fichier introuvable : $source" -ForegroundColor Red
    }
}

Write-Host "`nOrganisation terminée avec succès !" -ForegroundColor Cyan
