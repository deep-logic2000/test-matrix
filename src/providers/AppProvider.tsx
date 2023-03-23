import { createContext, useState, useCallback, useContext } from "react";
import { generateRows } from "../helpers/generateRows";
import { AppContext } from "../helpers/contexts/AppContext";
import type { IInputData } from "../components/InputForm/InputForm";
import type { TypeCell, CellId } from "../components/Cell/Cell";

export interface ITableRow {
  name: string;
  values: Array<TypeCell>;
}

interface Props {
  children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [rows, setRows] = useState<ITableRow[]>([]);
  const [rowsQuantity, setRowsQuantity] = useState<number>(0);

  const handleFormSubmit = useCallback((values: IInputData) => {
    const { rowsQuantity, columnsQuantity, tooltipsQuantity } = values;
    const rows = generateRows(rowsQuantity, columnsQuantity, 0);
    setRows(rows);
    setRowsQuantity(Number(tooltipsQuantity));
  }, []);

  const handleCellClick = useCallback((cellId: CellId) => {
    if (cellId === 0) return;
    const rowIndex = rows.findIndex((row: ITableRow) =>
      row.values.find((cell: TypeCell) => cell.id === cellId)
    );
    if (rowIndex === -1) return;
    const cellIndex = rows[rowIndex].values.findIndex(
      (cell: TypeCell) => cell.id === cellId
    );
    setRows((prevRows: ITableRow[]) => {
      const newAmount = prevRows[rowIndex].values[cellIndex].amount + 1;
      const newRows = [...prevRows];
      newRows[rowIndex].values[cellIndex].amount = newAmount;
      return newRows;
    });
  }, [rows]);

  const addRow = useCallback(() => {
    const newRow = generateRows(1, rows[0].values.length, rows.length);
    setRows((prevRows: ITableRow[]) => [...prevRows, ...newRow]);
  }, [rows]);

  const removeRow = useCallback((rowNumber: number) => {
    setRows((prevRows: ITableRow[]) => {
      const newRows = [...prevRows];
      newRows.splice(rowNumber, 1);
      return newRows;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ rows, rowsQuantity, handleFormSubmit, handleCellClick, addRow, removeRow }}
    >
      {children}
    </AppContext.Provider>
  );
};