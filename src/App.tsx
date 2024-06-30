import { FunctionComponent } from "react";
import "./App.css";
import PokemonList from "./pages/pokemon-list";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import PokemonDetail from "./pages/pokemon-detail";
import Root from "./pages/root";
import PageNotFund from "./pages/page-not-found";
import CreatePokemon from "./pages/pokemon-create";
import UpdatePokemon from "./pages/pokemon-update";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProtectedRoute from "./components/protected-route";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFund />,
    children: [
      {
        path: "",
        element: <PokemonList />
      },
      {
        path: "pokemons",
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <PokemonList />
          },
          {
            path: ':id',
            element: <PokemonDetail />
          },
          {
            path: 'add',
            element: <ProtectedRoute element={<CreatePokemon />} />
          },
          {
            path: 'edit',
            element: <Outlet />,
            children: [
              {
                path: ':id',
                element: <ProtectedRoute element={<UpdatePokemon />} />
              }
            ]
          },
        ]
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
])

const App: FunctionComponent = () => {
  return (
    <RouterProvider router={route} />
  )
}

export default App;
