"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleSetup = consoleSetup;
/* eslint-disable no-console */
const util = require("util");
function consoleSetup({ ignoreErrors }) {
    const old = console.error.bind(console);
    const baseConsoleDir = console.dir.bind(console);
    global.console = new console.Console({
        stdout: process.stdout,
        stderr: process.stderr,
        groupIndentation: 4,
    });
    global.console.error = (...args) => {
        if (ignoreErrors?.some(reg => reg.test(args[0])))
            return;
        return old(...args);
    };
    // console.dir does not seem to respect util.inspect.custom
    global.console.dir = (item, options) => console.debug(util.inspect(item, { colors: true, depth: 6, ...options }));
    // @ts-ignore
    global.console.dir.original = baseConsoleDir;
}
