import express from 'express';
import controller from '../controllers/order';

const router = express.Router();

router.post('/create', controller.createOrder);
router.get('/details/:id', controller.orderDetails);
router.get('/', controller.orderList);

export = router;
