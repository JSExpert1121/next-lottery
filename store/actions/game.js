import { GAME_PLAY_STATUS } from '../action-types';

export const setGameStatus = (status) => ({
    type: GAME_PLAY_STATUS,
    payload: status
});

