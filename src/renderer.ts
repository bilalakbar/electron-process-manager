type Value = number | string;

const headerCells = (data: Value[]) =>
  data.map((cell) => `<th>${cell}</th>`).join("");

const cells = (data: Value[]) =>
  data.map((cell) => `<td>${cell}</td>`).join("");

const rows = (data: Value[][]) =>
  data.map((row) => `<tr>${cells(row)}</tr>`).join("");

const table = (data: Value[][]): string => {
  const [headings, ...rowsData] = data;

  return `
  <table>
    <thead>${headerCells(headings)}</thead>
    <tbody>${rows(rowsData)}</tbody>
  </table>
  `;
};

window.api.processMetrics((_event: any, value: Value[][]) => {
  document.getElementById("wrapper").innerHTML = table(value);
});
