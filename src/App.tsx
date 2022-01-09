import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './components/details.component';
import Overview from './components/overview.component';
import { Set } from './types/rebrickable-lego.types';

const App: React.FC = () => {
    const [selectedTheme, setSelectedTheme] = useState<string>('');
    const [favoriteSets, setFavoriteSets] = useState<Set[]>([]);

    const setThemeName = useCallback((themeName: string): void => {
        console.log(themeName);
        setSelectedTheme(themeName);
    }, []);

    const addFavorite = useCallback((setId: string): void => {
        console.log(setId);
        const favoriteSet = favoriteSets.find(set => set.set_num === setId);

        if (!favoriteSet) {
            favoriteSets.push({
                set_num: setId,
                favorite: true
            });
        }
    }, [favoriteSets]);

    const removeFavorite = useCallback((setId: string): void => {
        console.log(setId);
        const newFavorites = favoriteSets.filter(set => set.set_num !== setId);
        setFavoriteSets(newFavorites);
    }, [favoriteSets]);

    return (
        <div>
            <NavBar></NavBar>
            <div className="container mt-3">
                <Routes>
                    <Route path="/"
                        element={<Overview
                            passThemeName={setThemeName}
                            favorites={favoriteSets} />} />
                    <Route path="/overview"
                        element={<Overview
                            passThemeName={setThemeName}
                            favorites={favoriteSets} />} />
                    <Route path="/details/:id"
                        element={<Details
                            selectedTheme={selectedTheme}
                            addFavorite={addFavorite}
                            removeFavorite={removeFavorite} />} />
                </Routes>
            </div>
        </div>
    )
}

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={'/overview'} className="navbar-brand">
                Lego Legends
            </Link>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={'/overview'} className="nav-link">
                        Overview
                    </Link>
                </li>
            </div>
        </nav>
    )
}

export default App;
