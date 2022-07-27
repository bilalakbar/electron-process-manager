export const transformProcessMetrics = (
  input: Electron.ProcessMetric[]
): Array<Array<number | string>> => {
  const columns = [
    "Process ID",
    "Type",
    "Sandboxed",
    "Idle Wakeups Per Second",
    "% CPU Usage",
    "Peak Working Set Size",
    "Working Set Size",
  ];
  const data: Array<Array<number | string>> = [];

  input.forEach((p) =>
    data.push([
      p.pid,
      p.type,
      String(p.sandboxed),
      p.cpu.idleWakeupsPerSecond,
      Math.round(p.cpu.percentCPUUsage * 1000) / 1000,
      p.memory.peakWorkingSetSize,
      p.memory.workingSetSize,
    ])
  );
  return [columns, ...data];
};
