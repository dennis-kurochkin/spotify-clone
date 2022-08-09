import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { playerSlice } from '~/store/player'

const combinedReducer = combineReducers({
  player: playerSlice.reducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      player: {
        activeSong: action.payload.player.activeSong,
        playlistId: action.payload.player.playlistSongs,
        playlistSongs: action.payload.player.playlistSongs,
      },
    }
  }

  if (action.type === 'RESET') {
    state = undefined
  }

  return combinedReducer(state, action)
}

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<typeof combinedReducer>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const reduxWrapper = createWrapper<AppStore>(makeStore)
