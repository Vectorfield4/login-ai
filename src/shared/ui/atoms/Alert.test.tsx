import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert } from "@/shared/ui/atoms/Alert";

describe("Alert", () => {
  it('рендерит содержимое с role="alert"', () => {
    render(<Alert>Текст уведомления</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Текст уведомления");
  });

  it("дефолтный severity — info", () => {
    render(<Alert>info</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("info");
  });

  it("поддерживает варианты severity success/warning", () => {
    const { rerender } = render(<Alert severity="success">success</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("success");

    rerender(<Alert severity="warning">warning</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("warning");
  });
});
