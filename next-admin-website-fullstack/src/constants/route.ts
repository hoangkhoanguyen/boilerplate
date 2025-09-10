export const ADMIN_ROUTE = {
    root: "/admin",
    dashboard: "/admin",
    users: "/admin/users",
    user: "/admin/users/[id]",
    userEdit: "/admin/users/[id]/edit",
    posts: "/admin/posts",
    post: "/admin/posts/[id]",
    settings: "/admin/settings",
    settingsSection: "/admin/settings/[section]",
} as const;

export const WEB_ROUTE = {
    root: "/",
    home: "/",
    about: "/about",
    login: "/login",
    signup: "/signup",
    profile: "/profile",
    profileUser: "/profile/[id]",
    posts: "/posts",
    post: "/posts/[slug]",
    contact: "/contact",
} as const;

export const ROUTES = {
    admin: ADMIN_ROUTE,
    web: WEB_ROUTE,
} as const;

type Routes = typeof ROUTES;
type Namespace = keyof Routes;

/** reuseable helper to extract params from template strings */
type ExtractParams<S extends string> = S extends `${infer _Start}[${infer P}]${infer Rest}`
    ? P | ExtractParams<Rest>
    : S extends `${infer _Start}:${infer P}/${infer Rest}`
    ? P | ExtractParams<`/${Rest}`>
    : S extends `${infer _Start}:${infer P}`
    ? P
    : never;

type TemplateOf<N extends Namespace, K extends keyof Routes[N]> = Routes[N][K] extends string ? Routes[N][K] : never;
type ParamsForRoute<N extends Namespace, K extends keyof Routes[N]> = ExtractParams<TemplateOf<N, K>> extends never
    ? never
    : Record<ExtractParams<TemplateOf<N, K>>, string | number>;

const PARAM_REGEX = /\[([^\]]+)\]|:([A-Za-z0-9_]+)/g;

/**
 * Generic generator for any namespace+key.
 * If route requires params, the third argument is required (enforced by types).
 */
export function generateRoute<N extends Namespace, K extends keyof Routes[N]>(
    namespace: N,
    key: K,
    ...args: ParamsForRoute<N, K> extends never ? [] : [params: ParamsForRoute<N, K>]
): string {
    const template = ROUTES[namespace][key] as string;
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

/* Convenience, typed helpers that reuse generateRoute */
export const adminRoutes = {
    root: () => ADMIN_ROUTE.root,
    dashboard: () => ADMIN_ROUTE.dashboard,
    users: () => ADMIN_ROUTE.users,
    user: (id?: string | number) => (typeof id === "undefined" ? ADMIN_ROUTE.user : generateRoute("admin", "user", { id })),
    userEdit: (id: string | number) => generateRoute("admin", "userEdit", { id }),
    posts: () => ADMIN_ROUTE.posts,
    post: (id?: string | number) => (typeof id === "undefined" ? ADMIN_ROUTE.post : generateRoute("admin", "post", { id })),
    settings: () => ADMIN_ROUTE.settings,
    settingsSection: (section?: string) =>
        typeof section === "undefined" ? ADMIN_ROUTE.settingsSection : generateRoute("admin", "settingsSection", { section }),
};

export const webRoutes = {
    root: () => WEB_ROUTE.root,
    home: () => WEB_ROUTE.home,
    about: () => WEB_ROUTE.about,
    login: () => WEB_ROUTE.login,
    signup: () => WEB_ROUTE.signup,
    profile: (id?: string | number) => (typeof id === "undefined" ? WEB_ROUTE.profile : generateRoute("web", "profileUser", { id })),
    profileUser: (id?: string | number) => (typeof id === "undefined" ? WEB_ROUTE.profileUser : generateRoute("web", "profileUser", { id })),
    posts: () => WEB_ROUTE.posts,
    post: (slug?: string) => (typeof slug === "undefined" ? WEB_ROUTE.post : generateRoute("web", "post", { slug })),
    contact: () => WEB_ROUTE.contact,
};
