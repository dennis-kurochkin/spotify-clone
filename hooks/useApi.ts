import useSWR from 'swr'
import fetcher from '../lib/fetcher'

export const useApiMe = () => {
  const { data, error } = useSWR('/me', fetcher)

  return {
    user: data ?? [],
    error,
    isLoading: !data && !error,
  }
}

export const useApiPlaylists = () => {
  const { data, error } = useSWR('/playlist', fetcher)

  return {
    playlists: data ?? [],
    error,
    isLoading: !data && !error,
  }
}
