import React, { useEffect, useState } from 'react';
import IPage from '../../interfaces/page';
import logging from '../../config/logging';
import { Form, Col, Row, Badge, Accordion, Card, Button, Table } from 'react-bootstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';

const DetailsPage: React.FunctionComponent<IPage & RouteComponentProps<any>> = props => {
    const [order, setOrder] = useState<any>({});

    useEffect(() => {
        logging.info(`Loading ${props.name}`);

        let id = props.match.params.id;
        loadOrder(id);
    }, [props])

    const loadOrder = async (id: number) => {
        axios
            .get(`${config.defaults.apiUri}/orders/details/${id}`)
            .then((response) => {
                console.log(response.data)
                setOrder(response.data);
            })
            .catch((error) => {
                logging.error(config.defaults.namespace, `METHOD: [loadOrder] | ERROR: ${error}`);
            });
    }

    return (
        <div>
            <h1><Badge variant="secondary">Order</Badge> Details</h1>
            <hr />
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Order information
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formExternalOrderNumber">
                                    <Form.Label column sm="2">
                                        External order number
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.externalOrderNumber} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formBuyerFullName">
                                    <Form.Label column sm="2">
                                        Buyer full name
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.buyerFullName} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formBuyerPhoneNumber">
                                    <Form.Label column sm="2">
                                        Buyer phone number
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.buyerPhoneNumber} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formBuyerEmail">
                                    <Form.Label column sm="2">
                                        Buyer email
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.buyerEmail} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Shipping info
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formShippingAddress">
                                    <Form.Label column sm="2">
                                        Shipping Address
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.shippingAddress} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formShippingCity">
                                    <Form.Label column sm="2">
                                        Shipping City
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.shippingCity} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formShippingRegion">
                                    <Form.Label column sm="2">
                                        Shipping Region
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.shippingRegion} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formShippingCountry">
                                    <Form.Label column sm="2">
                                        Shipping Country
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.shippingCountry} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Promise dates
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formPackPromiseMin">
                                    <Form.Label column sm="2">
                                        Pack Promise Min
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.packPromiseMin} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPackPromiseMax">
                                    <Form.Label column sm="2">
                                        Pack Promise Max
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.packPromiseMax} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formShipPromiseMin">
                                    <Form.Label column sm="2">
                                        Ship Primise Min
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.shipPromiseMin} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formShipPromiseMax">
                                    <Form.Label column sm="2">
                                        Ship Promise Max
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.shipPromiseMax} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formDeliveryPromiseMin">
                                    <Form.Label column sm="2">
                                        Delivery Promise Min
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.deliveryPromiseMin} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formDeliveryPromiseMax">
                                    <Form.Label column sm="2">
                                        Delivery Promise Max
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.deliveryPromiseMax} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formReadyPickupPromiseMin">
                                    <Form.Label column sm="2">
                                        Ready Pickup Promise Min
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.readyPickupPromiseMin} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formReadyPickupPromiseMax">
                                    <Form.Label column sm="2">
                                        Ready Pickup Promise Max
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={order.readyPickupPromiseMax} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                            Line items
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Product Qty</th>
                                        <th>Product Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.productList != undefined ? order.productList.map((product: any, index: number) => (
                                        <tr key={index}>
                                            <td>{product.name}</td>
                                            <td>{product.qty}</td>
                                            <td>{product.weight}</td>
                                        </tr>
                                    )): <tr><td colSpan={3}>No products found in the order</td></tr>}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <hr/>
            <Link to="/">Go to the orders list!</Link>
        </div>
    );
}

export default withRouter(DetailsPage);