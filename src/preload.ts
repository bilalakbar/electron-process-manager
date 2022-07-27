import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  processMetrics: (
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.on("process-metrics", callback),
});
