import {Request, Response} from 'express';
import knex from '../database/connection';
// Necessário devido ao TypeScript

class PointsController{
    async index(request:Request, response: Response) {
        const { city, uf, items } = request.query;
        
        // transforma os items que estão separados por vírgula em um array
        // o mapeamento removerá os espaços que possam existir entre os items e os transformará em números
        const pasedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', pasedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    }
    
    async show(request: Request, response: Response) {
        const id = request.params.id;

        // o first indica que o retorno não será um array
        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'point not found' });
        }

        /**
         *  SELECT title FROM items
         *      JOIN point_items on items.id = point_items.item_id
         *  WHERE point_items.point_id = {id}; 
         */
        
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        
        return response.json({ point, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        /*
        acima podemos visualizar uma desestruturação do javascript, mesma coisa que:
    
        const name = request.body.name;
        const email = request.body.email;
        */
    
        // evita que uma operação não dependa da outra
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }
    
        const insertedIds = await trx('points').insert(point);
    
        // zero pois é o único id inserido na tabela, é retornado na função anterior
        const point_id = insertedIds[0]; 
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        });
        
        await trx('point_items').insert(pointItems);
    
        trx.commit();
        
        return response.json({
            id: point_id,
            ...point,
        });
    }
}

export default PointsController;