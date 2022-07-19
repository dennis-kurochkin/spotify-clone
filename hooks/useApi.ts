import useSWR from 'swr'
import { Playlist, User } from '@prisma/client'
import fetcherSWR from '../lib/fetcher'

type SWRHookReturnValue = {
  isError?: unknown
  isLoading: boolean
}

export const useApiMe = (): SWRHookReturnValue & { user?: User } => {
  const { data, error } = useSWR<User>('/me', fetcherSWR)

  return {
    user: data,
    isError: error,
    isLoading: !data && !error,
  }
}

export const useApiPlaylists = (): SWRHookReturnValue & { playlists: Playlist[] } => {
  const { data, error } = useSWR<Playlist[]>('/playlist', fetcherSWR)

  return {
    playlists: data ?? [],
    isError: error,
    isLoading: !data && !error,
  }
}

export const useApiPlaylist = (id: number): SWRHookReturnValue& { playlist?: Playlist } => {
  const { data, error } = useSWR<Playlist>(`/playlist/${id}`, fetcherSWR)

  return {
    playlist: data,
    isError: error,
    isLoading: !data && !error,
  }
}
