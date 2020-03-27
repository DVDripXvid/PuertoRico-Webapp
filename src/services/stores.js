import { writable } from 'svelte/store';

export const sessionStore = writable({});

export const lobbyGameStore = writable([]);

export const inProgressGameStore = writable([]);

export const availableActionTypeStore = writable({});
