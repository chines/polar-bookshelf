/**
 * Simple logger that just writes to the console.
 */
import {ILogger} from './ILogger';
import {Files} from '../util/Files';
import {ElectronContextTypes} from '../electron/context/ElectronContextTypes';
import {ElectronContextType} from '../electron/context/ElectronContextType';

const delegate = require('electron-log');

export class ElectronLogger implements ILogger {

    info(msg: string, ...args: any[]) {
        delegate.log(msg, ...args);
    }

    warn(msg: string, ...args: any[]) {
        delegate.warn(msg, ...args);
    }

    error(msg: string, ...args: any[]) {
        delegate.error(msg, ...args);
    }

    verbose(msg: string, ...args: any[]) {
        delegate.log(msg, " VERBOSE: ", ...args);
    }

    debug(msg: string, ...args: any[]) {
        delegate.log(msg, " DEBUG: " , ...args);
    }
}

export class ElectronLoggers {

    public static async create(logsDir: string, config: ElectronLoggerConfig = { createDir: true }) {

        if(config.createDir) {
            await Files.createDirAsync(logsDir);
        }

        if (ElectronContextTypes.create() === ElectronContextType.MAIN) {

            // *** configure console
            delegate.transports.console.level = "info";
            delegate.transports.console.format="[{y}-{m}-{d} {h}:{i}:{s}.{ms} {z}] [{level}] {text}";

            // *** configure file

            // set the directory name properly
            delegate.transports.file.file = `${logsDir}/polar.log`;
            delegate.transports.file.format="[{y}-{m}-{d} {h}:{i}:{s}.{ms} {z}] [{level}] {text}";

            delegate.transports.file.level = "info";
            delegate.transports.file.appName = "polar";

        }

    }

}

export interface ElectronLoggerConfig {

    readonly createDir: boolean;

}
