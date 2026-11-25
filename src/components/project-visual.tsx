import type { ProjectVisual as VisualKind } from "@/data/types";

/**
 * Authored schematics, one per kind of project. They are the site's visual signature:
 * engineering drawings in the accent ink on a faint grid, never stock imagery.
 */

const A = "var(--accent)";
const L = "var(--line-strong)";
const M = "var(--muted)";

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="8" fill={M} style={{ fontFamily: "var(--font-geist-mono)", letterSpacing: "0.02em" }}>
      {children}
    </text>
  );
}

function Pipeline() {
  const steps = ["docs", "chunk", "embed", "retrieve", "llm"];
  return (
    <g>
      {steps.map((s, i) => {
        const x = 18 + i * 58;
        return (
          <g key={s}>
            <rect x={x} y={72} width={48} height={30} rx={5} fill="var(--surface)" stroke={i === 4 ? A : L} strokeWidth={1.2} />
            <Label x={x + 24} y={90}>{s}</Label>
            {i < 4 && <path className="schematic-trace" d={`M${x + 48} 87 H${x + 58}`} stroke={A} strokeWidth={1.4} />}
          </g>
        );
      })}
      {/* throttle valve before the model */}
      <path d="M256 60 v8 M252 64 h8" stroke={A} strokeWidth={1.2} />
      <rect x={240} y={40} width={34} height={16} rx={3} fill="none" stroke={A} strokeDasharray="2 2" />
      <Label x={257} y={51}>429</Label>
      <path className="schematic-trace" d="M257 56 V72" stroke={A} strokeDasharray="2 3" strokeWidth={1} />
      {/* log line */}
      <path d="M42 102 V128 H274 V102" stroke={L} fill="none" strokeDasharray="3 3" />
      <Label x={158} y={142}>requests.csv</Label>
    </g>
  );
}

function Reservoir() {
  const r = rand(7);
  const nodes = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 + r() * 0.3;
    const rad = 30 + r() * 26;
    return { x: 160 + Math.cos(a) * rad * 1.25, y: 90 + Math.sin(a) * rad };
  });
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < 16; i++) for (let j = 0; j < 2; j++) edges.push([i, Math.floor(r() * 16)]);
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={L} strokeWidth={0.8} />
      ))}
      <circle cx={34} cy={90} r={6} fill="var(--surface)" stroke={M} />
      <Label x={34} y={112}>u(t)</Label>
      {[0, 5, 9, 12].map((i) => (
        <line key={i} x1={40} y1={90} x2={nodes[i].x} y2={nodes[i].y} stroke={M} strokeWidth={0.7} strokeDasharray="2 2" />
      ))}
      {[2, 6, 10, 14, 3].map((i) => (
        <path key={i} className="schematic-trace" d={`M${nodes[i].x} ${nodes[i].y} L286 90`} stroke={A} strokeWidth={1.1} />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={3.2} fill="var(--surface)" stroke={M} strokeWidth={0.9} />
      ))}
      <circle cx={286} cy={90} r={7} fill={A} />
      <Label x={286} y={112}>W_out</Label>
      <Label x={160} y={166}>fixed reservoir · trained readout</Label>
    </g>
  );
}

