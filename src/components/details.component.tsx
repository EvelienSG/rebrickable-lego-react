import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row, Spinner, Stack } from 'react-bootstrap';
import ResourceService from '../services/resource.service';
import { Set } from '../types/rebrickable-lego.types';

interface Props {
    themeName: string,
    addFavorite: (setId: string) => void,
    removeFavorite: (setId: string) => void,
}

const Details: React.FC<Props> = ({ themeName, addFavorite, removeFavorite }) => {
    const [theme, setTheme] = useState('');
    const [selectedSet, setSelectedSet] = useState({} as Set);
    const [favorite, setFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect((): void => {
        setLoading(true);
        const setId = getSelectedSetFromUrl();
        ResourceService.getSetById(setId)
            .then(response => response.data)
            .then(setSelectedSet)
            .then(() => setLoading(false))
            .catch(setError)
    }, []);

    useEffect((): void => {
        console.log(themeName);
        setTheme(themeName);
    }, [themeName]);

    const getSelectedSetFromUrl = (): string => {
        const currentPath = window.location.pathname;
        return currentPath.substring(currentPath.lastIndexOf('/') + 1);
    }

    const toggleFavorite = (): void => {
        setFavorite((favorite) => !favorite);

        favorite ? addFavorite(selectedSet.set_num) : removeFavorite(selectedSet.set_num);
    }

    const navigateBack = (): void => {
        window.open('/overview', '_self');
    }

    const heartIcon: string = favorite ? '♥' : '';

    return (
        loading ? <Spinner animation='border' variant='secondary'></Spinner> :
            error ?
                <>
                    <Alert variant='warning'>Oops, something went wrong!</Alert>
                    <Button href={'/overview'}>Try again</Button>
                </> : <>
                    <Stack gap={5}>
                        <h4 style={{ textAlign: 'center' }}>Details Lego {theme} {selectedSet.set_num}</h4>
                        <h2 style={{ textAlign: 'center' }}>{selectedSet.name?.toUpperCase()}</h2>
                        <Container fluid='md' style={{ width: 600 }}>
                            <Row className='justify-content-center'>
                                <Col className='align-self-center'>
                                    Set number: {selectedSet.set_num}
                                    <br />
                                    Released in: {selectedSet.year}
                                    <br />
                                    Number of parts: {selectedSet.num_parts}
                                </Col>
                                <Col xs={5}>
                                    <img
                                        src={selectedSet.set_img_url}
                                        alt={selectedSet.name}
                                        style={{ maxWidth: 300, maxHeight: 300 }}></img>
                                </Col>
                                <Col>
                                    <div style={{ color: 'red', textAlign: 'right', fontSize: '35px' }}>{heartIcon}</div>
                                </Col>
                            </Row>
                            <Row style={{ height: 100 }}>
                                <Col className='align-self-center' style={{ textAlign: 'center' }}>
                                    <Button variant="danger" onClick={toggleFavorite}>Favorite</Button>{'       '}
                                    <Button variant="secondary" onClick={navigateBack}>Back to overview</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Stack>
                </>
    );
};

export default Details;
