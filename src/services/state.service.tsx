import { createContext, useCallback, useState } from "react";
import { Set } from '../types/rebrickable-lego.types';

interface Favorites {
    favoriteSets: Set[];
    addFavorite: (setId: string, setName: string) => void;
    removeFavorite: (setId: string) => void;
}

export const favoritesDefaults: Favorites = {
    favoriteSets: [],
    addFavorite: () => null,
    removeFavorite: () => null
}

export const favoritesContext = createContext<Favorites>(favoritesDefaults);

export const useFavoritesContext = (): Favorites => {
    const [favoriteSets, setFavoriteSets] = useState<Set[]>([]);

    const addFavorite = useCallback((setId: string, setName: string): void => {
        console.log('add ', setId);
        const favoriteSet = favoriteSets.find(set => set.set_num === setId);

        if (!favoriteSet) {
            const tempFavs = favoriteSets;
            console.log(tempFavs);

            setFavoriteSets([...tempFavs, {
                set_num: setId,
                name: setName
            }]);
        }
    }, [favoriteSets]);

    const removeFavorite = useCallback((setId: string): void => {
        console.log('remove ', setId);
        setFavoriteSets(favoriteSets.filter(set => set.set_num !== setId));
    }, [favoriteSets]);

    return {
        favoriteSets,
        addFavorite,
        removeFavorite
    }
}
