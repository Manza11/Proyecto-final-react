import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { filterCategoriesThunk, filterHeadLineThunk, getProductsThunk } from "../store/slices/products.slice";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from "react-router-dom";

const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch()
  const [ categories, setCategories ] = useState([])
  const [ inputSearch, setInputSearch ] = useState("")

  useEffect( () => {
    dispatch( getProductsThunk() )

    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
        .then( resp => setCategories(resp.data) )
        .catch( error => console.error(error) )
  }, [] )

  return (
    <div>
      <Container>
        <Row className="py-3 ">
          {
            categories.map( category => (
              <Col key={category.id}>
                <Button className="w-100" onClick={ () => dispatch( filterCategoriesThunk(category.id) ) }>{category.name}</Button>
              </Col>

            ))
          }
          <Col>
            <Button 
            onClick={ () => dispatch(getProductsThunk()) }
            className="w-100">
              All
            </Button>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Buscar dispositivo por titulo"
                aria-label="Products name"
                aria-describedby="basic-addon2"
                value={ inputSearch }
                onChange={ e => setInputSearch(e.target.value) }
              />
              <Button onClick={ () => dispatch(filterHeadLineThunk(inputSearch)) }>
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          {products.map( product => (
            <Col key={ product.id }>
              <Card>
                <Card.Img
                  variant="top"
                  src={ product.images[0].url }
                />
                <Card.Body>
                  <Card.Title>{ product.title }</Card.Title>
                  <Card.Text>
                    { product.description }
                  </Card.Text>
                  <Button 
                  as={ Link }
                  to={ `/product/${product.id}` }
                  variant="primary">Detalle</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
