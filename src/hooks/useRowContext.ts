import { useContext } from "react";

import { RowContext } from "../helpers/contexts/RowContext";

export const useRowContext = () => useContext(RowContext);
