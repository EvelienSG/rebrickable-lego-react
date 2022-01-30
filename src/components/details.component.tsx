import React, { MouseEvent, useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { getSetById, getThemeById } from "../services/resource.service";
import { favoritesContext } from "../services/state.service";
import { Set } from "../types/rebrickable-lego.types";

const Details: React.FC = () => {
  const [selectedSet, setSelectedSet] = useState({} as Set);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [themeName, setThemeName] = useState("");
  const { favoriteSets, addFavorite, removeFavorite } =
    useContext(favoritesContext);
  const navigate = useNavigate();

  useEffect((): void => {
    const setId = getSelectedSetFromUrl();

    setLoading(true);
    setId &&
      getSetById(setId)
        .then((data) => {
          setSelectedSet(data);
          setFavorite(
            favoriteSets.some((favorite) => favorite.set_num === data.set_num)
          );
          getThemeById(data.theme_id)
            .then((theme) => setThemeName(theme.name))
            .catch(setError);
        })
        .finally(() => setLoading(false))
        .catch(setError);
  }, []);

  const getSelectedSetFromUrl = (): string => {
    const currentPath = window.location.pathname;

    return currentPath.substring(currentPath.lastIndexOf("/") + 1);
  };

  const toggleFavorite = () => {
    const fav = !favorite;

    setFavorite((favorite) => !favorite);
    fav
      ? addFavorite(selectedSet.set_num, selectedSet.name)
      : removeFavorite(selectedSet.set_num);
  };

  const navigateBack = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    navigate("/overview", { replace: true });
  };

  return loading ? (
    <Spinner animation="border" variant="secondary"></Spinner>
  ) : error ? (
    <>
      <Alert variant="warning">Oops, something went wrong!</Alert>
      <Button href={"/overview"}>Try again</Button>
    </>
  ) : (
    <>
      <Stack gap={5}>
        <h2 style={{ textAlign: "center" }}>
          Details Lego {themeName} {selectedSet.set_num}
        </h2>
        <Container fluid="md" style={{ width: 400 }}>
          <h2>
            {selectedSet.name?.toUpperCase()}
            {favorite ? (
              <FcLike
                style={{ marginLeft: "10px", marginBottom: "10px" }}
                onClick={toggleFavorite}
              ></FcLike>
            ) : (
              <FcLikePlaceholder
                style={{ marginLeft: "10px", marginBottom: "10px" }}
                onClick={toggleFavorite}
              ></FcLikePlaceholder>
            )}
          </h2>
          <Row
            className="justify-content-center"
            style={{ marginBottom: "15px" }}
          >
            <Col className="align-self-center">
              Set number: {selectedSet.set_num}
              <br />
              Released in: {selectedSet.year}
              <br />
              Number of parts: {selectedSet.num_parts}
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <img
                src={selectedSet.set_img_url}
                alt={selectedSet.name}
                style={{ maxWidth: 300, maxHeight: 300, marginBottom: "20px" }}
              ></img>
            </Col>
          </Row>
          <Row>
            <Col className="align-self-center">
              <Button variant="secondary" onClick={navigateBack}>
                Back to overview
              </Button>
            </Col>
          </Row>
        </Container>
      </Stack>
    </>
  );
};

export default Details;
