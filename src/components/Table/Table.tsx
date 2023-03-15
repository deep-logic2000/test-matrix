import React, { FC, useState, useCallback } from "react";

import { TableContext } from "../../helpers/contexts/TableContext";

import type { CellValue } from "../Cell/Cell";
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
  const { data, rowsQuantity } = props;
  const [activeCells, setActiveCells] = useState<number[]>([10]);

  const averageValues = data[0].values.map(
    (element: TypeCell, index: number) => {
      const sum = data.reduce((acc: number, row: ITableRow) => {
        return acc + row.values[index].amount;
      }, 0);
      return { amount: Number((sum / data.length).toFixed(1)), id: 0 };
    }
  );

  const defineActiveCells = useCallback((amount: CellValue) => {
    const newData = data.map((row: ITableRow) => row.values);
    const allCellsSortData = newData
      .flat()
      .sort((a: TypeCell, b: TypeCell) => a.amount - b.amount);

    let activeCells = [];
    let low = 0,
      high = allCellsSortData.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (allCellsSortData[mid].amount === amount) {
        low = mid;
        break;
      } else if (allCellsSortData[mid].amount > amount) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    let i = low,
      j = low + 1;
    while (activeCells.length < Number(rowsQuantity) + 1) {
      if (i >= 0 && j < allCellsSortData.length) {
        if (
          Math.abs(allCellsSortData[i].amount - amount) <=
          Math.abs(allCellsSortData[j].amount - amount)
        ) {
          activeCells.push(allCellsSortData[i]);
          i--;
        } else {
          activeCells.push(allCellsSortData[j]);
          j++;
        }
      } else if (i >= 0) {
        activeCells.push(allCellsSortData[i]);
        i--;
      } else if (j < allCellsSortData.length) {
        activeCells.push(allCellsSortData[j]);
        j++;
      }
    }
    setActiveCells(activeCells.map((cell: TypeCell) => cell.id));
  }, [rowsQuantity, data]);

  const cancelHighlightCells = () => {
    setActiveCells([]);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {data[0].values &&
              data[0].values.map((element: TypeCell, index: number) => (
                <th key={`N-${index}`}>N-{index + 1}</th>
              ))}
            <th>Sum values</th>
          </tr>
        </thead>
        <TableContext.Provider
          value={{ activeCells, defineActiveCells, cancelHighlightCells }}>
          <tbody>
            {data.map((row: ITableRow, index: number) => (
              <Row
                key={`row-${row.name}-${index}`}
                name={row.name}
                values={row.values}
                rowIndex={index}
              />
            ))}
          </tbody>
        </TableContext.Provider>
        <TableContext.Provider
          value={{ activeCells, cancelHighlightCells, defineActiveCells }}>
          <tfoot>
            <Row
              name="Average values"
              values={averageValues}
              rowIndex={10101010}
            />
          </tfoot>
        </TableContext.Provider>
      </table>
    </div>
  );
};

export default Table;
