import { writable } from 'svelte/store';

export const currentCountry = writable();

export const playing = writable(true)