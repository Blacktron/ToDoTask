'use strict';

import express, { Request, Response, Router } from 'express';
import { check } from "express-validator";
import { Document } from 'mongoose';

import { validateRequest } from '../../utils/validators/requestValidator.js';
import { generateJWTToken } from '../../utils/jwtTokenGenerator.js';
import { getUserByEmail, createUser } from '../../repositories/user.js';
import { hashPassword } from '../../utils/passwordHasher.js';

const router: Router = express.Router();

/**
 * @route POST /v1/auth/register
 * @description Registers a new user and stores it in the database.
 */
router.post('/register',
    check('firstName', 'First Name is required')
        .notEmpty()
        .trim()
        .escape(),
    check('lastName', 'Last Name is required')
        .notEmpty()
        .trim()
        .escape(),
    check('email', 'Email is required')
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    check('password', 'Password with minimum length of 8 characters is required')
        .notEmpty()
        .isLength({ min: 8 }),
    validateRequest,
    async (req: Request, res: Response) => {
    try {
        const savedUser = await createUser(req.body, res);

        /**
         * Remove the 'password' property from the returned
         * object due to security reasons.
         */
        const savedUserObj = (savedUser as Document).toObject();
        // @ts-ignore
        delete savedUserObj.password;

        res.status(200).json({
            status: 'Success',
            data: [savedUserObj],
            message: 'You\'ve registered successfully!'
        });
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

/**
 * @route POST /v1/auth/login
 * @description Gets a user from the database,
 * check if passwords match and generates a JWT token.
 */
router.post('/login',
    check('email', 'Email is required')
        .isEmail()
        .notEmpty(),
    check('password', 'Password is required')
        .notEmpty(),
    validateRequest,
    async (req: Request, res: Response) => {

    try {
        // Check if the user exists.
        const user = await getUserByEmail(req.body.email, true);
        if (!user) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Invalid email or password!'
            });
        }

        // If user exists, validate the password.
        const hashedPassword = await hashPassword(req.body.password);
        const isPasswordValid = user.password === hashedPassword;
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Invalid email or password!'
            })
        }

        // Generate the JWT token.
        const tokenGenerationResult = await generateJWTToken(user._id.toString());
        if (tokenGenerationResult.error) {
            res.status(500).json({
                status: 'Failed',
                code: 500,
                error: tokenGenerationResult.error,
                message: tokenGenerationResult.message
            });
        } else {
            res.cookie('SessionID', tokenGenerationResult.token);
        }

        /**
         * Remove the 'password' property from the returned
         * object due to security reasons.
         */
        const userObj = user.toObject();
        // @ts-ignore
        delete userObj.password;

        res.status(200).json({
            status: 'Success',
            data: [userObj],
            message: 'You\'ve successfully logged in!'
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'Failed',
            code: 500,
            message: error.message
        });
    }

    res.end();
});

export default router;
