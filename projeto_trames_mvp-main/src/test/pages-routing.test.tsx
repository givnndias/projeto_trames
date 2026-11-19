import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "@/router";

beforeEach(() => {
  vi.stubEnv("VITE_GITHUB_PAGES", "true");
  window.history.replaceState({}, "", "/projeto_trames_mvp/#/");
  sessionStorage.clear();
  localStorage.clear();
  sessionStorage.setItem("trames:splash", "1");
  window.scrollTo = vi.fn();
});
afterEach(() => { cleanup(); vi.unstubAllEnvs(); });

describe("Publicação estática em subpasta", () => {
  it("abre o início sem renderizar outro documento HTML", async () => {
    render(<RouterProvider router={getRouter()} />);
    expect(await screen.findByRole("heading", { name: "Para onde vamos?" })).toBeInTheDocument();
    expect(document.querySelectorAll("html")).toHaveLength(1);
  });
  it("navega por hash e reabre uma tela interna", async () => {
    const first = render(<RouterProvider router={getRouter()} />);
    await screen.findByRole("heading", { name: "Para onde vamos?" });
    fireEvent.click(screen.getByRole("link", { name: "Preferências" }));
    await waitFor(() => expect(window.location.hash).toBe("#/preferencias"));
    first.unmount();
    render(<RouterProvider router={getRouter()} />);
    expect(await screen.findByRole("heading", { name: "Preferências" })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/projeto_trames_mvp/");
  });
  it("mantém o fluxo de busca até a comparação", async () => {
    render(<RouterProvider router={getRouter()} />);
    await screen.findByRole("heading", { name: "Para onde vamos?" });
    await waitFor(() => expect(screen.getByLabelText("Origem")).not.toBeDisabled());
    fireEvent.change(screen.getByLabelText("Origem"), { target: { value: "estacao" } });
    fireEvent.change(screen.getByLabelText("Destino"), { target: { value: "biblioteca" } });
    fireEvent.click(screen.getByRole("button", { name: "Escolher prioridade" }));
    await waitFor(() => expect(window.location.hash).toBe("#/prioridade"));
    const compare = await screen.findByRole("button", { name: /Comparar rotas/i });
    fireEvent.click(compare);
    await waitFor(() => expect(window.location.hash).toBe("#/rotas"));
    expect(await screen.findByRole("heading", { name: "Rotas" })).toBeInTheDocument();
  });
});
