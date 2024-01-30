import { RouterProvider } from "react-router-dom"
import router from "./router"
import "./core/i18next";

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
