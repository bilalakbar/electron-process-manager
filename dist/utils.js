"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.transformProcessMetrics = void 0;
var transformProcessMetrics = function (input) {
    var columns = [
        "Process ID",
        "Type",
        "Sandboxed",
        "Idle Wakeups Per Second",
        "% CPU Usage",
        "Peak Working Set Size",
        "Working Set Size",
    ];
    var data = [];
    input.forEach(function (p) {
        return data.push([
            p.pid,
            p.type,
            String(p.sandboxed),
            p.cpu.idleWakeupsPerSecond,
            Math.round(p.cpu.percentCPUUsage * 1000) / 1000,
            p.memory.peakWorkingSetSize,
            p.memory.workingSetSize,
        ]);
    });
    return __spreadArray([columns], data, true);
};
exports.transformProcessMetrics = transformProcessMetrics;
//# sourceMappingURL=utils.js.map