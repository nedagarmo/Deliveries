import express from 'express';
import controller from '../controllers/melonn';

const router = express.Router();

router.get('/shipping_methods', controller.listShippingMethod);
router.get('/shipping_method/:id', controller.getShippingMethod);
router.get('/offdays', controller.listOffDays);

export = router;
