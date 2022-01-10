import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './components/details.component';
import Overview from './components/overview.component';
import { Set } from './types/rebrickable-lego.types';

const App: React.FC = () => {
    const [selectedThemeName, setSelectedThemeName] = useState<string>('initialValue');
    const [favoriteSets, setFavoriteSets] = useState<Set[]>([]);

    const setThemeName = useCallback((themeName: string): void => {
        console.log(themeName);
        setSelectedThemeName(themeName);
    },[]);

    const addFavorite = useCallback((setId: string): void => {
        console.log(setId);
        const favoriteSet = favoriteSets.find(set => set.set_num === setId);

        if (!favoriteSet) {
            setFavoriteSets([{
                set_num: setId,
                favorite: true
            }, ...favoriteSets]);
            console.log(favoriteSets);
        }
    }, [favoriteSets]);

    const removeFavorite = useCallback((setId: string): void => {
        console.log(setId);
        setFavoriteSets(favoriteSets.filter(set => set.set_num !== setId));
        console.log(favoriteSets);
    }, [favoriteSets]);

    return (
        <div>
            <NavBar></NavBar>
            <div className="container mt-3">
                <Routes>
                    <Route path="/"
                        element={<Overview
                            setThemeName={setThemeName}
                            favorites={favoriteSets} />} />
                    <Route path="/overview"
                        element={<Overview
                            setThemeName={setThemeName}
                            favorites={favoriteSets} />} />
                    <Route path="/details/:id"
                        element={<Details
                            themeName={selectedThemeName}
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
