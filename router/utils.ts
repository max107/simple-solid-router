import qs from "qs";
import { compile } from "path-to-regexp";
import { HistoryLocation } from "../history";
import { type CurrentRouteMatch, type RouteMatch } from "./routing";
import { deepEquals } from "./equal";

/**
 * Clean path by stripping subsequent "//"'s. Without this
 * the user must be careful when to use "/" or not, which leads
 * to bad UX.
 */
export const cleanPath = (path: string): string => (
    path.replace(/\/\/+/g, '/')
);

export const buildUri = (uri: string, query: object = {}): string => (
    Object.keys(query).length > 0 ? `${uri}?${qs.stringify(query)}` : uri
);

export function buildFrom<P extends object>(path: string, params?: P, query?: object): string {
    return buildUri(compile<P>(path)(params), query);
}

export type ParsedHistoryLocation = {
    pathname: string
    search: object
}

/**
 * Parse uri string into string before ? and search object after ?
 * @param uri
 */
export const splitUri = (uri: string): ParsedHistoryLocation => {
    const parts: string[] = uri.split('?').filter((f: string) => f);

    return {
        pathname: parts.length > 0 ? parts[0] : '',
        search: qs.parse(parts[1] ? parts[1] : ''),
    };
};

export const locationIsEqual = (a: HistoryLocation, b: HistoryLocation) => (
    a.search === b.search &&
    a.pathname === b.pathname &&
    a.hash === b.hash
);

export const locationToString = ({ pathname, search }: HistoryLocation): string => [
    pathname,
    search ? search.substring(1) : ''
].filter((t) => t).join("?");

export const routeToCurrent = (route: RouteMatch | null): CurrentRouteMatch | null => route ? ({
    name: route.name,
    path: route.path,
    params: route.params,
    query: route.query
}) : null;

export const routeIsEqual = (prev: RouteMatch | CurrentRouteMatch | null, next: RouteMatch | null) => {
    if (prev === null && next === null) {
        return true;
    }

    return deepEquals(prev?.query, next?.query)
        && deepEquals(prev?.params, next?.params)
        && prev?.path === next?.path
        && prev?.name === next?.name;
}
