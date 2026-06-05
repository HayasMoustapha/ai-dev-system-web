import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Branded favicon: a glowing neural node on deep space.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background:
            "radial-gradient(circle at 50% 40%, rgba(34,211,238,0.35), transparent 70%), #05060a",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
            boxShadow: "0 0 10px 2px rgba(34,211,238,0.9)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
