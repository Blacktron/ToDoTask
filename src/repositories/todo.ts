'use strict';

import { Request } from 'express';

import ToDo from '../models/todo.js';

/**
 * Gets all to do documents for a customer.
 * @param req The request object.
 */
export async function getToDos(req: Request) {
    return await ToDo.find({customerId: req.header('CustomerID')});
}

/**
 * Creates a new to do document and stores it in the database.
 * @param req The request object.
 */
export async function createToDo(req: Request) {
    const toDo = new ToDo(req.body);
    await toDo.save();

    return toDo;
}

/**
 * Updates a to do document.
 * @param req The request object.
 */

export async function updateToDo(req: Request) {
    const query: { _id: string; } = { _id: req.params.id };
    const update = req.body;

    return await ToDo.updateOne(query, update);
}

/**
 * Deletes a to do document.
 * @param req The request object.
 */
export async function deleteToDo(req: Request) {
    const query: { _id: string; } = { _id: req.params.id };

    return await ToDo.deleteOne(query);
}
