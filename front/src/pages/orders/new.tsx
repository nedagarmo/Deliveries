import React, { useEffect, useState } from 'react';
import IPage from '../../interfaces/page';
import logging from '../../config/logging';
import { Badge, Form, Button, Dropdown, DropdownButton, Col, Table } from 'react-bootstrap';
import { Link, RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';

const NewOrderPage: React.FunctionComponent<IPage & RouteComponentProps<any>> = props => {
    const history = useHistory();
    const [shippingMethod, setShippingMethod] = useState('');
    const [shippingMethodName, setShippingMethodName] = useState('Select an shipping method');

    const [productName, setProductName] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productWeight, setProductWeight] = useState('');
    
    const [shippingMethodList, setShippingMethodList] = useState<any>([]);
    const [productList, setProductList] = useState<any>([]);

    const [sellerStore, setSellerStore] = useState('');
    const [externalOrderNumber, setExternalOrderNumber] = useState('');
    const [buyerFullName, setBuyerFullName] = useState('');
    const [buyerPhoneNumber, setBuyerPhoneNumber] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingRegion, setShippingRegion] = useState('');
    const [shippingCountry, setShippingCountry] = useState('');

    useEffect(() => {
        logging.info(`Loading ${props.name}`);
        loadShippingMethods();
    }, [props])

    const loadShippingMethods = async () => {
        axios
            .get(`${config.defaults.apiUri}/melonn/shipping_methods`)
            .then((response) => {
                console.log(response.data)
                setShippingMethodList(response.data);
            })
            .catch((error) => {
                logging.error(config.defaults.namespace, `METHOD: [loadOrder] | ERROR: ${error}`);
            });
    }

    const addProductToList = () => {
        setProductList([...productList, { name: productName, qty: Number(productQty), weight: Number(productWeight)}]);
        setProductName('');
        setProductQty('');
        setProductWeight('');
    }

    const handleSelect = (e:any) => {
        setShippingMethod(e);
        const shippingMethod: any = shippingMethodList.filter((f: any) => f.id == e)[0];

        setShippingMethodName(shippingMethod.name);
    }

    const saveOrder = (e: any) => {
        e.preventDefault();

        const order: any = {
            sellerStore: sellerStore,
            externalOrderNumber: externalOrderNumber,
            buyerFullName: buyerFullName,
            buyerPhoneNumber: buyerPhoneNumber,
            buyerEmail: buyerEmail,
            shippingMethod: shippingMethod,
            shippingAddress: shippingAddress,
            shippingCity: shippingCity,
            shippingRegion: shippingRegion,
            shippingCountry: shippingCountry,
            productList: productList
        };

        axios
            .post(`${config.defaults.apiUri}/orders/create`, order)
            .then((response) => {
                if(response.status == 200) {
                    history.push('/');
                }
            })
            .catch((error) => {
                logging.error(config.defaults.namespace, `METHOD: [saveOrder] | ERROR: ${error}`);
            });
    }

    return (
        <div>
            <h1><Badge variant="secondary">Create</Badge> Order</h1>
            <hr />
            <Form>
                <Form.Group controlId="formSellerStore">
                    <Form.Label>Seller store</Form.Label>
                    <Form.Control type="text" placeholder="Enter seller store" onChange={event => setSellerStore(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formShippingMethod">
                    <Form.Label>Shipping method</Form.Label>
                    <DropdownButton
                        alignRight
                        title={ shippingMethodName }
                        id="dropdown-menu-align-right"
                        onSelect={ handleSelect }>
                            {shippingMethodList.map((method: any, index: number) => (
                                <Dropdown.Item eventKey={method.id}>{method.name}</Dropdown.Item>
                            ))}
                    </DropdownButton>
                </Form.Group>

                <Form.Group controlId="formExternalOrderNumber">
                    <Form.Label>External order number</Form.Label>
                    <Form.Control type="text" placeholder="Enter external order number" onChange={event => setExternalOrderNumber(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBuyerFullName">
                    <Form.Label>Buyer full name</Form.Label>
                    <Form.Control type="text" placeholder="Enter buyer full name" onChange={event => setBuyerFullName(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBuyerPhoneNumber">
                    <Form.Label>Buyer phone number</Form.Label>
                    <Form.Control type="text" placeholder="Enter buyer phone number" onChange={event => setBuyerPhoneNumber(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBuyerEmail">
                    <Form.Label>Buyer email</Form.Label>
                    <Form.Control type="email" placeholder="Enter buyer email" onChange={event => setBuyerEmail(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formShippingAddress">
                    <Form.Label>Shipping address</Form.Label>
                    <Form.Control type="text" placeholder="Enter shipping address" onChange={event => setShippingAddress(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formShippingCity">
                    <Form.Label>Shipping city</Form.Label>
                    <Form.Control type="text" placeholder="Enter shipping city" onChange={event => setShippingCity(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formShippingRegion">
                    <Form.Label>Shipping region</Form.Label>
                    <Form.Control type="text" placeholder="Enter shipping region" onChange={event => setShippingRegion(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formShippingCountry">
                    <Form.Label>Shipping country</Form.Label>
                    <Form.Control type="text" placeholder="Enter shipping country" onChange={event => setShippingCountry(event.target.value)} />
                </Form.Group>

                <hr />

                <Form.Group controlId="formLineItems">
                    <h4><Badge variant="secondary">Line items</Badge></h4>
                </Form.Group>
                
                <hr />
                
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="Product name" value={productName} onChange={event => setProductName(event.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Product qty" value={productQty} onChange={event => setProductQty(event.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Product weight" value={productWeight} onChange={event => setProductWeight(event.target.value)} />
                    </Col>
                    <Col>
                        <Button variant="primary" type="button" onClick={event => addProductToList()}>
                            Add
                        </Button>
                    </Col>
                </Form.Row>

                <hr />

                <Form.Row>
                    <Col>
                        <Form.Label>Added <Badge variant="secondary">Products</Badge></Form.Label>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Qty</th>
                                    <th>Product Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList.length > 0 ? productList.map((product: any, index: number) => (
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.qty}</td>
                                        <td>{product.weight}</td>
                                    </tr>
                                )): <tr><td colSpan={3}>No products added</td></tr>}
                            </tbody>
                        </Table>
                    </Col>
                </Form.Row>
                
                <hr />
                <Button variant="primary" type="submit" className="float-right" onClick={event => saveOrder(event)}>
                    Create Order
                </Button>
            </Form>
            <Link to="/">Go to the orders list!</Link>
        </div>
    );
}

export default withRouter(NewOrderPage);