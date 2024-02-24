import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { InfinityScroll } from "./pages/InfinityScroll"
import { Lazyload } from "./pages/Lazyload"
import { Index } from "./pages/Index"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/infinity-scroll",
    element: <InfinityScroll />,
  },
  {
    path: "/lazyload",
    element: <Lazyload />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
