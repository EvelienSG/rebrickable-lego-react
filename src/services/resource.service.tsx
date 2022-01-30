export const getThemes = (): Promise<any> => {
  return fetch(
    "https://rebrickable.com/api/v3/lego/themes?key=cef91563c41612c871ed256c1a22e628"
  ).then((response) => response.json());
};

export const getSetsByTheme = (themeId: number): Promise<any> => {
  return fetch(
    `https://rebrickable.com/api/v3/lego/sets/?key=cef91563c41612c871ed256c1a22e628&theme_id=${themeId}`
  ).then((response) => response.json());
};

export const getSetById = (setId: string): Promise<any> => {
  return fetch(
    `https://rebrickable.com/api/v3/lego/sets/${setId}/?key=cef91563c41612c871ed256c1a22e628`
  ).then((response) => response.json());
};

export const getThemeById = (themeId: string): Promise<any> => {
  return fetch(
    `https://rebrickable.com/api/v3/lego/themes/${themeId}/?key=cef91563c41612c871ed256c1a22e628`
  ).then((response) => response.json());
};
