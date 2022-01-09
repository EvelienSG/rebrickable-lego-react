import axios from 'axios';

class ResourceService {

    public getThemes(): Promise<any> {
        return axios.get('https://rebrickable.com/api/v3/lego/themes?key=cef91563c41612c871ed256c1a22e628');
    }

    public getSetsByTheme(themeId: number): Promise<any> {
        return axios.get(`https://rebrickable.com/api/v3/lego/sets/?key=cef91563c41612c871ed256c1a22e628&theme_id=${themeId}`);
    }

    public getSetById(setId: string): Promise<any> {
        return axios.get(`https://rebrickable.com/api/v3/lego/sets/${setId}/?key=cef91563c41612c871ed256c1a22e628`);

    }

    public getThemeById(themeId: string): Promise<any> {
        return axios.get(`https://rebrickable.com/api/v3/lego/themes/${themeId}/?key=cef91563c41612c871ed256c1a22e628`);

    }
}

export default new ResourceService();
