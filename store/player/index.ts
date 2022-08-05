import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SongWithArtistSerialized } from '~/types/song'

interface PlayerSliceState {
  isPlaying: boolean
  volume: number
  activeSong: SongWithArtistSerialized | null
  activeSongs: SongWithArtistSerialized[]
}

const playerSliceInitialState: PlayerSliceState = {
  isPlaying: false,
  volume: 1,
  activeSong: null,
  activeSongs: [],

}
export const playerSlice = createSlice({
  name: 'player',
  initialState: playerSliceInitialState,
  reducers: {
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload
    },
    setActiveSong(state, action: PayloadAction<SongWithArtistSerialized | null>) {
      state.activeSong = action.payload
    },
    setActiveSongs(state, action: PayloadAction<SongWithArtistSerialized[]>) {
      state.activeSongs = action.payload
    },
  },
})
