'use strict'

import { Response } from 'express';

import User from '../models/user.js';
import { User as UserType } from '../types/types.js';
import { hashPassword } from '../utils/passwordHasher.js';

/**
 * Gets all User documents by email.
 * @param email The parameter by which to filter the documents.
 * @param shouldIncludePassword Denotes if the password should be included in the response.
 */
export async function getUserByEmail(email: string, shouldIncludePassword?: boolean) {
    if (shouldIncludePassword) {
        return await User.findOne({ email: email }).select('+password');
    } else {
        return await User.findOne({ email: email });
    }
}

/**
 * Creates a new User document and stores it in the database.
 * @param user The details used to create the document.
 * @param res The response object.
 */
export async function createUser(user: UserType, res: Response) {
    const hashedPassword = await hashPassword(user.password); // Hash the password.
    const newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword
    });

    // Check if the user is not already registered.
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
        return res.status(400).json({
            status: 'Failed',
            message: 'User already exists!'
        });
    }

    return await newUser.save();
}
