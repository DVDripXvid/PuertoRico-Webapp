import { writable, derived } from 'svelte/store';

export const sessionStore = writable({});

export const lobbyGameStore = writable([]);

export const inProgressGameStore = writable([]);

export const availableActionTypeStore = writable({});

export const currentGameStore = derived([sessionStore, inProgressGameStore], ([$sessionStore, $inProgressGameStore]) =>
    $sessionStore.currentGame
        ? $inProgressGameStore.find(g => g.id === $sessionStore.currentGame) || {}
        : {}
);

export const currentActionStore = derived([sessionStore, availableActionTypeStore], ([$sessionStore, $availableActionTypeStore]) =>
    $sessionStore.currentGame
        ? $availableActionTypeStore[$sessionStore.currentGame] || []
        : []
);

export const signedInPlayerStore = derived([sessionStore, currentGameStore], ([$sessionStore, $currentGameStore]) => {
    const currentRole = $currentGameStore.currentRole;
    const player = $currentGameStore.players && $sessionStore.id
        ? $currentGameStore.players.find(p => p.userId === $sessionStore.id)
        : {};
    return {
        ...player,
        hasPrivilege: currentRole && player.role && currentRole.name === player.role.name
    };
});
