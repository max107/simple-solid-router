import { type CurrentRouteMatch, type CurrentRouteParams } from "./routing";
import { type Accessor, createContext, useContext } from "solid-js";

export const CurrentRouteContext = createContext<Accessor<CurrentRouteMatch | null>>(() => null);

export const useCurrentRoute = <T extends object = {}, E extends object = {}>() => (
    useContext(CurrentRouteContext) as Accessor<CurrentRouteMatch<CurrentRouteParams<T, E>>>
);
