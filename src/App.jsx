import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout.jsx"
import Home from "./pages/Home/Home.jsx"
import Login from "./auth/Login/Login.jsx"
import Register from "./auth/Register/Register.jsx"
import Notfound from "./pages/Notfound/Notfound.jsx"
import { RecoilRoot } from "recoil"
import ProtectedRoute from "./auth/ProtectedRoute/ProtectedRoute.jsx"



let routes = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> }
    ]
  }
])


function App() {

  return (
    <>

      
        <RecoilRoot>
          <RouterProvider router={routes} ></RouterProvider>
        </RecoilRoot>
      
    </>
  )
}

export default App
