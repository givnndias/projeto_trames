import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

const element = document.getElementById("root");
if (!element) throw new Error("Elemento inicial do Trames não encontrado.");
createRoot(element).render(<RouterProvider router={getRouter()} />);
