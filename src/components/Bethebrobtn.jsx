import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import botlogo from "../assets/icons/botLogo.png";

/* ─────────────────────────────
   OUTER EDGE SEGMENT (NO HEAD)
───────────────────────────── */

const BLEED = 30;
const SPEED_IDLE = 0.006;
const SPEED_HOVER = 0.012;

const OuterEdgeCanvas = ({ hovered, pillW, pillH }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pillW || !pillH) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const cW = pillW + BLEED * 2;
    const cH = pillH + BLEED * 2;

    canvas.width = cW * dpr;
    canvas.height = cH * dpr;
    canvas.style.width = cW + "px";
    canvas.style.height = cH + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pillPath = () => {
      const r = pillH / 2;
      const x = BLEED;
      const y = BLEED;

      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + pillW, y, x + pillW, y + pillH, r);
      ctx.arcTo(x + pillW, y + pillH, x, y + pillH, r);
      ctx.arcTo(x, y + pillH, x, y, r);
      ctx.arcTo(x, y, x + pillW, y, r);
      ctx.closePath();
    };

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, cW, cH);

      const speed = hovered ? SPEED_HOVER : SPEED_IDLE;
      tRef.current = (tRef.current + speed) % 1;
      const t = tRef.current;

      ctx.save();
      pillPath();

      const gradient = ctx.createConicGradient(t * Math.PI * 2, cW / 2, cH / 2);

      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.85, "transparent");
      gradient.addColorStop(0.92, "rgba(0,255,120,0.9)");
      gradient.addColorStop(0.97, "rgba(0,255,120,0.4)");
      gradient.addColorStop(1, "transparent");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.restore();
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered, pillW, pillH]);

  if (!pillW || !pillH) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: -BLEED,
        left: -BLEED,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

/* ─────────────────────────────
   CLEAN MATRIX (ON HOVER)
───────────────────────────── */

const MatrixCanvas = ({ active }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      if (!active) return;

      tRef.current += 0.015;
      const t = tRef.current;

      const r = H / 2;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(W, 0, W, H, r);
      ctx.arcTo(W, H, 0, H, r);
      ctx.arcTo(0, H, 0, 0, r);
      ctx.arcTo(0, 0, W, 0, r);
      ctx.closePath();
      ctx.clip();

      for (let i = 0; i < 120; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const pulse = 0.4 + 0.6 * Math.sin(t + i);
        const size = 2 + pulse * 1.5;

        ctx.shadowColor = "rgba(0,255,120,1)";
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,120,${0.15 + pulse * 0.4})`;
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        borderRadius: "9999px",
        opacity: active ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};

/* ─────────────────────────────
   MAIN BUTTON
───────────────────────────── */

export default function BeTheCoBrotherButton() {
  const [hovered, setHovered] = useState(false);
  const pillRef = useRef(null);
  const [pillSize, setPillSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = pillRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setPillSize({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    setPillSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative flex justify-center mt-12">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", display: "inline-flex" }}
      >
        <OuterEdgeCanvas
          hovered={hovered}
          pillW={pillSize.w}
          pillH={pillSize.h}
        />

        <motion.div
          ref={pillRef}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="relative overflow-hidden rounded-full cursor-pointer"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,18,6,0.98) 0%, rgba(0,8,3,1) 100%)",
            height: "clamp(44px, 5vw, 62px)",
            minWidth: "clamp(220px, 24vw, 480px)",
            paddingLeft: "clamp(14px, 2vw, 28px)",
            paddingRight: "clamp(14px, 2vw, 28px)",
            zIndex: 2,
          }}
        >
          <MatrixCanvas active={hovered} />

          <div className="flex h-full w-full items-center justify-center gap-3 relative z-10">
            <img
              src={botlogo}
              alt="CoBrother Bot"
              style={{
                width: "clamp(28px, 3.2vw, 44px)",
                height: "clamp(28px, 3.2vw, 44px)",
                objectFit: "contain",
                filter: hovered
                  ? "drop-shadow(0 0 12px rgba(0,255,120,1))"
                  : "drop-shadow(0 0 6px rgba(0,255,120,0.6))",
                transition: "filter 0.3s ease",
              }}
            />

            <span
              className="font-semibold whitespace-nowrap select-none"
              style={{
                fontSize: "clamp(14px, 1.45vw, 21px)",
                color: "#ffffff",
                letterSpacing: "0.04em",
                textShadow: hovered
                  ? "0 0 10px rgba(255,255,255,1), 0 0 24px rgba(0,255,120,0.8)"
                  : "0 0 6px rgba(0,255,120,0.4)",
                transition: "text-shadow 0.3s ease",
              }}
            >
              Be The CoBrother
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
