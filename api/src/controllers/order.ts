import { NextFunction, Request, Response } from 'express';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'Hi!'
    });
};

const orderDetails = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'Hi!'
    });
};

const orderList = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'Hi!'
    });
};

export default { createOrder, orderDetails, orderList };
