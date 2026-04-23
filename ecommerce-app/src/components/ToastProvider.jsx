import { useCallback, useMemo, useRef, useState } from "react";
import { ToastContext } from "../hooks/useToast.js";

function ToastItem({ toast, onClose }) {
  const background =
    toast.type === "success"
      ? "#16a34a"
      : toast.type === "error"
        ? "#dc2626"
        : "#111827";

  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        color: "white",
        background,
        boxShadow: "0 10px 18px rgba(0,0,0,0.15)",
        maxWidth: 420,
      }}
    >
      <div style={{ flex: 1, lineHeight: "1.25rem" }}>{toast.message}</div>
      <button
        onClick={() => onClose(toast.id)}
        aria-label="Close"
        style={{
          border: "none",
          background: "transparent",
          color: "white",
          cursor: "pointer",
          fontSize: 16,
          lineHeight: "1rem",
          padding: 0,
        }}
      >
        {"\u2715"}
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  const dismiss = useCallback((id) => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, options = {}) => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now() + Math.random());

      const next = {
        id,
        message: String(message ?? ""),
        type: options.type || "info",
        durationMs:
          typeof options.durationMs === "number" ? options.durationMs : 3000,
      };

      setToasts((prev) => [...prev, next].slice(-4));

      const timeout = setTimeout(() => dismiss(id), next.durationMs);
      timeoutsRef.current.set(id, timeout);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: "auto" }}>
            <ToastItem toast={t} onClose={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
