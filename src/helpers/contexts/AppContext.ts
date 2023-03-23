import { createContext } from "react";
import type { ITableRow } from "../../providers/AppProvider";
import type { IInputData } from "../../components/InputForm/InputForm";
import type { CellId } from "../../components/Cell/Cell";

interface IAppState {
  rows: ITableRow[];
  rowsQuantity: number;
}

interface IAppActions {
  handleFormSubmit: (values: IInputData) => void;
  handleCellClick: (cellId: CellId) => void;
  addRow: () => void;
  removeRow: (rowNumber: number) => void;
}

export type IAppContext = IAppState & IAppActions;

export const AppContext = createContext<IAppContext>({
  rows: [],
  rowsQuantity: 0,
  handleFormSubmit: () => {},
  handleCellClick: () => {},
  addRow: () => {},
  removeRow: () => {},
});

