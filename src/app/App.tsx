import { RouterProvider } from "react-router-dom";
import { getRouter } from "@/app/routes";

export default function App() {
  return <RouterProvider router={getRouter()} />;
}
