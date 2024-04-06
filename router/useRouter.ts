import { type RouterEngineInterface } from "./routing";
import { type Context, createContext, useContext } from "solid-js";

export const RouterContext = createContext<RouterEngineInterface>({} as any) as Context<RouterEngineInterface>;

export const useRouter = () => useContext<RouterEngineInterface>(RouterContext);
