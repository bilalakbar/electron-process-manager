var headerCells = function (data) {
    return data.map(function (cell) { return "<th>".concat(cell, "</th>"); }).join("");
};
var cells = function (data) {
    return data.map(function (cell) { return "<td>".concat(cell, "</td>"); }).join("");
};
var rows = function (data) {
    return data.map(function (row) { return "<tr>".concat(cells(row), "</tr>"); }).join("");
};
var table = function (data) {
    var headings = data[0], rowsData = data.slice(1);
    return "\n  <table>\n    <thead>".concat(headerCells(headings), "</thead>\n    <tbody>").concat(rows(rowsData), "</tbody>\n  </table>\n  ");
};
window.api.processMetrics(function (_event, value) {
    document.getElementById("wrapper").innerHTML = table(value);
});
//# sourceMappingURL=renderer.js.map