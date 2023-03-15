import { createContext } from "react";

export type TableContextType = {
  defineActiveCells: ((amount: number) => void);
  cancelHighlightCells: () => void;
  activeCells: number[];
};
export const TableContext = createContext<TableContextType>({
  defineActiveCells: () => {},
  cancelHighlightCells: () => {},
  activeCells: [],
});
