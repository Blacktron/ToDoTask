'use strict';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generates a JWT token used to authenticate a user.
 * @param userId The payload used for generating the token.
 */
export async function generateJWTToken(userId: string) {
    let payload = {
        id: userId
    };

    const { SECRET } = process.env;
    if (SECRET) {
        const token = jwt.sign(payload, SECRET, {
            expiresIn: process.env.EXPIRES_IN
        });

        return {
            error: false,
            token: token
        }
    }

    return {
        error: true,
        message: 'Unable to generate JWT token'
    }
}