var table = new window.gridjs.Grid({
    columns: [],
    data: []
}).render(document.getElementById("wrapper"));
window.api.processMetrics(function (_event, value) {
    table
        .updateConfig({
        data: value
    })
        .forceRender();
});
//# sourceMappingURL=renderer.js.map