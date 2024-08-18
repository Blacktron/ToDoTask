'use strict';

import express, { Request, Response, Router } from 'express';

import { getToDos, createToDo, updateToDo, deleteToDo } from '../../repositories/todo.js';
import { validateJWTToken } from '../../middlewares/jwtTokenValidator.js';

const router: Router = express.Router();

/**
 * @route GET /v1/todo
 * @description Gets all to do documents and
 * returns them as response.
 */
router.get('/', validateJWTToken, async (req: Request, res: Response) => {
    try {
        const toDos = await getToDos(req);
        res.send(toDos);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

/**
 * @route POST /v1/todo
 * @description Creates a new to do document
 * and stores it in the database.
 */
router.post('/', validateJWTToken, async (req: Request, res: Response) => {
    try {
        const toDo = await createToDo(req);
        res.status(201).send(toDo);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

/**
 * @route /v1/todo/:id
 * @description Updates a to do document.
 */
router.put('/:id', validateJWTToken, async (req: Request, res: Response) => {
    try {
        const toDo = await updateToDo(req);
        res.status(200).send(toDo);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

/**
 * @route /v1/todo/:id
 * @description Deletes a to do document
 */
router.delete('/:id', validateJWTToken, async (req: Request, res: Response) => {
    try {
        const toDo = await deleteToDo(req);
        res.status(200).send(toDo);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;
