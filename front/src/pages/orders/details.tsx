import React, { useEffect, useState } from 'react';
import IPage from '../../interfaces/page';
import logging from '../../config/logging';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

const DetailsPage: React.FunctionComponent<IPage & RouteComponentProps<any>> = props => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        logging.info(`Loading ${props.name}`);

        let id = props.match.params.id;

        if (id)
        {
            setMessage(`Identifier ${id}`);
        }
        else
        {
            setMessage(`No identifier provided!`);
        }
    }, [props])

    return (
        <div>
            <p>{message}</p>
            <Link to="/">Go to the home page!</Link>
        </div>
    );
}

export default withRouter(DetailsPage);