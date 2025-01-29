import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/HomePage";
import Profile from "./components/pages/Profile";
import About from "./components/pages/About";
import Sike from "./components/pages/Sike";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google';

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "923018521368-58a3ieamok9q19qrrunc5i5mas4lqvru.apps.googleusercontent.com";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/about" element={<About />}/>
      <Route path="/sike" element={<Sike />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/profile" element={<Profile />}/>
    </Route>
  )
)

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
