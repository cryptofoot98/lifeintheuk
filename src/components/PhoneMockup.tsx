"use client";
import { useState, useEffect } from "react";

const INTERVAL_MS = 3200;
const SCREENS = 3;

export function PhoneMockup() {
  const [screen, setScreen] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setScreen((s) => (s + 1) % SCREENS);
        setFading(false);
      }, 280);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="phone-float select-none pointer-events-none flex flex-col items-center">
      {/* Phone frame */}
      <div
        style={{
          width: 248,
          height: 496,
          borderRadius: 44,
          background: "linear-gradient(160deg, #1a1f3a 0%, #0d1224 100%)",
          boxShadow:
            "0 48px 96px rgba(1,33,105,0.45), 0 0 0 1.5px rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.06)",
          padding: "10px 7px",
          position: "relative",
        }}
      >
        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 88,
            height: 26,
            background: "#0d1224",
            borderRadius: 20,
            zIndex: 10,
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 37,
            overflow: "hidden",
            opacity: fading ? 0 : 1,
            transition: "opacity 0.28s ease",
          }}
        >
          {screen === 0 && <QuizScreen />}
          {screen === 1 && <ResultScreen />}
          {screen === 2 && <ProgressScreen />}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex items-center gap-1.5 mt-5">
        {Array.from({ length: SCREENS }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === screen ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background:
                i === screen
                  ? "oklch(0.47 0.22 25)"
                  : "oklch(0.47 0.22 25 / 28%)",
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function QuizScreen() {
  return (
    <div style={{ height: "100%", background: "#f7f8ff", display: "flex", flexDirection: "column" }}>
      {/* Status bar */}
      <div style={{ padding: "36px 14px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#012169", background: "#e8ecff", padding: "3px 8px", borderRadius: 20 }}>
          Q 14 / 24
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff0f0", padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: 800, color: "#C8102E" }}>
          ⏱ 31:42
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ margin: "0 14px 14px", height: 7, background: "#e2e6f0", borderRadius: 4 }}>
        <div style={{ width: "58%", height: "100%", background: "linear-gradient(90deg, #C8102E, #e83050)", borderRadius: 4 }} />
      </div>

      {/* Question */}
      <div style={{ padding: "0 14px", fontSize: 12, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.55, marginBottom: 14 }}>
        When did women in the UK first gain the right to vote in general elections?
      </div>

      {/* Options */}
      <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 7 }}>
        {[
          { label: "A", text: "1902", state: "wrong" },
          { label: "B", text: "1918", state: "correct" },
          { label: "C", text: "1928", state: "default" },
          { label: "D", text: "1945", state: "default" },
        ].map((opt) => (
          <div
            key={opt.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 11px",
              borderRadius: 12,
              border: opt.state === "correct"
                ? "2px solid #C8102E"
                : opt.state === "wrong"
                ? "2px solid #fca5a5"
                : "2px solid #e2e6f0",
              background: opt.state === "correct" ? "#fff0f0" : opt.state === "wrong" ? "#fff5f5" : "white",
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: opt.state === "correct" ? "#C8102E" : opt.state === "wrong" ? "#fca5a5" : "#e2e6f0",
              fontSize: 9, fontWeight: 900, color: opt.state === "correct" ? "white" : opt.state === "wrong" ? "white" : "#64748b",
            }}>
              {opt.label}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: opt.state === "correct" ? "#C8102E" : "#374151", flex: 1 }}>
              {opt.text}
            </span>
            {opt.state === "correct" && <span style={{ fontSize: 12 }}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultScreen() {
  return (
    <div style={{ height: "100%", background: "white", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 14px 14px" }}>
      {/* Trophy */}
      <div style={{
        width: 68, height: 68, borderRadius: 22,
        background: "linear-gradient(140deg, #C8102E 0%, #8B0C23 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30, marginBottom: 12,
        boxShadow: "0 8px 24px rgba(200,16,46,0.35)",
      }}>🏆</div>

      <div style={{ fontSize: 14, fontWeight: 900, color: "#1a1a2e", marginBottom: 2 }}>Test Complete!</div>
      <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 18 }}>You passed the test 🎉</div>

      {/* Score circle */}
      <div style={{
        width: "100%", background: "linear-gradient(135deg, #fff0f0, #f7f8ff)",
        borderRadius: 18, padding: "14px 12px", marginBottom: 12, textAlign: "center",
        border: "2px solid #f3e8ff",
      }}>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#C8102E", lineHeight: 1 }}>21</div>
        <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>out of 24 questions</div>
        <div style={{
          display: "inline-block", fontSize: 11, fontWeight: 800, color: "#059669",
          background: "#dcfce7", padding: "3px 12px", borderRadius: 20,
        }}>87.5% · PASSED ✓</div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        {[
          { icon: "✓", label: "Correct", value: "21", color: "#059669", bg: "#dcfce7" },
          { icon: "✗", label: "Wrong", value: "3", color: "#C8102E", bg: "#fee2e2" },
          { icon: "⏱", label: "Time", value: "32m", color: "#012169", bg: "#e8ecff" },
        ].map((s) => (
          <div key={s.label} style={{ flex: 1, background: s.bg, borderRadius: 12, padding: "10px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Explanation nudge */}
      <div style={{
        width: "100%", marginTop: 10, background: "#f7f8ff", borderRadius: 12,
        padding: "9px 12px", fontSize: 10, color: "#6b7280",
        border: "1px solid #e2e6f0",
      }}>
        📖 <strong style={{ color: "#012169" }}>3 topics to review</strong> — tap to see explanations
      </div>
    </div>
  );
}

function ProgressScreen() {
  return (
    <div style={{ height: "100%", background: "#f7f8ff", padding: "38px 14px 14px", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 13, fontWeight: 900, color: "#1a1a2e", marginBottom: 2 }}>Your Progress</div>
      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 14 }}>Great work this week 🇬🇧</div>

      {/* Streak card */}
      <div style={{
        background: "linear-gradient(135deg, #C8102E 0%, #8B0C23 100%)",
        borderRadius: 16, padding: "12px 14px", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 6px 20px rgba(200,16,46,0.3)",
      }}>
        <span style={{ fontSize: 28 }}>🔥</span>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "white", lineHeight: 1 }}>7</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)" }}>Day streak</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: "white" }}>85%</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)" }}>Avg score</div>
        </div>
      </div>

      {/* Score bars */}
      <div style={{ fontSize: 10, fontWeight: 800, color: "#374151", marginBottom: 8 }}>Recent tests</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 54, marginBottom: 14 }}>
        {[72, 79, 83, 88, 92].map((pct, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: "100%",
              height: `${(pct / 100) * 48}px`,
              background: pct >= 75
                ? `linear-gradient(180deg, #e83050, #C8102E)`
                : "#e2e6f0",
              borderRadius: "4px 4px 0 0",
            }} />
            <span style={{ fontSize: 8, color: "#9ca3af" }}>{pct}%</span>
          </div>
        ))}
      </div>

      {/* XP bar */}
      <div style={{ background: "white", borderRadius: 14, padding: "10px 12px", border: "1.5px solid #e2e6f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
          <span>⭐ Level 4</span>
          <span style={{ color: "#9ca3af" }}>420 / 500 XP</span>
        </div>
        <div style={{ height: 8, background: "#e2e6f0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            width: "84%", height: "100%",
            background: "linear-gradient(90deg, #012169, #C8102E)",
            borderRadius: 4,
          }} />
        </div>
      </div>
    </div>
  );
}
