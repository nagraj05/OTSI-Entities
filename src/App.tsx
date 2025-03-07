import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import { StatesPage } from "./pages/states";
import { DistrictsPage } from "./pages/districts";
import { MandalsPage } from "./pages/mandals";
import { VillagesPage } from "./pages/villages";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <StatesPage />,
      },
      {
        path: "states",
        element: <StatesPage />,
      },
      {
        path: "districts",
        element: <DistrictsPage />,
      },
      {
        path: "mandals",
        element: <MandalsPage />,
      },
      {
        path: "villages",
        element: <VillagesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
