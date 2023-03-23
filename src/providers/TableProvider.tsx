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

  const filterData = (array: TypeCell[], index: number): number[] => {
    console.log('array, index', array, index);
    
    if (index + 1 <= rowsQuantity / 2) {
      const resultArr = array.slice(0, rowsQuantity + 1).map((cell: TypeCell) => cell.id)
      console.log('resultArr index < rowsQuantity / 2', resultArr);
      
      return resultArr;
    }
    if (index >= array.length - rowsQuantity / 2) {
      const resultArr = array.slice(- rowsQuantity - 1).map((cell: TypeCell) => cell.id)
      console.log('index > array.length - rowsQuantity / 2', resultArr);
      return resultArr;
    }

 return array
      .filter(
        (_, i) =>
          i > index - rowsQuantity / 2 - 1 && i <= index + rowsQuantity / 2
      )
      .map((cell: TypeCell) => cell.id);
  };

  const defineActiveCells = useCallback(
    (amount: CellValue, id: CellId) => {
      const flatData = data.map((row: ITableRow) => row.values).flat();
      flatData.sort((a: TypeCell, b: TypeCell) => a.amount - b.amount);
      const index = flatData.findIndex((cell: TypeCell) => cell.id === id);
      const results = filterData(flatData, index);
      setActiveCells(results);
    },
    [data, filterData]
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
