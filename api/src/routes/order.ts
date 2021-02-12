import express from 'express';
import controller from '../controllers/order';

const router = express.Router();

router.post('/create', controller.createOrder);
router.post('/details', controller.orderDetails);
router.post('/', controller.orderList);

export = router;
