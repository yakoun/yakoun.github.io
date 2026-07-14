export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26')
];

export const server_loads = [];

export const dictionary = {
		"/(app)": [4,[2]],
		"/(app)/a-propos": [5,[2]],
		"/admin/(dashboard)": [10,[3]],
		"/admin/certifications": [11,[3]],
		"/admin/education": [12,[3]],
		"/admin/experiences": [13,[3]],
		"/admin/gallery": [14,[3]],
		"/admin/hobbies": [15,[3]],
		"/admin/languages": [16,[3]],
		"/admin/messages": [17,[3]],
		"/admin/profil": [18,[3]],
		"/admin/projects": [19,[3]],
		"/admin/projects/new": [20,[3]],
		"/admin/projects/[id]": [21,[3]],
		"/admin/services": [22,[3]],
		"/admin/settings": [23,[3]],
		"/admin/skills": [24,[3]],
		"/admin/software": [25,[3]],
		"/auth/callback": [26],
		"/(app)/contact": [6,[2]],
		"/(auth)/login": [9],
		"/(app)/projets": [7,[2]],
		"/(app)/projets/[slug]": [8,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';