import * as stylex from "@stylexjs/stylex";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import type { ProcessStepType } from "@/shared/types/content";

const styles = stylex.create({
  root: {
    position: "relative",
    width: "100%",
    height: 96,
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: tokens.radiusShape,
    backgroundColor: tokens.colorSurfaceSunken,
    color: tokens.colorPrimary,
  },
  svg: {
    display: "block",
    width: "100%",
    height: "100%",
  },
});

/** Скорость вращения на один оборот, мс — подобрана так, чтобы рядом стоящие
 *  шестерёнки выглядели связанными зубцами, а не независимыми вертушками. */
const GEAR_DURATION = [9000, 6000, 7500];

type GearProps = {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  width: number;
  index: number;
};

function Gear({ cx, cy, r, teeth, width, index }: GearProps) {
  const inner = r - width;
  return (
    <g
      data-part="gear"
      data-origin={`${cx} ${cy}`}
      data-duration={GEAR_DURATION[index % GEAR_DURATION.length]}
      data-direction={index % 2 === 0 ? "1" : "-1"}
    >
      <circle
        cx={cx}
        cy={cy}
        r={inner}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        opacity={0.45}
      />
      <circle cx={cx} cy={cy} r={Math.max(2, inner * 0.3)} fill="currentColor" opacity={0.3} />
      {Array.from({ length: teeth }, (_, i) => {
        const angle = (360 / teeth) * i;
        return (
          <rect
            key={angle}
            x={cx - width / 2}
            y={cy - r - width}
            width={width}
            height={2 * width}
            rx={width / 2}
            fill="currentColor"
            opacity={0.55}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
    </g>
  );
}

function GearsDecor() {
  return (
    <>
      <Gear cx={72} cy={50} r={24} teeth={10} width={7} index={0} />
      <Gear cx={158} cy={32} r={17} teeth={8} width={5} index={1} />
      <Gear cx={162} cy={72} r={15} teeth={8} width={5} index={2} />
      <Gear cx={252} cy={50} r={20} teeth={9} width={6} index={3} />
    </>
  );
}

const NOTEBOOK_LINES = [
  { x: 92, y: 26, w: 148 },
  { x: 92, y: 41, w: 128 },
  { x: 92, y: 56, w: 140 },
  { x: 92, y: 71, w: 96 },
];

function NotebookDecor() {
  return (
    <>
      <rect
        x={58}
        y={12}
        width={204}
        height={72}
        rx={8}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        opacity={0.32}
      />
      <line x1={76} y1={12} x2={76} y2={84} stroke="currentColor" strokeWidth={2} opacity={0.5} />
      {Array.from({ length: 5 }, (_, i) => (
        <circle
          // biome-ignore lint/suspicious/noArrayIndexKey: позиция витка спиральной пружины фиксирована
          key={i}
          cx={76}
          cy={18 + i * 15}
          r={3.5}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={0.45}
        />
      ))}
      {NOTEBOOK_LINES.map((line) => (
        <rect
          key={line.y}
          data-part="line"
          data-origin={`${line.x} ${line.y + 2.5}`}
          x={line.x}
          y={line.y}
          width={line.w}
          height={5}
          rx={2.5}
          fill="currentColor"
          opacity={0.55}
        />
      ))}
    </>
  );
}

const FLOWS = [26, 48, 70];

function DataFlowDecor() {
  return (
    <>
      {FLOWS.map((y) => (
        <line
          key={y}
          data-part="flow"
          x1={20}
          y1={y}
          x2={300}
          y2={y}
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="9 13"
          strokeLinecap="round"
          opacity={0.4}
        />
      ))}
      {FLOWS.map((y) => (
        <circle
          key={y}
          data-part="pulse"
          data-distance={280}
          cx={y === 26 ? 20 : y === 48 ? 44 : 32}
          cy={y}
          r={4}
          fill="currentColor"
          opacity={0.85}
        />
      ))}
    </>
  );
}

function DefaultDecor() {
  return (
    <>
      <g data-part="ring" data-origin="160 48">
        <circle
          cx={160}
          cy={48}
          r={36}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="4 10"
          strokeLinecap="round"
          opacity={0.4}
        />
      </g>
      <g data-part="ring" data-origin="160 48">
        <circle
          cx={160}
          cy={48}
          r={24}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="2 8"
          strokeLinecap="round"
          opacity={0.55}
        />
      </g>
      <circle cx={160} cy={48} r={5} fill="currentColor" opacity={0.7} />
    </>
  );
}

/**
 * Тип шага → декор. Шестерёнки — для системного дизайна и архитектуры
 * (сборка узлов), блокнот — для сбора требований, поток точек — для обработки
 * данных и интеграций.
 *
 * Молекула только рисует: анимируют части организм `ProcessHorizontal` по
 * `data-part`/`data-origin`, поэтому здесь нет ни GSAP, ни таймеров. Всё
 * помечено `aria-hidden` — декор не читается скринридером.
 */
function decorFor(processType: ProcessStepType | undefined) {
  switch (processType) {
    case "system-design":
    case "architecture":
    case "automation":
      return <GearsDecor />;
    case "requirements":
    case "discovery":
      return <NotebookDecor />;
    case "data-processing":
    case "analysis":
    case "integration":
      return <DataFlowDecor />;
    default:
      return <DefaultDecor />;
  }
}

export function ProcessDecor({ processType }: { processType?: ProcessStepType }) {
  return (
    <div {...stylex.props(styles.root)} aria-hidden="true" data-decor={processType ?? "default"}>
      <svg viewBox="0 0 320 96" role="presentation" {...stylex.props(styles.svg)} focusable="false">
        {decorFor(processType)}
      </svg>
    </div>
  );
}
