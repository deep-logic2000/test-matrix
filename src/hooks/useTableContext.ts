import { useContext, useState } from "react";

import { TableContext } from "../helpers/contexts/TableContext";
import type { TableContextType } from "../helpers/contexts/TableContext";

export interface ITableContext {
    activeCells: number[];
    defineActiveCells: (amount: number, id: number) => void;
    cancelHighlightCells: () => void;
  }
  export const useTableContext = (): TableContextType => useContext(TableContext);