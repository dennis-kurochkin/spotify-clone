import { Song } from '@prisma/client'

export type SongSerialized = Omit<Song, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export const serializeSong = (song: Song): SongSerialized => ({
  ...song,
  createdAt: song.createdAt.toJSON(),
  updatedAt: song.updatedAt.toJSON(),
})
