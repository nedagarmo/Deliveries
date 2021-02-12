import { NextFunction, Request, Response } from 'express';
import melonnService from './../services/melonn';
import logging from './../config/logging';

const NAMESPACE = 'MelonnController';
const service = new melonnService();

const listShippingMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await service.listShippingMethod());
    } catch (error) {
        logging.error(NAMESPACE, 'METHOD: [listShippingMethod]', error);
        return res.status(500).json({ message: `An unexpected error has occurred: ${error}` });
    }
};

const getShippingMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shippingMethod = await service.getShippingMethod(Number(req.params.id));
        if (shippingMethod == null) return res.status(404).json({ message: `Shipping method not found` });

        return res.status(200).json(shippingMethod);
    } catch (error) {
        logging.error(NAMESPACE, `METHOD: [getShippingMethod/${req.query.id}]`, error);
        return res.status(500).json({ message: `An unexpected error has occurred: ${error}` });
    }
};

const listOffDays = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await service.listOffDays());
    } catch (error) {
        logging.error(NAMESPACE, `METHOD: [listOffDays]`, error);
        return res.status(500).json({ message: `An unexpected error has occurred: ${error}` });
    }
};

export default { listShippingMethod, getShippingMethod, listOffDays };
