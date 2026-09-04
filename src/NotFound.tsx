import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#dc2626",
          marginBottom: "16px",
          fontWeight: 700,
        }}
      >
        Erro 404
      </span>
      <h1 style={{ fontSize: "clamp(48px, 10vw, 120px)", lineHeight: 1, marginBottom: "16px", fontWeight: 900 }}>
        404
      </h1>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", maxWidth: "420px" }}>
        Essa página não existe. Assim como essa campanha — é tudo ficção, lembra?
      </p>
      <Link
        to="/"
        style={{
          fontSize: "13px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: "#ffffff",
          backgroundColor: "#dc2626",
          padding: "14px 28px",
          borderRadius: "2px",
        }}
      >
        Voltar para o início
      </Link>
    </div>
  );
}
