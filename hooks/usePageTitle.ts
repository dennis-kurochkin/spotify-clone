import { useAppSelector } from '~/hooks/useStore'

export const usePageTitle = (title: string, isSongNameForced = true) => {
  const { isPlaying, activeSong } = useAppSelector((state) => state.player)

  return `Sbotify - ${(isPlaying && activeSong?.name && isSongNameForced) ? activeSong.name : title}`
}
