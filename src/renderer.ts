const table = new window.gridjs.Grid({
  columns: [],
  data: [],
}).render(document.getElementById("wrapper"));

window.api.processMetrics((_event: any, value: any) => {
  table
    .updateConfig({
      data: value,
    })
    .forceRender();
});
