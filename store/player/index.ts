import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Song } from '@prisma/client'

interface PlayerSliceState {
  activeSong: Song | null
  activeSongs: Song[]
}

const playerSliceInitialState: PlayerSliceState = {
  activeSong: null,
  activeSongs: [],

}
export const playerSlice = createSlice({
  name: 'player',
  initialState: playerSliceInitialState,
  reducers: {
    setActiveSong(state, action: PayloadAction<Song | null>) {
      state.activeSong = action.payload
    },
    setActiveSongs(state, action: PayloadAction<Song[]>) {
      state.activeSongs = action.payload
    },
  },
})
