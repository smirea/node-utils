"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.isJest = void 0;
exports.isJest = process.env.JEST_WORKER_ID !== undefined;
function getEnv(optional) {
    const error = (message) => {
        if (!exports.isJest)
            throw new Error(message);
        console.warn(message);
        return null;
    };
    return function env(type, name, defaultValue) {
        let value = process.env[name];
        if (value == null || value === '')
            value = defaultValue;
        if (value == null || value === '') {
            if (optional)
                return undefined;
            return error(`process.env.${name} is empty`);
        }
        switch (type || 'string') {
            case 'int':
            case 'number': {
                const v = type === 'int' ? parseInt(value, 10) : parseFloat(value);
                if (Number.isNaN(v))
                    return error(`process.env.${name} is not a number`);
                return v;
            }
            case 'string':
                return value;
            case 'boolean':
                return (value === 'true');
            default:
                return error(`env type "${type}" not handled`);
        }
    };
}
exports.env = Object.assign(getEnv(false), { optional: getEnv(true) });
