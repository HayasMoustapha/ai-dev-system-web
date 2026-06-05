import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "../lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(1000px 600px at 20% 0%, rgba(34,211,238,0.22), transparent 60%)," +
            "radial-gradient(1000px 600px at 90% 30%, rgba(167,139,250,0.20), transparent 60%)," +
            "radial-gradient(900px 700px at 50% 110%, rgba(91,140,255,0.18), transparent 60%)," +
            "#05060a",
          color: "#e7eaf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "9999px",
              background: "#22d3ee",
              boxShadow: "0 0 24px 6px rgba(34,211,238,0.8)",
            }}
          />
          <div style={{ fontSize: "30px", letterSpacing: "0.04em", color: "#8b93a7" }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              backgroundImage: "linear-gradient(100deg, #e7eaf3 0%, #a78bfa 50%, #22d3ee 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div style={{ marginTop: "28px", fontSize: "34px", color: "#a9b0c2", maxWidth: "900px" }}>
            Le système de livraison gouverné — pour n&apos;importe quel exécuteur IA.
          </div>
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Reprise exacte", "Attestation", "Prédictif", "Strictesse"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                fontSize: "24px",
                color: "#cdd3e1",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "9999px",
                padding: "10px 22px",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
