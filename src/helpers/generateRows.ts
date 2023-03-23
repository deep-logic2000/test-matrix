export const generateRows = (
  rowsQuantity: string | number,
  columnsQuantity: string | number,
  beginRowNumber = 0 as number
) => {
  const arrOfRows = [];
  
  const generateValues = (indexOfRow: number) => {
    const arrOfRowValues = [];
    for (let j = 0; j < Number(columnsQuantity); j++) {
      arrOfRowValues.push({
        id: Math.floor(Math.random() * 100000000000), //antipattern, but it's simplest way to generate unique id
        amount: Math.floor(Math.random() * 1000),
      });
    }
    return arrOfRowValues;
  };

  for (let i = 0; i < Number(rowsQuantity); i++) {
    arrOfRows.push({
      name: `M${i + 1 + beginRowNumber}`,
      values: generateValues(i),
    });
  }

  return arrOfRows;
};
