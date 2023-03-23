import React, { FC, memo, useEffect } from "react";

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

const Cell: FC<TypeCell> = memo((props: TypeCell) => {
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
      style={{
        background: activeCells?.includes(id)
          ? "#b4ff89"
          : expandRowsIds?.includes(id) && sumValuesOfRow
          ? "linear-gradient(0deg, rgba(89,165,235,1) 12%, rgba(150,218,255,1) 49%)"
          : "inherit",
      }}>
      {amount.toString().padStart(3, "0")}{" "}
      {expandRowsIds?.includes(id) && sumValuesOfRow && (
        <span className="expanded-text">
          &#8594; {((amount * 100) / sumValuesOfRow).toFixed(1)} %
        </span>
      )}
    </td>
  );
});

export default Cell;
