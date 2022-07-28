import { differenceInDays, format, formatDistance, intervalToDuration } from 'date-fns'
import { SongWithArtist, SongWithArtistSerialized } from '~/types/song'

export const getFormattedSongDate = (createdAt: Date): string => {
  const today = new Date()
  const difference = differenceInDays(createdAt, today)

  return difference <= -30 ? format(createdAt, 'LLL d, yyyy') : `${formatDistance(createdAt, today)} ago`
}

export const getFormattedSongDuration = (duration: number): string => {
  const { minutes, seconds } = intervalToDuration({ start: 0, end: Math.floor(duration) * 1000 })

  return `${minutes}:${(seconds ?? 0) < 10 ? `0${seconds}` : seconds}`
}

export const serializeSongWithArtist = (song: SongWithArtist): SongWithArtistSerialized => ({
  ...song,
  createdAt: song.createdAt.toJSON(),
  updatedAt: song.updatedAt.toJSON(),
})
