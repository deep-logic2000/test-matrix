import React, { FC, useState } from "react";
import Cell from "../Cell/Cell";
import type { CellId } from "../Cell/Cell";
import { ITableRow } from "../Table/Table";
import type { TypeCell } from "../Cell/Cell";

import { RowContext } from "../../helpers/contexts/RowContext";
import { useTableContext } from "../../hooks/useTableContext";
import { useAppContext } from "../../hooks/useAppContext";

import { ReactComponent as Delete } from "../../assets/images/icon-delete.svg";

import "./Row.css";

export interface IRowProps extends ITableRow {
  rowIndex: number;
}

const Row: FC<IRowProps> = (props: IRowProps) => {
  const [expandRowsIds, setExpandRowsIds] = useState<CellId[]>([]);
  const { name, values, rowIndex } = props;

  const { removeRow } = useAppContext();
  const { defineActiveCells } = useTableContext();

  const sumValuesOfRow = values.reduce((acc: number, value: TypeCell) => {
    return acc + value.amount;
  }, 0);

  const handleMouseOver = (id: number, amount: number) => {
    if (!id) return;
    const isOnSumCell = !values.some((value: TypeCell) => value.id === id);
    if (isOnSumCell) {
      const expandRows = values.map((cellObj: TypeCell) => cellObj.id);
      setExpandRowsIds(expandRows);
    } else {
      defineActiveCells(amount);
    }
  };

  const handleMouseOut = () => {
    setExpandRowsIds([]);
  };

  return (
    <tr
      className={`${name === "Average values" && "row-average"} ${
        rowIndex % 2 === 0 ? "row-color-2" : "row-color-1"
      }`}>
      <td
        className={`row-title ${
          rowIndex % 2 === 0 ? "row-color-2" : "row-color-1"
        } ${name === "Average values" ? "row-average" : ""}`}>
        <div className="row__name--wrapper">
          {name}{" "}
          {name !== "Average values" && (
            <div className="icon-wrapper">
              <Delete onClick={() => removeRow(rowIndex)} />
            </div>
          )}
        </div>
      </td>
      <RowContext.Provider
        value={{
          expandRowsIds,
          handleMouseOver,
          handleMouseOut,
          sumValuesOfRow,
        }}>
        {values &&
          values.map((cellObj: TypeCell, index: number) => (
            <Cell
              id={cellObj.id}
              amount={cellObj.amount}
              key={`row-${name}-${cellObj.amount}-${index}`}
            />
          ))}
        <Cell
          id={Number(`${rowIndex + 1}`)}
          amount={Number(sumValuesOfRow.toFixed(1))}
          key={`row-${name}-${sumValuesOfRow}`}
        />
      </RowContext.Provider>
    </tr>
  );
};

export default Row;
