import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RelevantCard, resolveRelevantRef } from "@/features/relevant-items/ui/RelevantCard";
import { astroDicts } from "@/shared/i18n/dict";
import { createT } from "@/shared/i18n/t";
import type { EntityRef } from "@/shared/types/relevants";

const t = createT("ru", astroDicts);

describe("resolveRelevantRef", () => {
  it("резолвит решение в navTitle и чистый путь", () => {
    const ref: EntityRef = { type: "solution", slug: "agentic-systems" };
    expect(resolveRelevantRef(ref)).toEqual({
      titleKey: "solutions.agentic-systems.navTitle",
      href: "/solutions/agentic-systems",
      noteKey: undefined,
    });
  });

  it("резолвит кейс в title и путь кейсов", () => {
    const ref: EntityRef = { type: "case", slug: "retail-support-bot" };
    expect(resolveRelevantRef(ref)).toEqual({
      titleKey: "cases.retail-support-bot.title",
      href: "/cases/retail-support-bot",
      noteKey: undefined,
    });
  });

  it("резолвит услугу в navTitle и путь услуг", () => {
    const ref: EntityRef = { type: "service", slug: "software-development" };
    expect(resolveRelevantRef(ref)).toEqual({
      titleKey: "services.software-development.navTitle",
      href: "/services/software-development",
      noteKey: undefined,
    });
  });

  it("прокидывает noteKey цели без изменений", () => {
    const ref: EntityRef = {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.note.sd",
    };
    expect(resolveRelevantRef(ref)?.noteKey).toBe("relevants.note.sd");
  });

  it("неизвестный слаг любой цели отбрасывается", () => {
    expect(resolveRelevantRef({ type: "case", slug: "no-such-case" })).toBeUndefined();
    expect(resolveRelevantRef({ type: "solution", slug: "no-such-solution" })).toBeUndefined();
    expect(resolveRelevantRef({ type: "service", slug: "no-such-service" })).toBeUndefined();
  });

  it("черновая цель отбрасывается: страница не генерируется", () => {
    // nlp-systems есть в фикстурах, но помечен draft: true.
    expect(resolveRelevantRef({ type: "service", slug: "nlp-systems" })).toBeUndefined();
  });
});

describe("RelevantCard", () => {
  it("рендерит локализованную ссылку с заголовком и примечанием", () => {
    const { container } = render(
      <RelevantCard
        lang="ru"
        item={{ type: "case", slug: "retail-support-bot", noteKey: "note-1" }}
      />,
    );
    expect(container.querySelector("a")?.getAttribute("href")).toBe("/ru/cases/retail-support-bot");
    expect(screen.getByText(t("cases.retail-support-bot.title"))).toBeInTheDocument();
    expect(screen.getByText("note-1")).toBeInTheDocument();
  });

  it("несмешиваемая цель не рендерит карточку", () => {
    const { container } = render(
      <RelevantCard lang="ru" item={{ type: "case", slug: "no-such-case" }} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
