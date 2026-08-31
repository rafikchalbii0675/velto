import { useEffect, useState } from "react";
import LoaderCozy from "./LoaderCozy";

export default function FadeTransition({ step, children }) {
  const [visible, setVisible] = useState(true);
  const [renderedStep, setRenderedStep] = useState(step);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fade-out
    setVisible(false);
    setLoading(true);

    const timeout = setTimeout(() => {
      // Changer l'étape affichée
      setRenderedStep(step);

      // Fade-in
      setVisible(true);

      // Arrêter le loader
      setLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div>
      {loading && <LoaderCozy />}

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {children(renderedStep)}
      </div>
    </div>
  );
}
