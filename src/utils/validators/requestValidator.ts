'use strict';

import { validationResult, Result } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Validates that all needed data is provided and in
 * the correct format.
 * @param req The request object.
 * @param res The response object.
 * @param next The next function.
 */
export async function validateRequest(req: Request, res: Response, next: NextFunction) {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
        let errorObj: any = {};
        errors.array().map((error: any) => {
            errorObj[error.path] = error.msg
        });

        return res.status(422).json({ errors: errorObj });
    }

    next();
}
