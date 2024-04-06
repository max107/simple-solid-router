import { createSignal, onCleanup } from "solid-js";
import { HistoryLocation } from "../history";
import { locationIsEqual } from "./utils";
import { useHistory } from "./useHistory";

export const useLocation = () => {
    const history = useHistory();

    const [location, setLocation] = createSignal<HistoryLocation>(history.location);

    const unlisten = history.listen(newLocation => {
        if (locationIsEqual(location(), newLocation)) {
            return;
        }
        setLocation(newLocation);
    });

    onCleanup(() => unlisten());

    return location;
};
