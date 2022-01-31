import { createContext, useCallback, useState } from 'react';
import { Set } from '../types/rebrickable-lego.types';

interface Favorites {
  favoriteSets: Set[];
  addFavorite: (setId: string, setName: string) => void;
  removeFavorite: (setId: string) => void;
}

export const favoritesDefaults: Favorites = {
  favoriteSets: [],
  addFavorite: () => null,
  removeFavorite: () => null,
};

export const favoritesContext = createContext<Favorites>(favoritesDefaults);

export const useFavoritesContext = (): Favorites => {
  const [favoriteSets, setFavoriteSets] = useState<Set[]>([]);

  const addFavorite = useCallback(
    (setId: string, setName: string): void => {
      const favoriteSet = favoriteSets.find((set) => set.set_num === setId);

      if (!favoriteSet) {
        setFavoriteSets([
          ...favoriteSets,
          {
            set_num: setId,
            name: setName,
            favorite: true,
          },
        ]);
      }
    },
    [favoriteSets]
  );

  const removeFavorite = useCallback(
    (setId: string): void => {
      setFavoriteSets(favoriteSets.filter((set) => set.set_num !== setId));
    },
    [favoriteSets]
  );

  return {
    favoriteSets,
    addFavorite,
    removeFavorite,
  };
};
