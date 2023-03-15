import { createContext } from "react";

export type AppContextType = {
  handleCellClick: (cellId: number) => void;
  removeRow: (rowId: number) => void;
};
export const AppContext = createContext<AppContextType>({
  handleCellClick: () => {},
  removeRow: () => {},
});
