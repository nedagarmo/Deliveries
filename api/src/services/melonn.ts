import axios from 'axios';

import logging from './../config/logging';
import config from './../config/config';

export default class MelonnService {
    NAMESPACE = 'MelonnService';
    OPTIONS = {
        headers: { 'x-api-key': config.melonn.key }
    };

    listShippingMethod = async () => {
        return await axios
            .get(`${config.melonn.url}/shipping-methods`, this.OPTIONS)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                logging.error(this.NAMESPACE, `METHOD: [listShippingMethod]`, error);
                return [];
            });
    };

    getShippingMethod = async (id: string) => {
        return await axios
            .get(`${config.melonn.url}/shipping-methods/${id}`, this.OPTIONS)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                logging.error(this.NAMESPACE, `METHOD: [getShippingMethod/${id}]`, error);
                return null;
            });
    };

    listOffDays = async () => {
        return await axios
            .get(`${config.melonn.url}/off-days`, this.OPTIONS)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                logging.error(this.NAMESPACE, `METHOD: [listOffDays]`, error);
                return [];
            });
    };
}
