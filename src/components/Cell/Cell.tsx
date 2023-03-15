import React, { FC } from "react";

import { useAppContext } from "../../hooks/useAppContext";
import { useTableContext } from "../../hooks/useTableContext";
import { useRowContext } from "../../hooks/useRowContext";

import "./Cell.css";

export type CellId = number;
export type CellValue = number;

export type TypeCell = {
  id: CellId;
  amount: CellValue;
};

const Cell: FC<TypeCell> = (props: TypeCell) => {
  const { id, amount } = props;

  const { handleCellClick } = useAppContext();
  const { cancelHighlightCells, activeCells } = useTableContext();
  const { expandRowsIds, handleMouseOver, handleMouseOut, sumValuesOfRow } =
    useRowContext();

  return (
    <td
      id={`${id}`}
      onClick={() => handleCellClick && handleCellClick(id)}
      onMouseOver={() => handleMouseOver(id, amount)}
      onMouseOut={(e) => {
        cancelHighlightCells();
        handleMouseOut(e);
      }}
      style={{ background: activeCells?.includes(id) ? "#b4ff89" : "inherit" }}>
      {amount}{" "}
      {expandRowsIds?.includes(id) && sumValuesOfRow && (
        <span className="expanded-text">
          &#8594; {((amount * 100) / sumValuesOfRow).toFixed(1)} %
        </span>
      )}
    </td>
  );
};

export default Cell;
