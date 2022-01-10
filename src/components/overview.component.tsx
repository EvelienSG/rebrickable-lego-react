import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Alert, Button, Form, ListGroup, Spinner, Stack } from 'react-bootstrap';
import ResourceService from '../services/resource.service';
import { Set, Theme } from '../types/rebrickable-lego.types';

interface Props {
    setThemeName: (themeName: string) => void,
    favorites: Set[]
}

const Overview: React.FC<Props> = ({ setThemeName, favorites }) => {
    const [legoThemes, setLegoThemes] = useState([] as Theme[]);
    const [themeSets, setThemeSets] = useState([] as Set[]);
    const [selectedTheme, setSelectedTheme] = useState({} as Theme);
    const [favoriteSets, setFavoriteSets] = useState([] as Set[]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect((): void => {
        console.log(favorites);
        setFavoriteSets(favorites);
        setLoading(true);
        ResourceService.getThemes()
            .then(response => response.data.results)
            .then(setLegoThemes)
            .then(() => setLoading(false))
            .catch(setError)
    }, [favorites]);

    const setSelectedThemeSets = (e: ChangeEvent<HTMLSelectElement>): void => {
        const selectedThemeId = +e.target.value;
        const foundTheme = legoThemes.find(theme => theme.id === selectedThemeId);

        foundTheme && setSelectedTheme(foundTheme);
        foundTheme && setThemeName(foundTheme.name);
        
        setLoading(true);
        ResourceService.getSetsByTheme(selectedThemeId)
            .then(response => response.data.results)
            .then(setThemeSets)
            .then(() => setLoading(false))
            .catch(setError)
    }

    const navigateToDetails = (set: Set): void => {
        window.open(`/details/${set.set_num}`, '_self');
    }

    const themesList = legoThemes.map((theme: Theme): ReactElement =>
        <option key={theme.id} value={theme.id}>
            {theme.name}
        </option>);
    
    const setsList = themeSets.map((set: Set): ReactElement => {
        const heartIcon = favoriteSets.some(favorite => favorite.set_num === set.set_num) ? '♥' : '';
        
        return <ListGroup.Item key={set.set_num} action onClick={() => navigateToDetails(set)}>
            {set.name}
            <span style={{ color: 'red' }}>{heartIcon}</span>
        </ListGroup.Item>
    });

    return (
        loading ? <Spinner animation='border' variant='secondary'></Spinner> :
            error ?
                <>
                    <Alert variant='warning'>Oops, something went wrong!</Alert>
                    <Button href={'/overview'}>Try again</Button>
                </> : <>
                    <Stack gap={5}>
                        <div>
                            <h4>Select your theme</h4>
                            <Form.Select value={selectedTheme?.id}
                                onChange={setSelectedThemeSets}>{themesList}</Form.Select>
                        </div>
                        <div>
                            <h4>{selectedTheme?.name}</h4>
                            <ListGroup>{setsList}</ListGroup>
                        </div>
                    </Stack>
                </>
    );
}

export default Overview;
