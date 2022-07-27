import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { playerSlice } from '~/store/player'

const rootReducer = combineReducers({
  player: playerSlice.reducer,
})

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      player: {
        activeSong: action.payload.player.activeSong,
        activeSongs: action.payload.player.activeSongs,
      },
    }
  }

  return rootReducer(state, action)
}

const makeStore = () => {
  return configureStore({
    reducer: masterReducer,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const reduxWrapper = createWrapper<AppStore>(makeStore)
