import { useContext } from "react";

import { RowContext } from "../helpers/contexts/RowContext";
import type { RowContextType } from "../helpers/contexts/RowContext";

export const useRowContext = (): RowContextType => useContext(RowContext);
