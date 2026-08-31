export default function Step1Priorities({ onSelect }) {
  const priorities = [
    {
      id: "products",
      label: "Produits",
      desc: "Gérez vos produits dans une ambiance premium.",
      color1: "#fdf4e3",
      color2: "#f0e0c8",
    },
    {
      id: "promotions",
      label: "Promotions",
      desc: "Créez des campagnes intelligentes et chaleureuses.",
      color1: "#f7f0ff",
      color2: "#e3d6ff",
    },
    {
      id: "crypto",
      label: "Crypto‑commerce",
      desc: "Activez les options modernes et sécurisées.",
      color1: "#e9f7ff",
      color2: "#d4e9f7",
    },
  ];

  // Effet 3D Tilt
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 6; // inclinaison verticale
    const rotateY = ((x - centerX) / centerX) * -6; // inclinaison horizontale

    card.style.transform = `
      perspective(600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
    card.style.boxShadow = `
      ${-rotateY * 2}px ${rotateX * 2}px 24px rgba(0,0,0,0.18)
    `;
  };

  const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = `
      perspective(600px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
    card.style.boxShadow = `
      0 4px 12px rgba(0,0,0,0.10),
      0 8px 24px rgba(0,0,0,0.08)
    `;
  };

  return (
    <div>
      <h2
        style={{
          marginBottom: "24px",
          color: "#3a2f28",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        Quelle est votre priorité ?
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {priorities.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelect(p.id)}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${p.color1}, ${p.color2})`,
              boxShadow: `
                0 4px 12px rgba(0,0,0,0.10),
                0 8px 24px rgba(0,0,0,0.08)
              `,
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              transformStyle: "preserve-3d",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                color: "#3a2f28",
                fontWeight: "700",
              }}
            >
              {p.label}
            </h3>

            <p
              style={{
                fontSize: "15px",
                color: "#6b5a4a",
                lineHeight: "1.5",
              }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
