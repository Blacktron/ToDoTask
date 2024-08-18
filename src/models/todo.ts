'use strict';

import { Schema, model } from 'mongoose';

import { ToDo } from '../types/types.js'

const ToDoSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    customerId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model<ToDo>('ToDo', ToDoSchema);