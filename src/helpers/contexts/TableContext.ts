import { createContext } from "react";
import type { CellId, CellValue } from "../../components/Cell/Cell";

export type TableContextType = {
  activeCells: CellId[];
  defineActiveCells: (amount: CellValue, id: CellId) => void;
  cancelHighlightCells: () => void;
};

export const TableContext = createContext<TableContextType>({
  activeCells: [],
  defineActiveCells: () => {},
  cancelHighlightCells: () => {},
});