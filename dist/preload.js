"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    processMetrics: function (callback) { return electron_1.ipcRenderer.on("process-metrics", callback); }
});
//# sourceMappingURL=preload.js.map