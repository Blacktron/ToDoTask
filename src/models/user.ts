'use strict';

import { Schema, model } from 'mongoose';

import { User } from '../types/types.js'

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 35
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 35
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    }
});

export default model<User>('User', UserSchema, 'users');
