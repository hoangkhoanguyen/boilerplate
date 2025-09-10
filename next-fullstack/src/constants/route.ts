export const ROUTE = {
    root: "",
    dashboard: "",
    users: "/users",
    user: "/users/[id]",
    userEdit: "/users/[id]/edit",
    posts: "/posts",
    post: "/posts/[id]",
    settings: "/settings",
    settingsSection: "/settings/[section]",
} as const;

type Routes = typeof ROUTE;
type RouteKey = keyof Routes;

/**
 * Extract param names from a route string. Supports [param] and :param forms.
 * Result is a union of param names or never when none.
 */
type ExtractParams<S extends string> = S extends `${infer _Start}[${infer P}]${infer Rest}`
    ? P | ExtractParams<Rest>
    : S extends `${infer _Start}:${infer P}/${infer Rest}`
    ? P | ExtractParams<`/${Rest}`>
    : S extends `${infer _Start}:${infer P}`
    ? P
    : never;

/**
 * If route has params, ParamsFor<K> is a Record of required params; otherwise never.
 */
type ParamsFor<K extends RouteKey> = ExtractParams<Routes[K]> extends never ? never : Record<ExtractParams<Routes[K]>, string | number>;

const PARAM_REGEX = /\[([^\]]+)\]|:([A-Za-z0-9_]+)/g;

/**
 * Generate a route by key. If the route template requires params, the second argument is required.
 * The rest-tuple trick enforces compile-time requirement of params.
 */
export function generateRoute<K extends RouteKey>(key: K, ...args: ParamsFor<K> extends never ? [] : [params: ParamsFor<K>]): string {
    const template = ROUTE[key] as string;
    const params = (args[0] ?? {}) as Record<string, string | number | undefined>;

    return template.replace(PARAM_REGEX, (_, p1, p2) => {
        const name = (p1 ?? p2) as string;
        const value = params[name];
        if (value === undefined) {
            throw new Error(`Missing route param "${name}" for template "${template}"`);
        }
        return encodeURIComponent(String(value));
    });
}

/* Convenience typed helpers */
export const Routes = {
    root: () => ROUTE.root,
    dashboard: () => ROUTE.dashboard,
    users: () => ROUTE.users,
    user: (id?: string | number) => (typeof id === "undefined" ? ROUTE.user : generateRoute("user", { id })),
    userEdit: (id: string | number) => generateRoute("userEdit", { id }),
    posts: () => ROUTE.posts,
    post: (id?: string | number) => (typeof id === "undefined" ? ROUTE.post : generateRoute("post", { id })),
    settings: () => ROUTE.settings,
    settingsSection: (section?: string) => (typeof section === "undefined" ? ROUTE.settingsSection : generateRoute("settingsSection", { section })),
};
