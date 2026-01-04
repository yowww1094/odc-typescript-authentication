import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
