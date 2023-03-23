import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { RowContext } from "../helpers/contexts/RowContext";
import type { CellId, TypeCell } from "../components/Cell/Cell";


type Props = {
  children: React.ReactNode;
  values: TypeCell[];
  defineActiveCells: (amount: number, id: number) => void;
};


const RowProvider: FC<Props> = ({ children, values, defineActiveCells }) => {
  const [expandRowsIds, setExpandRowsIds] = useState<CellId[]>([]);

const sumValuesOfRow = useMemo(()=>values.reduce((acc: number, value: TypeCell) => {
  return acc + value.amount;
}, 0), [values]);

  const handleMouseOver = useCallback(
    (id: number, amount: number) => {
      if (!id) return;
      const isOnSumCell = !values.some((value: TypeCell) => value.id === id);
      if (isOnSumCell) {
        const expandRows = values.map((cellObj) => cellObj.id);
        setExpandRowsIds(expandRows);
      } else {
        defineActiveCells(amount, id);
      }
    },
    [values, defineActiveCells]
  );


  const handleMouseOut = useCallback(() => {
    setExpandRowsIds([]);
  }, []);


  return (
    <RowContext.Provider
      value={{
        expandRowsIds,
        handleMouseOver,
        handleMouseOut,
        sumValuesOfRow,
      }}
    >
      {children}
    </RowContext.Provider>
  );
};


export default RowProvider;