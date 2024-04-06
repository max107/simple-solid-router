import { type JSX, type ParentComponent, splitProps } from "solid-js";
import { type RedirectProps, useNavigate } from "./index";

export type LinkParamsProps =
    | RedirectProps
    | Partial<RedirectProps> & { href?: string }

export type LinkProps = LinkParamsProps & JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
    onClick?(e: MouseEvent): void;
}

export const Link: ParentComponent<LinkProps> = (props) => {
    const [local, rest] = splitProps(props, [
        "children",
        "href",
        "onClick",
        "to",
        "params",
        "query",
        "replace",
    ]);
    const { urlFor, navigate } = useNavigate();

    const handleClick = (e: MouseEvent): void => {
        // ignores the navigation when clicked using right mouse button or
        // by holding a special modifier key: ctrl, command, win, alt, shift
        if (e) {
            if (
                e.ctrlKey ||
                e.metaKey ||
                e.altKey ||
                e.shiftKey ||
                e.button !== 0
            ) {
                return;
            }

            e.preventDefault();
        }

        if (local.onClick) {
            local.onClick(e);
        }
        if (rest.target === '_blank') {
            if (local.href) {
                window?.open(local.href, '_blank')?.focus();
            } else if (local.to) {
                window?.open(urlFor(local.to, local.params, local.query), '_blank')?.focus();
            }
        } else if (local.href) {
            window.location.href = local.href;
        } else if (local.to) {
            navigate(local.to, local.params, local.query, local.replace);
        }
    };

    let href = local.href;
    if (!href && local.to) {
        href = urlFor(local.to, local.params, local.query)
    }

    return (
        <a {...rest} onClick={handleClick} href={href}>
            {local.children}
        </a>
    );
};
