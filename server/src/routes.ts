import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from '../config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);
// Instânciação
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            // usar regex em items posteriormente
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);


routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// para quando se usa controllers: 
// index: listagem, show: exibir único registro, create, update, delete

export default routes;

// outras formas de abstração
// Service pattern para lógicas
// Repository pattern (Data mapper) para banco de dados