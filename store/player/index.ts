import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SongWithArtistSerialized } from '~/types/song'

interface PlayerSliceState {
  isPlaying: boolean
  volume: number
  activeSong: SongWithArtistSerialized | null
  playlistId: number | null
  playlistSongs: SongWithArtistSerialized[]
}

const playerSliceInitialState: PlayerSliceState = {
  isPlaying: false,
  volume: 1,
  activeSong: null,
  playlistId: null,
  playlistSongs: [],

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
    setPlaylist(state, action: PayloadAction<{ playlistId: number, playlistSongs: SongWithArtistSerialized[] }>) {
      state.playlistId = action.payload.playlistId
      state.playlistSongs = action.payload.playlistSongs
    },
  },
})
