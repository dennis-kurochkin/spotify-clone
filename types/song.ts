import { Artist, Song } from '@prisma/client'

export type SongSerialized = Omit<Song, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type SongWithArtist = Song & { artist: Pick<Artist, 'id' | 'name'> }

export type SongWithArtistSerialized = SongSerialized & { artist: Pick<Artist, 'id' | 'name'> }
