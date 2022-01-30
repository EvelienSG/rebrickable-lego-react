import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./components/details.component";
import Overview from "./components/overview.component";
import {
    favoritesContext,
    useFavoritesContext
} from "./services/state.service";

const App: React.FC = () => {
  const favorites = useFavoritesContext();

  return (
    <div>
      <NavBar></NavBar>
      <div className="container mt-3">
        <favoritesContext.Provider value={favorites}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </favoritesContext.Provider>
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/overview"} className="navbar-brand">
        Lego Legends
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/overview"} className="nav-link">
            Overview
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default App;
