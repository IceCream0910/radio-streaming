import { atom } from 'recoil';
import { localStorageEffect } from "./localStorage";

const playerData = atom({
    key: 'playerData',
    default: [],
});

const favoritesData = atom({
    key: 'favoritesData',
    default: [],
    effects: [localStorageEffect("favoritesData")],
});

export { playerData, favoritesData };