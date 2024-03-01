import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { InfinityScroll } from "./pages/InfinityScroll/index"
import { Lazyload } from "./pages/Lazyload/index"
import { Index } from "./pages/index"

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
