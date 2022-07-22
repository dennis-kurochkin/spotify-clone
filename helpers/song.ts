import { differenceInDays, format, formatDistance, intervalToDuration } from 'date-fns'

export const getFormattedSongDate = (createdAt: Date): string => {
  const today = new Date()
  const difference = differenceInDays(createdAt, today)

  return difference <= -30 ? format(createdAt, 'LLL d, yyyy') : `${formatDistance(createdAt, today)} ago`
}

export const getFormattedSongDuration = (duration: number): string => {
  const intervalDuration = intervalToDuration({ start: 0, end: duration * 1000 })

  return `${intervalDuration.minutes}:${((intervalDuration.seconds ?? 0) * 10).toString().slice(0, 2)}`
}
