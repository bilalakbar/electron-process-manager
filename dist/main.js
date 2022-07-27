"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var index_1 = require("./index");
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        height: 100,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        },
        width: 100
    });
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
}
electron_1.app.on("ready", function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
setTimeout(function () { return index_1["default"].start(); }, 5000);
setTimeout(function () { return index_1["default"].start(); }, 5000);
//# sourceMappingURL=main.js.map