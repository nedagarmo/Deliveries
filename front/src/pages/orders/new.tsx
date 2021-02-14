import React, { useEffect, useState } from 'react';
import IPage from '../../interfaces/page';
import logging from '../../config/logging';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

const NewOrderPage: React.FunctionComponent<IPage & RouteComponentProps<any>> = props => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        logging.info(`Loading ${props.name}`);
    }, [props])

    return (
        <div>
            <p>New Order Page</p>
            <Link to="/">Go to the home page!</Link>
        </div>
    );
}

export default withRouter(NewOrderPage);