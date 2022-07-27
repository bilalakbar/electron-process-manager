/// <reference types="node" />
import { BrowserWindow } from "electron";
interface Options {
    interval: number;
    window?: {
        width?: number;
        height?: number;
    };
}
declare class _ElectronProcessManager {
    window: BrowserWindow;
    options: Options;
    intervalHandle: NodeJS.Timer;
    constructor();
    setOptions(options: Options): void;
    start(): void;
    createWindow(): BrowserWindow;
    processMetrics(): (string | number)[][];
    cleanUp(): void;
}
declare const ElectronProcessManager: _ElectronProcessManager;
export default ElectronProcessManager;
