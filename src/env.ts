export const isJest = process.env.JEST_WORKER_ID !== undefined;

type GetType<T extends 'string' | 'number' | 'boolean' | 'int'> = T extends 'number' | 'int'
    ? number
    : T extends 'string'
    ? string
    : T extends 'boolean'
    ? boolean
    : 123;

function getEnv<Optional extends boolean>(optional: Optional) {
    const error = (message: string) => {
        if (!isJest) throw new Error(message);
        console.warn(message);
        return null as any;
    };
    return function env<T extends 'string' | 'number' | 'boolean' | 'int' = 'string'>({
        type,
        name,
        default: defaultValue,
    }: {
        type?: T;
        name: string;
        default?: any;
    }): Optional extends true ? GetType<T> | undefined : GetType<T> {
        let value = process.env[name];
        if (value == null || value === '') value = defaultValue;
        if (value == null || value === '') {
            if (optional) return undefined as any;
            return error(`process.env.${name} is empty`);
        }

        switch (type || 'string') {
            case 'int':
            case 'number': {
                const v = type === 'int' ? parseInt(value, 10) : parseFloat(value);
                if (Number.isNaN(v)) return error(`process.env.${name} is not a number`);
                return v as any;
            }
            case 'string':
                return value as any;
            case 'boolean':
                return (value === 'true') as any;
            default:
                return error(`env type "${type}" not handled`);
        }
    };
}

export const env = Object.assign(getEnv(false), { optional: getEnv(true) });
