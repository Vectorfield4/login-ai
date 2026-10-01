import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ProcessStepType } from "@/shared/types/content";
import { ProcessDecor } from "@/shared/ui/molecules/ProcessDecor";

function renderDecor(processType?: ProcessStepType) {
  const { container } = render(<ProcessDecor processType={processType} />);
  return container.querySelector<HTMLElement>("[data-decor]");
}

describe("ProcessDecor", () => {
  it("шестерёнки на системном дизайне и архитектуре", () => {
    for (const type of ["system-design", "architecture", "automation"] as const) {
      const root = renderDecor(type);
      expect(root?.dataset.decor).toBe(type);
      expect(root?.querySelectorAll('[data-part="gear"]').length).toBeGreaterThan(0);
    }
  });

  it("у каждой шестерёнки задан центр вращения и период", () => {
    const gears = renderDecor("system-design")?.querySelectorAll('[data-part="gear"]') ?? [];
    expect(gears.length).toBeGreaterThan(0);
    for (const gear of gears) {
      // Без origin GSAP крутит шестерёнку вокруг начала координат SVG, а не
      // вокруг неё самой — она улетает из карточки.
      expect(gear.getAttribute("data-origin")).toMatch(/^-?\d+(\.\d+)? -?\d+(\.\d+)?$/);
      expect(Number(gear.getAttribute("data-duration"))).toBeGreaterThan(0);
    }
  });

  it("блокнот на сборе требований и разведке", () => {
    for (const type of ["requirements", "discovery"] as const) {
      const root = renderDecor(type);
      expect(root?.querySelectorAll('[data-part="line"]').length).toBeGreaterThan(0);
      expect(root?.querySelectorAll('[data-part="gear"]')).toHaveLength(0);
    }
  });

  it("поток данных на обработке, анализе и интеграциях", () => {
    for (const type of ["data-processing", "analysis", "integration"] as const) {
      const root = renderDecor(type);
      expect(root?.querySelectorAll('[data-part="flow"]').length).toBeGreaterThan(0);
      expect(root?.querySelectorAll('[data-part="pulse"]').length).toBeGreaterThan(0);
    }
  });

  it("нейтральный декор без типа и для остальных типов", () => {
    for (const type of [undefined, "implementation", "testing"] as const) {
      const root = renderDecor(type);
      expect(root?.dataset.decor).toBe(type ?? "default");
      expect(root?.querySelectorAll('[data-part="ring"]').length).toBeGreaterThan(0);
    }
  });

  it("декор скрыт от скринридера и не получает фокус", () => {
    const { container } = render(<ProcessDecor processType="system-design" />);
    expect(container.querySelector("[data-decor]")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")).toHaveAttribute("focusable", "false");
  });
});
