import { NextFunction, Request, Response } from 'express';

import orderDomain from './../domain/order';
import orderApplication from './../application/order';
import logging from './../config/logging';

const NAMESPACE = 'OrderController';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const application = new orderApplication();
        const result: boolean = await application.newOrder(req.body);
        if (!result) return res.status(400).json({ message: `Incorrect data provided.` });

        return res.status(200).json({ message: 'Success!' });
    } catch (error) {
        logging.error(NAMESPACE, `METHOD: [createOrder]`, error);
        return res.status(500).json({ message: `An unexpected error has occurred: ${error}` });
    }
};

const orderDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
        const domain: orderDomain = new orderDomain();
        const o = domain.get(Number(req.params.id));
        if (o == null) return res.status(404).json({ message: `Order not found` });

        return res.status(200).json(o);
    } catch (error) {
        logging.error(NAMESPACE, `METHOD: [orderDetails/${req.params.id}]`, error);
        return res.status(500).json({ message: `An unexpected error has occurred: ${error}` });
    }
};

const orderList = (req: Request, res: Response, next: NextFunction) => {
    try {
        const domain: orderDomain = new orderDomain();

        return res.status(200).json(domain.list());
    } catch (error) {
        logging.error(NAMESPACE, `METHOD: [orderList]`, error);
        return res.status(500).json({ message: `An unexpected error has occurred: ${error}` });
    }
};

export default { createOrder, orderDetails, orderList };
