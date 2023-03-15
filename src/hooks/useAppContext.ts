import { useContext } from "react";

import { AppContext } from "../helpers/contexts/AppContext";

export const useAppContext = () => useContext(AppContext);
