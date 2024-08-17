'use strict';

export type ToDo = {
    title: string;
    content: string;
    customerId: string;
    createdAt: Date;
}

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
