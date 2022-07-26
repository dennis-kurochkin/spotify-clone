import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SongSerialized } from '../../prisma/types.schema'

interface PlayerSliceState {
  activeSong: SongSerialized | null
  activeSongs: SongSerialized[]
}

const playerSliceInitialState: PlayerSliceState = {
  activeSong: null,
  activeSongs: [],

}
export const playerSlice = createSlice({
  name: 'player',
  initialState: playerSliceInitialState,
  reducers: {
    setActiveSong(state, action: PayloadAction<SongSerialized | null>) {
      state.activeSong = action.payload
    },
    setActiveSongs(state, action: PayloadAction<SongSerialized[]>) {
      state.activeSongs = action.payload
    },
  },
})
