declare global {
  interface Window {
    api: {
      processMetrics: (callback: Function) => void;
    };
    gridjs: any;
  }
}

export {};
