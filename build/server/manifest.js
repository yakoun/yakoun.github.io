const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.BZ2hwg5u.js","app":"_app/immutable/entry/app.DCKFgOSJ.js","imports":["_app/immutable/entry/start.BZ2hwg5u.js","_app/immutable/chunks/entry.BDt4TV8F.js","_app/immutable/chunks/scheduler.CBX-haTb.js","_app/immutable/chunks/index.DqM2h4X3.js","_app/immutable/entry/app.DCKFgOSJ.js","_app/immutable/chunks/preload-helper.C1FmrZbK.js","_app/immutable/chunks/scheduler.CBX-haTb.js","_app/immutable/chunks/index.jAVpQWDh.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-pMn0M1ld.js')),
			__memo(() => import('./chunks/1-CX81I43t.js')),
			__memo(() => import('./chunks/2-CnOqkbqJ.js')),
			__memo(() => import('./chunks/3-C0NmeWMX.js')),
			__memo(() => import('./chunks/4-DdMhm9ei.js')),
			__memo(() => import('./chunks/5-CrElqd1M.js')),
			__memo(() => import('./chunks/6-DKBr9Dgt.js')),
			__memo(() => import('./chunks/7-DnNG5R8l.js')),
			__memo(() => import('./chunks/8-J3WHqGQC.js')),
			__memo(() => import('./chunks/9-B9i2Gwcn.js')),
			__memo(() => import('./chunks/10-BFKQ_hOt.js')),
			__memo(() => import('./chunks/11-BsbqbfZA.js')),
			__memo(() => import('./chunks/12-0f6WXFCM.js')),
			__memo(() => import('./chunks/13-Dyl10hzo.js')),
			__memo(() => import('./chunks/14-45zQjFV_.js')),
			__memo(() => import('./chunks/15-B2wGfS6P.js')),
			__memo(() => import('./chunks/16-D0lUbvzD.js')),
			__memo(() => import('./chunks/17-BQkNiOyQ.js')),
			__memo(() => import('./chunks/18-CsFxHixT.js')),
			__memo(() => import('./chunks/19-BmCk75bb.js')),
			__memo(() => import('./chunks/20-Cy2bN8kS.js')),
			__memo(() => import('./chunks/21-BPqyaLDW.js')),
			__memo(() => import('./chunks/22-B8-Vpfnn.js')),
			__memo(() => import('./chunks/23-Wb1txKkn.js')),
			__memo(() => import('./chunks/24-B8a2QxYb.js')),
			__memo(() => import('./chunks/25-BwV8Ho9R.js')),
			__memo(() => import('./chunks/26-r0Ws13Ww.js'))
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(app)/a-propos",
				pattern: /^\/a-propos\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/(dashboard)",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/certifications",
				pattern: /^\/admin\/certifications\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/education",
				pattern: /^\/admin\/education\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/experiences",
				pattern: /^\/admin\/experiences\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/gallery",
				pattern: /^\/admin\/gallery\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/hobbies",
				pattern: /^\/admin\/hobbies\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/languages",
				pattern: /^\/admin\/languages\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/messages",
				pattern: /^\/admin\/messages\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admin/profil",
				pattern: /^\/admin\/profil\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/admin/projects",
				pattern: /^\/admin\/projects\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/admin/projects/new",
				pattern: /^\/admin\/projects\/new\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/admin/projects/[id]",
				pattern: /^\/admin\/projects\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/admin/services",
				pattern: /^\/admin\/services\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/admin/skills",
				pattern: /^\/admin\/skills\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/admin/software",
				pattern: /^\/admin\/software\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/api/github-sync",
				pattern: /^\/api\/github-sync\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BVQgyao5.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Fye8Wjx6.js'))
			},
			{
				id: "/auth/callback",
				pattern: /^\/auth\/callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/(app)/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(app)/projets",
				pattern: /^\/projets\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/projets/[slug]",
				pattern: /^\/projets\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Dp--4mPZ.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
