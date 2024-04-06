import { type Component } from "solid-js";
import { useNavigate } from "./useNavigate";

export type CurrentRouteProps = {
    params?: object
    query?: object
}

export type RedirectProps = CurrentRouteProps & {
    to: string
    replace?: boolean
}

export const Redirect: Component<RedirectProps> = ({
    to,
    params,
    query,
    replace,
}): null => {
    const { navigate } = useNavigate();
    navigate(to, params, query, replace);

    return null;
};
