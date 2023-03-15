import { useContext } from "react";

import { TableContext } from "../helpers/contexts/TableContext";

export const useTableContext = () => useContext(TableContext);
