'use strict';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";

dotenv.config();

/**
 * Validates if a JWT token is correct and not expired.
 * @param req The request object
 * @param res The response object
 * @param next The next function
 */
export async function validateJWTToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['cookie'];

        if (!authHeader) {
            return res.sendStatus(401);
        }

        const token = authHeader.split('=')[1];
        const { SECRET } = process.env;

        if (SECRET) {
            jwt.verify(token, SECRET, async (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({
                        error: true,
                        message: 'This session has expired. Please login.'
                    });
                }

                next();
            });
        } else {
            res.status(500).json({
                error: true,
                code: 500,
                message: 'Secret is not defined!'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            error: true,
            code: 500,
            message: `Failed to validate JWT token! Message: ${error.message}`
        });
    }
}
