declare type Value = number | string;
declare const headerCells: (data: Value[]) => string;
declare const cells: (data: Value[]) => string;
declare const rows: (data: Value[][]) => string;
declare const table: (data: Value[][]) => string;
