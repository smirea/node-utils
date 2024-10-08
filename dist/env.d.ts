export declare const isJest: boolean;
type EnvTypes = 'string' | 'number' | 'boolean' | 'int';
type GetType<T extends EnvTypes> = T extends 'number' | 'int' ? number : T extends 'string' ? string : T extends 'boolean' ? boolean : never;
export declare const envNamesUsed: Record<string, any>;
export declare const env: (<T extends EnvTypes = "string">(type: T, name: string, defaultValue?: GetType<T> | undefined) => false extends true ? GetType<T> | undefined : GetType<T>) & {
    optional: <T extends EnvTypes = "string">(type: T, name: string, defaultValue?: GetType<T> | undefined) => true extends true ? GetType<T> | undefined : GetType<T>;
};
export declare function setupDotenv(root: string): void;
export {};
