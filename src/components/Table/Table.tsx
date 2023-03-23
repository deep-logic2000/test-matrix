
import React, { FC, useState, useCallback, useMemo } from "react";
import { TableContext } from "../../helpers/contexts/TableContext";
import TableProvider from "../../providers/TableProvider";
import { useAppContext } from "../../hooks/useAppContext";
import type { TypeCell } from "../Cell/Cell";
import Row from "../Row/Row";
import "./Table.css";

export interface ITableRow {
  name: string;
  values: Array<TypeCell>;
}

export interface ITableProps {
  data: Array<ITableRow>;
  rowsQuantity: number;
}

const Table: FC<ITableProps> = (props: ITableProps): JSX.Element => {
  const { rows, rowsQuantity } = useAppContext();

  const averageValues = rows[0].values.map(
    (element: TypeCell, index: number) => {
      const sum = rows.reduce((acc: number, row: ITableRow) => {
        return acc + row.values[index].amount;
      }, 0);
      return { amount: Number((sum / rows.length).toFixed(1)), id: 0 };
    }
  );

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {rows[0].values &&
              rows[0].values.map((element: TypeCell, index: number) => (
                <th key={`N-${index}`}>N-{index + 1}</th>
              ))}
            <th>Sum values</th>
          </tr>
        </thead>
        <TableProvider
          data={rows} rowsQuantity={rowsQuantity} >
          <tbody>
            {rows.map((row: ITableRow, index: number) => (
              <Row
                key={`row-${row.name}-${index}`}
                name={row.name}
                values={row.values}
                rowIndex={index}
              />
            ))}
          </tbody>
          <tfoot>
            <Row
              name="Average values"
              values={averageValues}
              rowIndex={10101010}
            />
          </tfoot>
        </TableProvider>
      </table>
    </div>
  );
};

export default Table;