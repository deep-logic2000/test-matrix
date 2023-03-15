import React, { useState, useCallback } from "react";

import { AppContext } from "./helpers/contexts/AppContext";
import "./App.css";

import InputForm from "./components/InputForm/InputForm";
import Table from "./components/Table/Table";
import { generateRows } from "./helpers/generateRows";

import type { ITableRow } from "./components/Table/Table";
import {IInputData} from "./components/InputForm/InputForm";
import type {TypeCell, CellId} from "./components/Cell/Cell";

function App() {
  const [rows, setRows] = useState<ITableRow[]>([]);
  const [rowsQuantity, setRowsQuantity] = useState<number>(0);

  const handleFormSubmit = (values: IInputData) => {
    const { rowsQuantity, columnsQuantity, tooltipsQuantity } = values;
    const rows = generateRows(rowsQuantity, columnsQuantity, 0);
    setRows(rows);
    setRowsQuantity(Number(tooltipsQuantity));
  };

  const handleCellClick = useCallback(
    (cellId: CellId) => {
      if (cellId === 0) return;
      const rowIndex = rows.findIndex((row: ITableRow) =>
        row.values.find((cell: TypeCell) => cell.id === cellId)
      );
      if (rowIndex === -1) return;
      const cellIndex = rows[rowIndex].values.findIndex(
        (cell: TypeCell) => cell.id === cellId
      );
      setRows((prevRows: ITableRow[]) => {
        const newRows = JSON.parse(JSON.stringify(prevRows));
        const newAmount = newRows[rowIndex].values[cellIndex].amount + 1;
        newRows[rowIndex].values[cellIndex].amount = newAmount;
        return newRows;
      });
    },
    [rows]
  );

  const addRow = () => {
    const newRow = generateRows(1, rows[0].values.length, rows.length);
    setRows((prevRows: ITableRow[]) => {
      const newRows = JSON.parse(JSON.stringify(prevRows));
      newRows.push(...newRow);
      return newRows;
    });
  };

  const removeRow = (rowNumber: number) => {
    setRows((prevRows: ITableRow[]) => {
      const newRows = JSON.parse(JSON.stringify(prevRows));
      newRows.splice(rowNumber, 1);
      return newRows;
    });
  };

  return (
    <AppContext.Provider value={{ handleCellClick, removeRow }}>
      <div className="App">
        <InputForm handleFormSubmit={handleFormSubmit} />
        {rows.length ? (
          <>
            <div className="table-wrapper">
              <Table data={rows} rowsQuantity={rowsQuantity} />
            </div>
            <button onClick={addRow} className="btn-add">
              Add row
            </button>
          </>
        ) : null}
      </div>
    </AppContext.Provider>
  );
}

export default App;
