import { batch, type Component, createEffect, createSignal, Show } from "solid-js";
import {
    type CurrentRouteMatch,
    locationToString,
    routeIsEqual,
    type RouteMatch,
    type RouterEngineInterface,
    type RouterProps,
    routeToCurrent
} from "./index";
import { useLocation } from "./useLocation";
import { CurrentRouteContext } from "./useCurrentRoute";

export const RouterRender: Component<RouterProps & { router: RouterEngineInterface }> = ({
    renderer,
    router,
}) => {
    const location = useLocation();

    const [
        value,
        setValue,
    ] = createSignal<RouteMatch | null>(router.match(locationToString(location())), {
        equals: (newVal, oldVal) => routeIsEqual(oldVal, newVal),
    });

    const [
        currentRoute,
        setCurrentRoute,
    ] = createSignal<CurrentRouteMatch | null>(routeToCurrent(value()), {
        equals: (newVal, oldVal) => routeIsEqual(oldVal, newVal),
    });

    createEffect(() => {
        const route = router.match(locationToString(location()));
        if (routeIsEqual(value(), route)) {
            return;
        }

        batch(() => {
            setValue(route);
            setCurrentRoute(routeToCurrent(route));
        });
    });

    return (
        <Show when={value()}>
            <CurrentRouteContext.Provider value={currentRoute}>
                {renderer(value() as RouteMatch)}
            </CurrentRouteContext.Provider>
        </Show>
    );
};
