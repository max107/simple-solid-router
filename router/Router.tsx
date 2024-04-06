import type { JSX, ParentComponent } from "solid-js";
import { HistoryInterface } from "../history";
import { HistoryContext, type RouteMatch, type RouterEngineInterface } from "./index";
import { RouterRender } from "./RouterRender";
import { RouterContext } from "./useRouter";

export type RendererFunction<T = any> = (match: RouteMatch<T>) => JSX.Element | null;

export type RouterProps<T = any> = {
    renderer: RendererFunction<T>;
}

export type RouterProviderProps<T = any> = RouterProps<T> & {
    router: RouterEngineInterface;
    history: HistoryInterface;
}

export const Router: ParentComponent<RouterProviderProps> = ({
    router,
    history,
    children,
    renderer,
}) => (
    <HistoryContext.Provider value={history}>
        <RouterContext.Provider value={router}>
            <RouterRender
                router={router}
                renderer={renderer}
            />
            {children}
        </RouterContext.Provider>
    </HistoryContext.Provider>
);
