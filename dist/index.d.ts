export declare const isJest: boolean;
type GetType<T extends 'string' | 'number' | 'boolean' | 'int'> = T extends 'number' | 'int' ? number : T extends 'string' ? string : T extends 'boolean' ? boolean : 123;
export declare const env: (<T extends "string" | "number" | "boolean" | "int" = "string">({ type, name, default: defaultValue, }: {
    type?: T | undefined;
    name: string;
    default?: any;
}) => false extends true ? GetType<T> | undefined : GetType<T>) & {
    optional: <T extends "string" | "number" | "boolean" | "int" = "string">({ type, name, default: defaultValue, }: {
        type?: T | undefined;
        name: string;
        default?: any;
    }) => true extends true ? GetType<T> | undefined : GetType<T>;
};
export {};
