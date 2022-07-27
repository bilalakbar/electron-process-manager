"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var utils_1 = require("./utils");
var defaultOptions = {
    interval: 5000,
    window: {
        width: 1000,
        height: 200
    }
};
var _ElectronProcessManager = /** @class */ (function () {
    function _ElectronProcessManager() {
        var _this = this;
        this.options = defaultOptions;
        electron_1.app.on("quit", function () { return _this.cleanUp(); });
    }
    _ElectronProcessManager.prototype.setOptions = function (options) {
        this.options = options;
    };
    _ElectronProcessManager.prototype.start = function () {
        this.createWindow();
    };
    _ElectronProcessManager.prototype.createWindow = function () {
        var _this = this;
        var _a, _b, _c, _d;
        if (this.window)
            return this.window;
        this.window = new electron_1.BrowserWindow({
            height: ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.height) || defaultOptions.window.height,
            width: ((_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.window) === null || _d === void 0 ? void 0 : _d.width) || defaultOptions.window.width,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                contextIsolation: true,
                nodeIntegration: false,
                sandbox: true
            }
        });
        this.window.loadFile(path.join(__dirname, "../index.html"));
        //    this.window.webContents.openDevTools();
        this.window.on("ready-to-show", function () {
            _this.window.webContents.send("process-metrics", _this.processMetrics());
            _this.intervalHandle = setInterval(function () {
                var _a;
                return (_a = _this.window) === null || _a === void 0 ? void 0 : _a.webContents.send("process-metrics", _this.processMetrics());
            }, _this.options.interval);
        });
        this.window.on("close", function () { return _this.cleanUp(); });
    };
    _ElectronProcessManager.prototype.processMetrics = function () {
        return (0, utils_1.transformProcessMetrics)(electron_1.app.getAppMetrics());
    };
    _ElectronProcessManager.prototype.cleanUp = function () {
        if (this.intervalHandle) {
            clearInterval(this.intervalHandle);
            this.intervalHandle = undefined;
        }
    };
    return _ElectronProcessManager;
}());
var ElectronProcessManager = new _ElectronProcessManager();
exports["default"] = ElectronProcessManager;
//# sourceMappingURL=index.js.map