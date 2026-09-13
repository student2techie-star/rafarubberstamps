import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playStampSound } from "../utils/audio";

export default function StampIntro({ onComplete }) {
  const [stage, setStage] = useState("entering"); // entering -> press -> retract -> fadeOut -> complete
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Accessibility check for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    // Sequence (~2.2s total):
    // 0.4s: Hits paper -> PLAY STAMP HIT SOUND
    // 0.65s: Immediately retracts tool leaving ink seal visible on white paper
    // 1.9s: Fade screen out
    // 2.3s: Complete
    const t1 = setTimeout(() => {
      setStage("press");
      playStampSound();
    }, 400);

    const t2 = setTimeout(() => setStage("retract"), 650);    // Immediately lifts tool away
    const t3 = setTimeout(() => setStage("fadeOut"), 1900);    // Fade screen out
    const t4 = setTimeout(() => onComplete(), 2300);          // Finish intro

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleUserClick = () => {
    playStampSound();
  };

  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ color: "#111111", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>RAFA RUBBER STAMPS</h2>
          <p style={{ color: "#B11226", fontWeight: 700 }}>ESTD. 1960 • TENKASI</p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {stage !== "complete" && (
        <motion.div
          key="stamp-intro-white-estd"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "fadeOut" ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          onClick={handleUserClick}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            userSelect: "none"
          }}
        >
          <div style={{ position: "relative", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/* PHYSICAL STAMP TOOL - Hits paper then IMMEDIATELY lifts/retracts up & vanishes */}
            <motion.div
              initial={{ y: -260, opacity: 0, scale: 1.4 }}
              animate={
                stage === "entering"
                  ? { y: -80, opacity: 0.8, scale: 1.2 }
                  : stage === "press"
                  ? { y: 0, opacity: 1, scale: 1 }
                  : stage === "retract" || stage === "fadeOut"
                  ? { y: -300, opacity: 0, scale: 1.3 } // Lifts tool off page
                  : {}
              }
              transition={
                stage === "retract"
                  ? { type: "spring", stiffness: 450, damping: 24 }
                  : { type: "spring", stiffness: 600, damping: 26 }
              }
              style={{
                position: "absolute",
                zIndex: 10,
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {/* Wooden Handle Knob */}
              <div
                style={{
                  width: 54,
                  height: 40,
                  borderRadius: "27px 27px 10px 10px",
                  background: "linear-gradient(180deg, #4A2E18 0%, #29170A 100%)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                  border: "1px solid #6B4426"
                }}
              />
              {/* Wooden Shaft */}
              <div
                style={{
                  width: 32,
                  height: 65,
                  background: "linear-gradient(180deg, #3A2312 0%, #1D0F06 100%)",
                  borderLeft: "1px solid #5C3A1E",
                  borderRight: "1px solid #110803"
                }}
              />
              {/* Heavy Base Die Mount */}
              <div
                style={{
                  width: 150,
                  height: 20,
                  background: "linear-gradient(180deg, #111111 0%, #252525 100%)",
                  borderRadius: 10,
                  boxShadow: "0 12px 25px rgba(0,0,0,0.35)",
                  border: "1px solid #444444"
                }}
              />
              {/* Red Rubber Die Layer */}
              <div
                style={{
                  width: 142,
                  height: 6,
                  background: "#B11226",
                  borderRadius: "0 0 4px 4px"
                }}
              />
            </motion.div>

            {/* RED STAMP INK IMPRESSION DISPLAYING "RAFA RUBBER STAMPS ESTD 1960" */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={
                stage === "press" || stage === "retract" || stage === "fadeOut"
                  ? { scale: 1, opacity: 1 }
                  : {}
              }
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                width: 260,
                height: 260,
                borderRadius: "50%",
                border: "6px double #B11226",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                textAlign: "center",
                color: "#B11226",
                boxShadow: "inset 0 0 12px rgba(177, 18, 38, 0.12)",
                background: "#FFFFFF",
                position: "relative",
                zIndex: 1,
                userSelect: "none"
              }}
            >
              {/* Top ESTD 1960 Badge */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 3,
                  color: "#B11226",
                  textTransform: "uppercase",
                  marginBottom: 4
                }}
              >
                ★ ESTD. 1960 ★
              </div>

              {/* Main Stamp Text Impression */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  lineHeight: 1.1,
                  letterSpacing: 2,
                  color: "#111111"
                }}
              >
                RAFA
              </div>

              <div
                style={{
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: 2.5,
                  color: "#B11226",
                  marginTop: 2,
                  marginBottom: 2
                }}
              >
                RUBBER STAMPS
              </div>

              <div
                style={{
                  height: 2,
                  width: 110,
                  background: "#B11226",
                  margin: "5px auto"
                }}
              />

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  color: "#252525",
                  textTransform: "uppercase"
                }}
              >
                TENKASI • ESTD. 1960
              </div>
            </motion.div>

          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={stage === "retract" || stage === "fadeOut" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 32,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#6B7280",
              textTransform: "uppercase"
            }}
          >
            ESTD. 1960 • Tenkasi • Nationwide Delivery
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
