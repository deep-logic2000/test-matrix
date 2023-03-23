import React, { FC, useCallback, useState, memo, useMemo, useEffect } from "react";
import Cell from "../Cell/Cell";
import type { CellId } from "../Cell/Cell";
import type { TypeCell } from "../Cell/Cell";

import RowProvider from "../../providers/RowProvider";
import { useTableContext } from "../../hooks/useTableContext";
import { useAppContext } from "../../hooks/useAppContext";

import { ReactComponent as Delete } from "../../assets/images/icon-delete.svg";

import "./Row.css";

export interface ITableRow {
  rowIndex: number;
  name: string;
  values: TypeCell[];
}

const Row: FC<ITableRow> = memo((props) => {
  const name = props.name;
  const values = props.values;
  const rowIndex = props.rowIndex;

  const { removeRow } = useAppContext();
  const { defineActiveCells } = useTableContext();

  const sumValuesOfRow = values.reduce((acc: number, value: TypeCell) => {
    return acc + value.amount;
  }, 0);


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
      <RowProvider values={values} defineActiveCells={defineActiveCells} >
        {values &&
          values.map((cellObj, index) => (
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
      </RowProvider>
    </tr>
  );
});

export default Row;
