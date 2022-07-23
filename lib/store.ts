import { action, Action, createStore } from 'easy-peasy'
import { Song } from '@prisma/client'

interface StoreModel {
  activeSongs: Song[]
  activeSong: Song | null
  changeActiveSongs: Action<StoreModel, Song[]>
  changeActiveSong: Action<StoreModel, Song | null>
}

export const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload
  }),
})
