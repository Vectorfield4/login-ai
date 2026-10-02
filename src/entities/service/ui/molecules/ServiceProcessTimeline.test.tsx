import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceProcessTimeline } from "./ServiceProcessTimeline";

const steps = [
  {
    title: "services.software-development.processSteps.0.title",
    text: "services.software-development.processSteps.0.text",
  },
];

describe("ServiceProcessTimeline", () => {
  it("переводит заголовок блока и шаги процесса", () => {
    render(<ServiceProcessTimeline titleKey="home.servicesProcessTitle" steps={steps} lang="ru" />);
    expect(screen.getByRole("heading", { level: 4, name: "Как мы работаем" })).toBeInTheDocument();
    expect(screen.getByText("Анализ требований")).toBeInTheDocument();
  });

  it("без шагов ничего не рендерит", () => {
    const { container } = render(
      <ServiceProcessTimeline titleKey="home.servicesProcessTitle" steps={[]} lang="ru" />,
    );
    expect(container.firstChild).toBeNull();
  });
});
