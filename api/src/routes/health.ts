import express from 'express';
import controller from '../controllers/server_health_check';

const router = express.Router();

router.get('/server', controller.serverHealthCheck);

export = router;
