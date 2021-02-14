import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import logging from './config/logging';
import routes from './config/routes';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Application: React.FunctionComponent<{}> = props => {
    useEffect(() => {
        logging.info('Loading application.');
    }, [])

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Deliveries</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Orders</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/orders/new">Create Order</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <BrowserRouter>
                    <Switch>
                        {routes.map((route, index) => {
                            return (
                                <Route 
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    render={(props: RouteComponentProps<any>) => (
                                        <route.component
                                            name={route.name} 
                                            {...props}
                                            {...route.props}
                                        />
                                    )}
                                />
                            );
                        })}
                    </Switch>
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default Application;