function Waveform() {
  const wave = (y: number, f: number, flip: number[]) =>
    Array.from({ length: 121 }, (_, i) => {
      const x = 24 + i * 2.25;
      const seg = Math.floor(i / 30);
      const ph = flip[seg % flip.length] * Math.PI;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${(y + Math.sin(i * f + ph) * 12).toFixed(1)}`;
    }).join(" ");
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={24 + i * 67.5} y1={26} x2={24 + i * 67.5} y2={156} stroke={L} strokeDasharray="2 3" />
      ))}
      <path d={wave(46, 0.42, [0, 1, 0, 1])} stroke={M} fill="none" strokeWidth={1} />
      <path className="schematic-trace" d={wave(90, 0.42, [0, 0.5, 1, 1.5])} stroke={A} fill="none" strokeWidth={1.3} />
      <path d={wave(134, 0.42, [0, 0.25, 0.75, 1.25])} stroke={M} fill="none" strokeWidth={1} />
      <Label x={296} y={49} anchor="end">BPSK</Label>
      <Label x={296} y={93} anchor="end">QPSK</Label>
      <Label x={296} y={137} anchor="end">16-QAM</Label>
    </g>
  );
}

function Retrieval() {
  const r = rand(21);
  const pts = Array.from({ length: 34 }, () => ({ x: 40 + r() * 240, y: 30 + r() * 120 }));
  const q = { x: 188, y: 84 };
  const near = [...pts].sort((a, b) => Math.hypot(a.x - q.x, a.y - q.y) - Math.hypot(b.x - q.x, b.y - q.y)).slice(0, 4);
  return (
    <g>
      <circle cx={q.x} cy={q.y} r={34} fill="none" stroke={A} strokeDasharray="3 3" strokeWidth={1} />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.4} fill={L} />
      ))}
      {near.map((p, i) => (
        <g key={i}>
          <path className="schematic-trace" d={`M${q.x} ${q.y} L${p.x} ${p.y}`} stroke={A} strokeWidth={1.1} />
          <circle cx={p.x} cy={p.y} r={3.4} fill="var(--surface)" stroke={A} strokeWidth={1.2} />
        </g>
      ))}
      <rect x={q.x - 5} y={q.y - 5} width={10} height={10} rx={2} fill={A} />
      <Label x={q.x} y={q.y + 50}>query · top-k</Label>
    </g>
  );
}

function Tokens() {
  const r = rand(3);
  const rows = [0, 1, 2];
  return (
    <g>
      {rows.map((row) =>
        Array.from({ length: 9 }, (_, i) => {
          const green = r() > 0.35;
          return (
            <rect
              key={`${row}-${i}`}
              x={30 + i * 30}
              y={40 + row * 34}
              width={24}
              height={22}
              rx={4}
              fill={green ? "var(--accent-soft)" : "var(--surface)"}
              stroke={green ? A : L}
              strokeWidth={1}
            />
          );
        }),
      )}
      <Label x={30} y={158} anchor="start">green-list tokens → z-test</Label>
    </g>
  );
}

function Constellation() {
  const r = rand(11);
  const levels = [-3, -1, 1, 3];
  return (
    <g>
      <line x1={160} y1={20} x2={160} y2={160} stroke={L} />
      <line x1={70} y1={90} x2={250} y2={90} stroke={L} />
      {levels.flatMap((i) =>
        levels.map((q) => {
          const cx = 160 + i * 18;
          const cy = 90 - q * 18;
          return (
            <g key={`${i}${q}`}>
              {Array.from({ length: 6 }, (_, k) => (
                <circle key={k} cx={cx + (r() - 0.5) * 12} cy={cy + (r() - 0.5) * 12} r={1.1} fill={M} opacity={0.6} />
              ))}
              <circle cx={cx} cy={cy} r={2.6} fill={A} />
            </g>
          );
        }),
      )}
      <Label x={252} y={86} anchor="end">I</Label>
      <Label x={166} y={28} anchor="start">Q</Label>
    </g>
  );
}

function Circuit() {
  return (
    <g fill="none" strokeWidth={1.2}>
      <path d="M30 76 H64" stroke={M} />
      <path d="M64 70 l5 -6 l5 12 l5 -12 l5 12 l5 -12 l5 12 l3 -6" stroke={M} />
      <path className="schematic-trace" d="M97 76 H128 V62 H140" stroke={A} />
      <path d="M140 46 V106 L192 76 Z" stroke={A} fill="var(--surface)" />
      <Label x={150} y={66} anchor="start">−</Label>
      <Label x={150} y={92} anchor="start">+</Label>
      <Label x={166} y={80}>OP07</Label>
      <path d="M140 90 H120 V140" stroke={M} />
      <path d="M112 140 H128 M115 144 H125 M118 148 H122" stroke={M} />
      <path className="schematic-trace" d="M192 76 H236" stroke={A} />
      <path d="M236 76 V100 M226 100 H246 M226 106 H246 M236 106 V124" stroke={M} />
      <path d="M228 124 H244 M231 128 H241" stroke={M} />
      <path d="M210 76 V36 H128 V62" stroke={L} strokeDasharray="3 3" />
      <path d="M236 76 H290" stroke={A} />
      <circle cx={290} cy={76} r={3} fill={A} />
      <Label x={248} y={160}>active low-pass</Label>
    </g>
  );
}

function Grid() {
  const r = rand(5);
  return (
    <g>
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 14 }, (_, col) => {
          const v = r();
          return (
            <rect
              key={`${row}-${col}`}
              x={34 + col * 18}
              y={34 + row * 18}
              width={14}
              height={14}
              rx={2.5}
              fill={v > 0.72 ? A : v > 0.45 ? "var(--accent-soft)" : "var(--surface)"}
              stroke={v > 0.45 ? "none" : L}
            />
          );
        }),
      )}
      <Label x={34} y={160} anchor="start">signal × universe × time</Label>
    </g>
  );
}

function Bars() {
  const r = rand(9);
  const h = Array.from({ length: 14 }, (_, i) => 20 + Math.sin(i / 2.3) * 22 + r() * 30);
  const pts = h.map((v, i) => `${i ? "L" : "M"}${42 + i * 17} ${140 - v - 10}`).join(" ");
  return (
    <g>
      <line x1={32} y1={140} x2={290} y2={140} stroke={L} />
      {h.map((v, i) => (
        <rect key={i} x={36 + i * 17} y={140 - v} width={11} height={v} rx={2} fill="var(--surface)" stroke={L} />
      ))}
      <path className="schematic-trace" d={pts} stroke={A} fill="none" strokeWidth={1.4} />
    </g>
  );
}

function Graph() {
  const tables = [
    [30, 30], [104, 24], [178, 32], [250, 64], [30, 100], [104, 88], [178, 108], [104, 140], [250, 136],
  ];
  const links = [[0, 1], [1, 2], [1, 5], [4, 5], [5, 6], [2, 3], [6, 8], [5, 7], [3, 6]];
  return (
    <g>
      {links.map(([a, b], i) => (
        <path
          key={i}
          className={i % 3 === 0 ? "schematic-trace" : undefined}
          d={`M${tables[a][0] + 22} ${tables[a][1] + 8} L${tables[b][0] + 22} ${tables[b][1] + 8}`}
          stroke={i % 3 === 0 ? A : L}
          strokeWidth={1}
        />
      ))}
      {tables.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={44} height={20} rx={3} fill="var(--surface)" stroke={i === 5 ? A : L} />
          <line x1={x} y1={y + 7} x2={x + 44} y2={y + 7} stroke={i === 5 ? A : L} />
        </g>
      ))}
    </g>
  );
}

function Beam() {
  const wave = Array.from({ length: 80 }, (_, i) => `${i ? "L" : "M"}${(72 + i * 1.6).toFixed(1)} ${(90 + Math.sin(i * 0.7) * 5).toFixed(1)}`).join(" ");
  const wave2 = Array.from({ length: 60 }, (_, i) => `${i ? "L" : "M"}${(198 + i * 1.3).toFixed(1)} ${(90 + Math.sin(i * 0.7) * 2.5).toFixed(1)}`).join(" ");
  return (
    <g>
      <rect x={30} y={72} width={36} height={36} rx={4} fill="var(--surface)" stroke={M} />
      <Label x={48} y={124}>THz src</Label>
      <path className="schematic-trace" d={wave} stroke={A} fill="none" strokeWidth={1.3} />
      <rect x={200 - 14} y={52} width={10} height={76} rx={2} fill="var(--accent-soft)" stroke={A} />
      <Label x={191} y={144}>sample</Label>
      <path d={wave2} stroke={A} fill="none" strokeWidth={1} opacity={0.7} />
      <rect x={278} y={76} width={18} height={28} rx={3} fill="var(--surface)" stroke={M} />
      <Label x={287} y={124}>det</Label>
    </g>
  );
}

const map: Record<VisualKind, () => React.ReactElement> = {
  pipeline: Pipeline,
  reservoir: Reservoir,
  waveform: Waveform,
  retrieval: Retrieval,
  tokens: Tokens,
  constellation: Constellation,
  circuit: Circuit,
  grid: Grid,
  bars: Bars,
  graph: Graph,
  beam: Beam,
};

export function ProjectVisual({ kind, className = "" }: { kind: VisualKind; className?: string }) {
  const Drawing = map[kind];
  return (
    <div className={`schematic-ground overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 320 180" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <Drawing />
      </svg>
    </div>
  );
}
