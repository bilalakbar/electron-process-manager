import { app, BrowserWindow } from "electron";
import * as path from "path";
import { transformProcessMetrics } from "./utils";

interface Options {
  interval: number;
  window?: {
    width?: number;
    height?: number;
  };
}

const defaultOptions: Options = {
  interval: 5000,
  window: {
    width: 1000,
    height: 200,
  },
};

class _ElectronProcessManager {
  window: BrowserWindow;
  options: Options;
  intervalHandle: NodeJS.Timer;

  constructor() {
    this.options = defaultOptions;
    app.on("quit", () => this.cleanUp());
  }

  setOptions(options: Options) {
    this.options = options;
  }

  start() {
    this.createWindow();
  }

  createWindow() {
    if (this.window) return this.window;

    this.window = new BrowserWindow({
      height: this.options?.window?.height || defaultOptions.window.height,
      width: this.options?.window?.width || defaultOptions.window.width,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    });

    this.window.loadFile(path.join(__dirname, "../index.html"));
    //    this.window.webContents.openDevTools();
    this.window.on("ready-to-show", () => {
      this.window.webContents.send("process-metrics", this.processMetrics());

      this.intervalHandle = setInterval(
        () =>
          this.window?.webContents.send(
            "process-metrics",
            this.processMetrics()
          ),
        this.options.interval
      );
    });

    this.window.on("close", () => {
      this.window = undefined;
      this.cleanUp();
    });
  }

  processMetrics() {
    return transformProcessMetrics(app.getAppMetrics());
  }

  cleanUp() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = undefined;
    }
  }
}

const ElectronProcessManager = new _ElectronProcessManager();
export default ElectronProcessManager;
