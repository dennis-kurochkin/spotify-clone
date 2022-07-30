import { useAppSelector } from '~/hooks/useStore'

export const usePageTitle = (title: string, isSongNameForced = true) => {
  const { isPlaying, activeSong } = useAppSelector((state) => state.player)
  const isDisplayingSongMeta: boolean = !!(isPlaying && activeSong?.name && isSongNameForced)

  return `${isDisplayingSongMeta ? `${activeSong?.name} • ${activeSong?.artist.name}` : title} - Sbotify`
}
