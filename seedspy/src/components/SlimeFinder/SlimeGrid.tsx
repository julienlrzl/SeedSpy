import React, { useRef, useEffect } from "react";

const BASE_CHUNKS = 64;
const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
const LERP_SPEED = 0.18;
const CACHE_PADDING = 10;
export const RULER_SIZE = 30;

// Returns step in chunks, guaranteed so that step*16 gives nice block coords
function computeStep(chunkPx: number): number {
  const minPx = 55;
  const rawChunks = minPx / chunkPx;
  if (rawChunks <= 1) return 1; // every chunk → labels 0, 16, 32 …
  // Only allow steps that produce clean multiples of 16 in block coords
  const steps = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
  for (const s of steps) {
    if (s >= rawChunks) return s;
  }
  return Math.pow(2, Math.ceil(Math.log2(rawChunks)));
}

export interface SlimeGridProps {
  gridSize: number;
  seed: string;
  platform: "java" | "bedrock";
  isSlimeFn: (seed: bigint, x: number, z: number) => boolean;
  centerChunk: { x: number; z: number };
  setCenterChunk: React.Dispatch<
    React.SetStateAction<{ x: number; z: number }>
  >;
  markerChunk: { x: number; z: number } | null;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onHoverChunk: React.Dispatch<
    React.SetStateAction<{ x: number; z: number } | null>
  >;
  onHoverBlock?: React.Dispatch<
    React.SetStateAction<{ x: number; z: number } | null>
  >;
  gridRef: React.RefObject<HTMLDivElement>;
}

