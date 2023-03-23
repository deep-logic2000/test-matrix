import { useContext } from "react";

import { AppContext } from "../helpers/contexts/AppContext";
import type { IAppContext } from "../helpers/contexts/AppContext";

export const useAppContext = (): IAppContext => useContext(AppContext);
