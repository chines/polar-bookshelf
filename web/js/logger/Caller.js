"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Caller {
    static getCaller() {
        let e = new Error();
        let stack = e.stack;
        if (stack === undefined) {
            throw new Error("No stack on error");
        }
        let frame = stack.split("\n")[3];
        let result = Caller._parse(frame);
        return result;
    }
    static _parse(frame) {
        let javascriptCaller = Caller.parseRE(frame, /([^/.)]+\.(js|ts|tsx)):[0-9]+:[0-9]+\)$/g);
        let webpackCaller = Caller.parseRE(frame, /([^/.)]+\.(js|ts|tsx))( |\?)/g);
        if (webpackCaller) {
            return webpackCaller;
        }
        if (javascriptCaller)
            return javascriptCaller;
        throw new Error(`Could not determine caller from frame: '${frame}'`);
    }
    static parseRE(frame, re) {
        let m = re.exec(frame);
        if (m) {
            return { filename: m[1] };
        }
        else {
            return null;
        }
    }
}
exports.Caller = Caller;
//# sourceMappingURL=Caller.js.map