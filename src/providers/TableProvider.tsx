import React, { FC, useState, useMemo, useCallback } from "react";
import { TableContext } from "../helpers/contexts/TableContext";
import type { TypeCell } from "../components/Cell/Cell";
import type { CellId, CellValue } from "../components/Cell/Cell";
import type { ITableRow } from "./AppProvider";

type Props = {
  data: ITableRow[];
  rowsQuantity: number;
  children: React.ReactNode;
};

const TableProvider: FC<Props> = ({ data, rowsQuantity, children }) => {
  const [activeCells, setActiveCells] = useState<CellId[]>([]);

  const defineActiveCells = useCallback(
    (amount: CellValue, id: CellId) => {
        const flatData = data.map((row: ITableRow) => row.values).flat();
        flatData.sort((a: TypeCell, b: TypeCell) => a.amount - b.amount);
        const index = flatData.findIndex((cell: TypeCell) => cell.id === id);
        const results = flatData
        .slice(index - rowsQuantity / 2, index + rowsQuantity / 2 + 1)
        .map((cell: TypeCell) => cell.id);
        setActiveCells(results);
    },
    [rowsQuantity, data]
  );

  const cancelHighlightCells = useCallback(() => {
    setActiveCells([]);
  }, []);

  const value = useMemo(() => {
    return { activeCells, defineActiveCells, cancelHighlightCells };
  }, [activeCells, defineActiveCells, cancelHighlightCells]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export default TableProvider;
