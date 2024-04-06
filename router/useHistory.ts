import { type HistoryInterface } from "../history";
import { createContext, useContext } from "solid-js";

export const HistoryContext = createContext<HistoryInterface>({} as HistoryInterface);

export const useHistory = () => useContext<HistoryInterface>(HistoryContext);
