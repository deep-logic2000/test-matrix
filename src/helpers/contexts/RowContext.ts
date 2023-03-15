import { createContext } from "react";

export type RowContextType = {
  handleMouseOver: (id: number, amount: number) => void;
  handleMouseOut: (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ) => void;
  expandRowsIds?: number[];
  sumValuesOfRow?: number;
};

export const RowContext = createContext<RowContextType>({
  handleMouseOver: () => {},
  handleMouseOut: () => {},
  expandRowsIds: [],
  sumValuesOfRow: undefined,
});
