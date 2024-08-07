"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.envNamesUsed = exports.isJest = void 0;
exports.setupDotenv = setupDotenv;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
exports.isJest = process.env.JEST_WORKER_ID !== undefined;
exports.envNamesUsed = {};
function getEnv(optional) {
    const error = (message) => {
        if (!exports.isJest)
            throw new Error(message);
        console.warn(message);
        return null;
    };
    return function env(type, name, defaultValue) {
        let value = process.env[name];
        exports.envNamesUsed[name] = value;
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
function setupDotenv(root) {
    if (process.env.ENV_FILE) {
        let p = process.env.ENV_FILE;
        if (!p.startsWith('/'))
            p = path_1.default.join(root, p);
        dotenv_1.default.config({ path: p });
    }
    dotenv_1.default.config({ path: path_1.default.join(root, '.env.local') });
    dotenv_1.default.config({ path: path_1.default.join(root, '.env.' + (process.env.NODE_ENV || 'development')) });
    dotenv_1.default.config({ path: path_1.default.join(root, '.env') });
}
