import VeltoLayout from "../components/velto/VeltoLayout";
import { useState } from "react";
import Step1Priorities from "./Step1Priorities";
import Products from "./Products";
import Promotions from "./Promotions";
import Alerts from "./Alerts";
import Crypto from "./Crypto";
import Step3Finish from "./Step3Finish";

export default function OnboardingLayout() {
  const [step, setStep] = useState(1);
  const [selectedPriority, setSelectedPriority] = useState(null);

  const priorityMap = {
    products: <Products />,
    promotions: <Promotions />,
    alerts: <Alerts />,
    crypto: <Crypto />,
  };

  function goToStep(next) {
    setStep(next);
  }

  function selectPriority(priority) {
    setSelectedPriority(priority);
    setStep(2);
  }

  return (
    <main style={styles.page}>
      {step === 1 && <Step1Priorities onSelect={selectPriority} />}

      {step === 2 && (
        <>
          {priorityMap[selectedPriority]}
          <button style={styles.nextButton} onClick={() => goToStep(3)}>
            Continuer
          </button>
        </>
      )}

      {step === 3 && <Step3Finish />}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    padding: "40px 20px",
    background: "#f6f6f7",
  },
  nextButton: {
    marginTop: "24px",
    padding: "14px 20px",
    background: "#202223",
    color: "#ffffff",
    border: "none",
    borderRadius: "9px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
