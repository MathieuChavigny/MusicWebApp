import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Layout from "./Layout";
import LayoutAuthentifie from "./LayoutAuthentifie";
import Accueil from "../pages/Accueil";
import TableauBord from "../pages/TableauBord";
import ListesLecture from "../pages/ListesLecture";
import PageRechercheAlbum from "../pages/PageRechercheAlbum";
import PageRechercheArtiste from "../pages/PageRechercheArtiste";
import PageRechercheChanson from "../pages/PageRechercheChanson";
import PageAlbum from "../pages/PageAlbum";
import PageArtiste from "../pages/PageArtiste";
import "./App.css";

function App() {
  const { user, isLoading } = useAuth();
  const isLogged = user !== null ? true : false;
  const routes = [
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Accueil />
        },
      ]
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    }
  ];
  const routesAuthentifiees = [
    {
      path: '',
      element: <LayoutAuthentifie />,
      children: [
        {
          index: true,
          element: <Navigate to="/tableau" replace />,
        },
        {
          path: '/tableau',
          element: <TableauBord />
        },
        {
          path: '/listes',
          element: <ListesLecture />
        },
        {
          path: '/recherche-album',
          element: <PageRechercheAlbum />,

        },
        {
          path: '/recherche-artiste',
          element: <PageRechercheArtiste />,

        },
        {
          path: '/recherche-chanson',
          element: <PageRechercheChanson />,

        },
        {
          path: '/album',
          element: <PageAlbum />,
          children: [
            {
              path: ':id',
              element: <PageAlbum />,
              errorElement: <Navigate to="/tableau" replace />
            },
          ]
        },
        {
          path: '/artiste',
          element: <PageArtiste />,
          children: [
            {
              path: ':id',
              element: <PageArtiste />,
              errorElement: <Navigate to="/tableau" replace />
            },
          ]
        },
      ]
    },
    {
      path: '*',
      element: <Navigate to="/tableau" replace />,
    },
  ];

  if (!isLoading) {
    return <RouterProvider router={createBrowserRouter(isLogged ? routesAuthentifiees : routes)} />;
  }
}

export default App