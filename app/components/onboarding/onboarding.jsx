// ---------------------------------------------
// SERVER SIDE (loader + action)
// ---------------------------------------------
import { json, redirect } from "@remix-run/node";
import { authenticate } from "~/shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  // Lire l'état d'onboarding dans Shopify
  const response = await admin.graphql(`
    #graphql
    query GetOnboardingState {
      shop {
        metafield(namespace: "velto_cozy", key: "onboarding_done") {
          value
        }
      }
    }
  `);

  const data = await response.json();
  const done = data?.data?.shop?.metafield?.value === "true";

  if (done) {
    return redirect("/app/dashboard");
  }

  return json({ ok: true });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  // Récupérer l'ID du shop
  const shopResponse = await admin.graphql(`
    #graphql
    query GetShopId {
      shop {
        id
      }
    }
  `);

  const shopData = await shopResponse.json();
  const shopId = shopData?.data?.shop?.id;

  if (!shopId) {
    return json({ saved: false }, { status: 500 });
  }

  // Sauvegarder l'onboarding dans Shopify
  await admin.graphql(`
    #graphql
    mutation SaveOnboarding {
      metafieldsSet(
        metafields: [
          {
            ownerId: "${shopId}",
            namespace: "velto_cozy",
            key: "onboarding_done",
            type: "single_line_text_field",
            value: "true"
          }
        ]
      ) {
        metafields {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `);

  return json({ saved: true });
};

// ---------------------------------------------
// CLIENT SIDE (React onboarding)
// ---------------------------------------------
import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

import VeltoLayout from "../components/velto/VeltoLayout";
import ProgressBar from "../components/onboarding/ProgressBar";
import Step1Priorities from "../components/onboarding/Step1Priorities";
import Step2Details from "../components/onboarding/Step2Details";
import Step3Finish from "../components/onboarding/Step3Finish";
import FadeTransition from "../components/onboarding/FadeTransition";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [priority, setPriority] = useState(null);
  const navigate = useNavigate();

  // Vérifier session locale
  useEffect(() => {
    const done = sessionStorage.getItem("velto_onboarding");
    if (done === "done") {
      navigate("/app/dashboard");
    }
  }, [navigate]);

  // Sauvegarder session + Shopify quand Step 3
  useEffect(() => {
    if (step === 3) {
      sessionStorage.setItem("velto_onboarding", "done");

      // Route Remix correcte : /app/onboarding
      fetch("/app/onboarding", {
        method: "POST",
      });
    }
  }, [step]);

  return (
    <VeltoLayout>
      <ProgressBar step={step} />

      <FadeTransition step={step}>
        {(currentStep) => {
          if (currentStep === 1) {
            return (
              <Step1Priorities
                onSelect={(p) => {
                  setPriority(p);
                  setStep(2);
                }}
              />
            );
          }

          if (currentStep === 2) {
            return <Step2Details priority={priority} />;
          }

          if (currentStep === 3) {
            return <Step3Finish priority={priority} />;
          }

          return null;
        }}
      </FadeTransition>
    </VeltoLayout>
  );
}