export default function SlimeGrid({
  gridSize,
  seed,
  platform,
  isSlimeFn,
  centerChunk,
  setCenterChunk,
  markerChunk,
  zoom,
  setZoom,
  onHoverChunk,
  onHoverBlock,
  gridRef,
}: SlimeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const topRulerRef = useRef<HTMLCanvasElement>(null!);
  const leftRulerRef = useRef<HTMLCanvasElement>(null!);

  // All mutable animation state — refs to avoid re-renders
  const s = useRef({
    displayZoom: zoom,
    targetZoom: zoom,
    center: { x: centerChunk.x, z: centerChunk.z },
    isDragging: false,
    dragStart: null as {
      cx: number;
      cz: number;
      px: number;
      pz: number;
    } | null,
    marker: markerChunk,
    seed,
    platform,
    cache: new Set<string>(),
    cacheMeta: { cx: 0, cz: 0, radius: 0, seed: "", platform: "" },
  });

  // Keep callbacks current without re-running the main effect
  const cb = useRef({
    isSlimeFn,
    setZoom,
    setCenterChunk,
    onHoverChunk,
    onHoverBlock,
  });
  cb.current = {
    isSlimeFn,
    setZoom,
    setCenterChunk,
    onHoverChunk,
    onHoverBlock,
  };

  // ── Sync props → animation state ──────────────────────
  useEffect(() => {
    if (!s.current.isDragging)
      s.current.center = { x: centerChunk.x, z: centerChunk.z };
  }, [centerChunk.x, centerChunk.z]);

  useEffect(() => {
    s.current.targetZoom = zoom;
  }, [zoom]);
  useEffect(() => {
    s.current.marker = markerChunk;
  }, [markerChunk]);
  useEffect(() => {
    s.current.seed = seed;
  }, [seed]);
  useEffect(() => {
    s.current.platform = platform;
  }, [platform]);

  // ── Main effect: canvas + rulers + animation + events ─
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = gridRef.current;
    const topRuler = topRulerRef.current;
    const leftRuler = leftRulerRef.current;
    if (!canvas || !container || !topRuler || !leftRuler) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = gridSize * dpr;
    canvas.height = gridSize * dpr;
    topRuler.width = gridSize * dpr;
    topRuler.height = RULER_SIZE * dpr;
    leftRuler.width = RULER_SIZE * dpr;
    leftRuler.height = gridSize * dpr;

    const ctx = canvas.getContext("2d")!;
    const topCtx = topRuler.getContext("2d")!;
    const leftCtx = leftRuler.getContext("2d")!;

    let running = true;

    // ── Cache ──
    function ensureCache() {
      const st = s.current;
      const visible = Math.ceil(BASE_CHUNKS / st.displayZoom);
      const radius = Math.ceil(visible / 2) + CACHE_PADDING;
      const rcx = Math.round(st.center.x);
      const rcz = Math.round(st.center.z);
      const m = st.cacheMeta;

      if (
        m.seed === st.seed &&
        m.platform === st.platform &&
        Math.abs(m.cx - rcx) <= CACHE_PADDING / 2 &&
        Math.abs(m.cz - rcz) <= CACHE_PADDING / 2 &&
        radius <= m.radius
      )
        return;

      const set = new Set<string>();
      try {
        const big = BigInt(st.seed);
        const fn = cb.current.isSlimeFn;
        for (let dx = -radius; dx <= radius; dx++)
          for (let dz = -radius; dz <= radius; dz++)
            if (fn(big, rcx + dx, rcz + dz))
              set.add(`${rcx + dx},${rcz + dz}`);
      } catch {
        /* invalid seed */
      }

      st.cache = set;
      st.cacheMeta = {
        cx: rcx,
        cz: rcz,
        radius,
        seed: st.seed,
        platform: st.platform,
      };
    }

    // ── Draw grid ──
    function drawGrid() {
      const st = s.current;
      const z = st.displayZoom;
      const c = st.center;
      const mk = st.marker;

      const chunkPx = (gridSize / BASE_CHUNKS) * z;
      const vis = gridSize / chunkPx;
      const sx = c.x - vis / 2;
      const sz = c.z - vis / 2;

      const x0 = Math.floor(sx),
        x1 = Math.ceil(sx + vis);
      const z0 = Math.floor(sz),
        z1 = Math.ceil(sz + vis);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, gridSize, gridSize);

      // Chunks
      const cache = st.cache;
      for (let cx = x0; cx <= x1; cx++) {
        for (let cz = z0; cz <= z1; cz++) {
          const px = (cx - sx) * chunkPx;
          const pz = (cz - sz) * chunkPx;
          if (
            px + chunkPx < 0 ||
            px > gridSize ||
            pz + chunkPx < 0 ||
            pz > gridSize
          )
            continue;

          const isMk = mk !== null && mk.x === cx && mk.z === cz;
          const isSl = cache.has(`${cx},${cz}`);

          if (isMk) {
            ctx.fillStyle = "#ef4444";
            ctx.fillRect(px, pz, chunkPx, chunkPx);
          } else if (isSl) {
            ctx.fillStyle = "#76be6d";
            ctx.fillRect(px, pz, chunkPx, chunkPx);
          }
        }
      }

      // Grid lines
      if (chunkPx >= 4) {
        ctx.strokeStyle = "rgba(209,213,219,0.5)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let cx = x0; cx <= x1 + 1; cx++) {
          const px = Math.round((cx - sx) * chunkPx) + 0.5;
          if (px >= 0 && px <= gridSize) {
            ctx.moveTo(px, 0);
            ctx.lineTo(px, gridSize);
          }
        }
        for (let cz = z0; cz <= z1 + 1; cz++) {
          const pz = Math.round((cz - sz) * chunkPx) + 0.5;
          if (pz >= 0 && pz <= gridSize) {
            ctx.moveTo(0, pz);
            ctx.lineTo(gridSize, pz);
          }
        }
        ctx.stroke();
      }

      // Marker border
      if (mk) {
        const mpx = (mk.x - sx) * chunkPx;
        const mpz = (mk.z - sz) * chunkPx;
        if (
          mpx + chunkPx >= 0 &&
          mpx <= gridSize &&
          mpz + chunkPx >= 0 &&
          mpz <= gridSize
        ) {
          ctx.strokeStyle = "rgb(55,65,81)";
          ctx.lineWidth = 2;
          ctx.strokeRect(mpx, mpz, chunkPx, chunkPx);
        }
      }

      // Outer border
      ctx.strokeStyle = "rgb(156,163,175)";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, gridSize - 2, gridSize - 2);

      ctx.restore();
    }

    // ── Draw rulers ──
    function drawRulers() {
      const st = s.current;
      const chunkPx = (gridSize / BASE_CHUNKS) * st.displayZoom;
      const vis = gridSize / chunkPx;
      const startX = st.center.x - vis / 2;
      const startZ = st.center.z - vis / 2;
      const step = computeStep(chunkPx);

      // ── Top ruler (X axis) ──
      topCtx.clearRect(0, 0, topRuler.width, topRuler.height);
      topCtx.save();
      topCtx.scale(dpr, dpr);

      topCtx.font = "10px Inter, system-ui, sans-serif";
      topCtx.textAlign = "center";
      topCtx.textBaseline = "bottom";

      // Major ticks + labels
      const firstX = Math.ceil(startX / step) * step;
      for (let chunk = firstX; chunk <= startX + vis; chunk += step) {
        const px = (chunk - startX) * chunkPx;
        if (px < -1 || px > gridSize + 1) continue;

        // Tick
        topCtx.strokeStyle = "rgba(156,163,175,0.7)";
        topCtx.lineWidth = 1;
        topCtx.beginPath();
        topCtx.moveTo(Math.round(px) + 0.5, RULER_SIZE - 7);
        topCtx.lineTo(Math.round(px) + 0.5, RULER_SIZE);
        topCtx.stroke();

        // Label (block coords = chunk * 16)
        topCtx.fillStyle = "#6b7280";
        topCtx.fillText(String(chunk * 16), px, RULER_SIZE - 9);
      }

      // Minor ticks
      const minorStep = step >= 4 ? step / 4 : step >= 2 ? step / 2 : 0;
      if (minorStep > 0 && minorStep * chunkPx >= 6) {
        topCtx.strokeStyle = "rgba(156,163,175,0.35)";
        topCtx.lineWidth = 1;
        const firstMinor = Math.ceil(startX / minorStep) * minorStep;
        for (
          let chunk = firstMinor;
          chunk <= startX + vis;
          chunk += minorStep
        ) {
          if (Math.abs(chunk % step) < 0.001) continue;
          const px = (chunk - startX) * chunkPx;
          if (px < -1 || px > gridSize + 1) continue;
          topCtx.beginPath();
          topCtx.moveTo(Math.round(px) + 0.5, RULER_SIZE - 4);
          topCtx.lineTo(Math.round(px) + 0.5, RULER_SIZE);
          topCtx.stroke();
        }
      }

      // Bottom edge line
      topCtx.strokeStyle = "rgba(209,213,219,0.8)";
      topCtx.lineWidth = 1;
      topCtx.beginPath();
      topCtx.moveTo(0, RULER_SIZE - 0.5);
      topCtx.lineTo(gridSize, RULER_SIZE - 0.5);
      topCtx.stroke();

      topCtx.restore();

      // ── Left ruler (Z axis) ──
      leftCtx.clearRect(0, 0, leftRuler.width, leftRuler.height);
      leftCtx.save();
      leftCtx.scale(dpr, dpr);

      leftCtx.font = "10px Inter, system-ui, sans-serif";
      leftCtx.textAlign = "right";
      leftCtx.textBaseline = "middle";

      // Major ticks + labels
      const firstZ = Math.ceil(startZ / step) * step;
      for (let chunk = firstZ; chunk <= startZ + vis; chunk += step) {
        const py = (chunk - startZ) * chunkPx;
        if (py < -1 || py > gridSize + 1) continue;

        // Tick
        leftCtx.strokeStyle = "rgba(156,163,175,0.7)";
        leftCtx.lineWidth = 1;
        leftCtx.beginPath();
        leftCtx.moveTo(RULER_SIZE - 7, Math.round(py) + 0.5);
        leftCtx.lineTo(RULER_SIZE, Math.round(py) + 0.5);
        leftCtx.stroke();

        // Label (block coords = chunk * 16)
        leftCtx.fillStyle = "#6b7280";
        leftCtx.fillText(String(chunk * 16), RULER_SIZE - 9, py);
      }

      // Minor ticks
      if (minorStep > 0 && minorStep * chunkPx >= 6) {
        leftCtx.strokeStyle = "rgba(156,163,175,0.35)";
        leftCtx.lineWidth = 1;
        const firstMinor = Math.ceil(startZ / minorStep) * minorStep;
        for (
          let chunk = firstMinor;
          chunk <= startZ + vis;
          chunk += minorStep
        ) {
          if (Math.abs(chunk % step) < 0.001) continue;
          const py = (chunk - startZ) * chunkPx;
          if (py < -1 || py > gridSize + 1) continue;
          leftCtx.beginPath();
          leftCtx.moveTo(RULER_SIZE - 4, Math.round(py) + 0.5);
          leftCtx.lineTo(RULER_SIZE, Math.round(py) + 0.5);
          leftCtx.stroke();
        }
      }

      // Right edge line
      leftCtx.strokeStyle = "rgba(209,213,219,0.8)";
      leftCtx.lineWidth = 1;
      leftCtx.beginPath();
      leftCtx.moveTo(RULER_SIZE - 0.5, 0);
      leftCtx.lineTo(RULER_SIZE - 0.5, gridSize);
      leftCtx.stroke();

      leftCtx.restore();
    }

    // ── Animation loop ──
    function animate() {
      if (!running) return;
      const st = s.current;
      const diff = st.targetZoom - st.displayZoom;
      if (Math.abs(diff) > 0.001) st.displayZoom += diff * LERP_SPEED;
      else st.displayZoom = st.targetZoom;

      ensureCache();
      drawGrid();
      drawRulers();
      requestAnimationFrame(animate);
    }

    // ── Event handlers ──
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const st = s.current;
      const factor = Math.pow(1.0015, -e.deltaY);
      const nz = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, st.targetZoom * factor)
      );
      st.targetZoom = nz;
      cb.current.setZoom(nz);
    }

    function onPointerDown(e: PointerEvent) {
      e.preventDefault();
      container.setPointerCapture(e.pointerId);
      const st = s.current;
      st.isDragging = true;
      st.dragStart = {
        cx: st.center.x,
        cz: st.center.z,
        px: e.clientX,
        pz: e.clientY,
      };
      container.style.cursor = "grabbing";
    }

    function onPointerMove(e: PointerEvent) {
      const st = s.current;

      if (st.isDragging && st.dragStart) {
        const chunkPx = (gridSize / BASE_CHUNKS) * st.displayZoom;
        st.center = {
          x: st.dragStart.cx - (e.clientX - st.dragStart.px) / chunkPx,
          z: st.dragStart.cz - (e.clientY - st.dragStart.pz) / chunkPx,
        };
      }

      const rect = container.getBoundingClientRect();
      const rx = e.clientX - rect.left;
      const ry = e.clientY - rect.top;

      if (rx >= 0 && rx < gridSize && ry >= 0 && ry < gridSize) {
        const chunkPx = (gridSize / BASE_CHUNKS) * st.displayZoom;
        const vis = gridSize / chunkPx;
        const wx = st.center.x - vis / 2 + rx / chunkPx;
        const wz = st.center.z - vis / 2 + ry / chunkPx;
        const cx = Math.floor(wx);
        const cz = Math.floor(wz);

        cb.current.onHoverChunk({ x: cx, z: cz });
        cb.current.onHoverBlock?.({
          x: cx * 16 + Math.floor((wx - cx) * 16),
          z: cz * 16 + Math.floor((wz - cz) * 16),
        });
      } else {
        cb.current.onHoverChunk(null);
        cb.current.onHoverBlock?.(null);
      }
    }

    function onPointerUp(e: PointerEvent) {
      container.releasePointerCapture(e.pointerId);
      const st = s.current;
      st.isDragging = false;
      container.style.cursor = "grab";
      if (st.dragStart) {
        cb.current.setCenterChunk({
          x: Math.round(st.center.x),
          z: Math.round(st.center.z),
        });
      }
      st.dragStart = null;
    }

    function onPointerLeave() {
      cb.current.onHoverChunk(null);
      cb.current.onHoverBlock?.(null);
    }

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);

    animate();

    return () => {
      running = false;
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [gridSize]);

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      {/* Top ruler row */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: RULER_SIZE,
            height: RULER_SIZE,
            flexShrink: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontFamily: "Inter, system-ui, sans-serif",
              color: "#9ca3af",
              lineHeight: 1,
            }}
          >
            <span style={{ position: "relative", top: -3 }}>X→</span>
            <br />
            <span>Z↓</span>
          </span>
        </div>
        <canvas
          ref={topRulerRef}
          style={{ width: gridSize, height: RULER_SIZE, display: "block" }}
        />
      </div>
      {/* Grid row */}
      <div style={{ display: "flex" }}>
        <canvas
          ref={leftRulerRef}
          style={{ width: RULER_SIZE, height: gridSize, display: "block" }}
        />
        <div
          ref={gridRef}
          style={{
            width: gridSize,
            height: gridSize,
            cursor: "grab",
            userSelect: "none",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: gridSize, height: gridSize, display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
