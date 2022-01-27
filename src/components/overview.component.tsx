import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from 'react';
import { Alert, Button, Form, ListGroup, Spinner, Stack } from 'react-bootstrap';
import { FcLike } from 'react-icons/fc';
import { getSetsByTheme, getThemes } from '../services/resource.service';
import { favoritesContext } from '../services/state.service';
import { Set, Theme } from '../types/rebrickable-lego.types';

const Overview: React.FC = () => {
    const [legoThemes, setLegoThemes] = useState([] as Theme[]);
    const [themeSets, setThemeSets] = useState([] as Set[]);
    const [selectedTheme, setSelectedTheme] = useState({} as Theme);
    const [loadingThemes, setLoadingThemes] = useState(false);
    const [loadingSets, setLoadingSets] = useState(false);
    const [error, setError] = useState(null);
    const { favoriteSets } = useContext(favoritesContext);

    console.log(favoriteSets);

    useEffect((): void => {
        setLoadingThemes(true);

        getThemes()
            .then(data => setLegoThemes(data.results))
            .finally(() => setLoadingThemes(false))
            .catch(setError)
    }, []);

    const setSelectedThemeSets = (e: ChangeEvent<HTMLSelectElement>): void => {
        e.preventDefault();
        const selectedThemeId = +e.target.value;
        const foundTheme = legoThemes.find(theme => theme.id === selectedThemeId);

        foundTheme && setSelectedTheme(foundTheme);

        setLoadingSets(true);
        getSetsByTheme(selectedThemeId)
            .then(data => setThemeSets(data.results))
            .then(() => setLoadingSets(false))
            .catch(setError)
    };

    const navigateToDetails = (set: Set): void => {
        window.open(`/details/${set.set_num}`, '_self');
    }

    const themesList = legoThemes.map((theme: Theme): ReactElement =>
        <option key={theme.id} value={theme.id}>
            {theme.name}
        </option>);

    const setsList = themeSets.map((set: Set): ReactElement => {
        const favorite = favoriteSets.some(favorite => favorite.set_num === set.set_num);
        let favIcon;
        if (favorite) {
            favIcon = <FcLike style={{ marginLeft: '10px' }}></FcLike>
        }

        return <ListGroup.Item key={set.set_num} action onClick={() => navigateToDetails(set)}>
            {set.name}
            {favIcon}
        </ListGroup.Item>
    });

    return (
        loadingThemes ? <Spinner animation='border' variant='secondary'></Spinner> :
            error ?
                <div>
                    <Alert variant='warning'>Oops, something went wrong!</Alert>
                    <Button href={'/overview'}>Try again</Button>
                </div> :
                <>
                    <Stack gap={5}>
                        <Form>
                            <h4>Select your theme</h4>
                            <Form.Select value={selectedTheme?.id}
                                onChange={setSelectedThemeSets}>{themesList}</Form.Select>
                        </Form>
                        {
                            loadingSets ? <Spinner animation='border' variant='secondary'></Spinner>
                                : error ?
                                    <div>
                                        <Alert variant='warning'>Oops, something went wrong!</Alert>
                                        <Button href={'/overview'}>Try again</Button>
                                    </div> :
                                    <div>
                                        <h4>{selectedTheme?.name}</h4>
                                        <ListGroup>{setsList}</ListGroup>
                                    </div>
                        }
                        {
                            (() => {
                                if (favoriteSets.length > 0) {
                                    return (<div>
                                        <h4>Favorite sets</h4>
                                        <ul>
                                            {favoriteSets?.map((set) => (<li key={set.set_num}>{set.name}</li>))}
                                        </ul>
                                    </div>)
                                }
                            })()
                        }
                    </Stack>
                </>
    );
}

export default Overview;
