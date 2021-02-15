import React, { useEffect, useState } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import { Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const HomePage: React.FunctionComponent<IPage> = props => {
    const [orders, setOrders] = useState<Array<any>>([]);

    useEffect(() => {
        logging.info(`Loading ${props.name}`);
        loadList();
    }, [props.name])

    const loadList = async () => {
        axios
            .get(`${config.defaults.apiUri}/orders`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                logging.error(config.defaults.namespace, `METHOD: [loadList] | ERROR: ${error}`);
            });
    }

    return (
        <div>
            <h1><Badge variant="secondary">Orders</Badge> List</h1>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sell Order Number</th>
                        <th>Seller Store</th>
                        <th>Creation Date</th>
                        <th>Shipping Method</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.externalOrderNumber}</td>
                            <td>{order.sellerStore}</td>
                            <td>{order.creationDate}</td>
                            <td>{order.shippingMethodName}</td>
                            <td><Link to={`/orders/${order.id}`}>Details</Link></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default HomePage;