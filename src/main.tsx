import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { CmsProvider } from "./context/CmsContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CmsProvider>
      <BrowserRouter basename="/v2">
        <App />
      </BrowserRouter>
    </CmsProvider>
  </React.StrictMode>,
)
