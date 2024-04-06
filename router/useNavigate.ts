import { useRouter } from "./useRouter";
import { useHistory } from "./useHistory";

export const useNavigate = () => {
    const router = useRouter();
    const history = useHistory();

    const urlFor = (route: string, params?: object, query?: object): string => {
        try {
            return route.indexOf('/') > -1 ? route : router.urlFor(route, params, query);
        } catch (e) {
            throw Error(JSON.stringify({
                message: 'unknown route',
                route,
                params,
                query
            }));
        }
    };

    const navigate = (
        route: string,
        params?: object,
        query?: object,
        replace?: boolean,
        scrollToTop = true,
    ) => {
        if (scrollToTop && typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
            });
        }
        history.navigate(urlFor(route, params, query), replace);
    };

    return {
        navigate,
        urlFor
    };
};
