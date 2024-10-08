/* eslint-disable no-console */
import * as util from 'util';

export function consoleSetup(
    { ignoreErrors }: { ignoreErrors?: RegExp[] }
) {
    // this breaks the other overrides
    // global.console = new console.Console({
    //     stdout: process.stdout,
    //     stderr: process.stderr,
    //     groupIndentation: 4,
    // });

    const old = console.error.bind(console);
    const baseConsoleDir = console.dir.bind(console);

    console.error = (...args: any[]) => {
        if (ignoreErrors?.some(reg => reg.test(args[0]))) return;
        return old(...args);
    };

    // console.dir does not seem to respect util.inspect.custom
    console.dir = (item, options): any =>
        console.debug(util.inspect(item, { colors: true, depth: 6, ...options }));

    // @ts-ignore
    console.dir.original = baseConsoleDir;
}
