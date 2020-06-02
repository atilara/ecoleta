import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
// Instânciação
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// para quando se usa controllers: 
// index: listagem, show: exibir único registro, create, update, delete

export default routes;

// outras formas de abstração
// Service pattern para lógicas
// Repository pattern (Data mapper) para banco de dados