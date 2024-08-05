export declare const isJest: boolean;
type EnvTypes = 'string' | 'number' | 'boolean' | 'int';
type GetType<T extends EnvTypes> = T extends 'number' | 'int' ? number : T extends 'string' ? string : T extends 'boolean' ? boolean : 123;
export declare const env: (<T extends EnvTypes = "string">(type: T, name: string, defaultValue?: T | undefined) => false extends true ? GetType<T> | undefined : GetType<T>) & {
    optional: <T extends EnvTypes = "string">(type: T, name: string, defaultValue?: T | undefined) => true extends true ? GetType<T> | undefined : GetType<T>;
};
export {};
