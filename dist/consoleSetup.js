"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleSetup = consoleSetup;
/* eslint-disable no-console */
const util = __importStar(require("util"));
function consoleSetup({ ignoreErrors }) {
    // this breaks the other overrides
    // global.console = new console.Console({
    //     stdout: process.stdout,
    //     stderr: process.stderr,
    //     groupIndentation: 4,
    // });
    const old = console.error.bind(console);
    const baseConsoleDir = console.dir.bind(console);
    console.error = (...args) => {
        if (ignoreErrors?.some(reg => reg.test(args[0])))
            return;
        return old(...args);
    };
    // console.dir does not seem to respect util.inspect.custom
    console.dir = (item, options) => console.debug(util.inspect(item, { colors: true, depth: 6, ...options }));
    // @ts-ignore
    console.dir.original = baseConsoleDir;
}
