'use strict';

import * as crypto from 'node:crypto';

export async function hashPassword(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
}
