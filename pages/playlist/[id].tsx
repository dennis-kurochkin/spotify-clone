import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import GradientPage from '~/components/GradientPage'
import { prismaClient } from '~/lib/prisma'
import { Playlist, User } from '@prisma/client'
import { serverSideSignInRedirect, validateToken } from '~/helpers/auth'
import { AUTH_JWT_COOKIE_NAME } from '~/constants/auth'
import PlayerButton from '~/components/PlayerButton'
import { Box } from '@chakra-ui/layout'
import SongsTable from '~/components/SongsTable'
import { useAppDispatch, useAppSelector } from '~/hooks/useStore'
import { playerSlice } from '~/store/player'
import { SongWithArtist } from '~/types/song'
import { serializeSongWithArtist } from '~/helpers/song'
import { usePageTitle } from '~/hooks/usePageTitle'

interface PlaylistPageProps {
  playlist: Playlist & { songs: SongWithArtist[] }
}

const PlaylistPage = ({ playlist }: PlaylistPageProps) => {
  const dispatch = useAppDispatch()
  const pageTitle = usePageTitle(playlist.name)
  const { isPlaying, playlistId: playingPlaylistId } = useAppSelector((state) => state.player)
  const isPlayingPlaylistSong = isPlaying && playingPlaylistId === playlist.id

  const handlePlay = (song?: SongWithArtist) => {
    const isPlayingValue = !isPlayingPlaylistSong ? true : !isPlaying

    dispatch(playerSlice.actions.setPlaying(song ? true : isPlayingValue))
    dispatch(playerSlice.actions.setActiveSong(serializeSongWithArtist(song ?? playlist.songs[0])))
    dispatch(playerSlice.actions.setPlaylist({
      playlistId: playlist.id,
      playlistSongs: playlist.songs.map(serializeSongWithArtist),
    }))
  }

  return (
    <>
      <Head>
        <title>
          {pageTitle}
        </title>
      </Head>
      <GradientPage
        title={playlist.name}
        subtitle={'Playlist'}
        description={playlist.description}
        stats={[`${playlist.songs.length} songs`]}
        headerGradient={{
          start: '#B7351B',
          end: '#3E140E',
        }}
        contentGradient={{
          start: '#48140B',
        }}
        avatarSrc={playlist.avatar}
        isAvatarSquare
      >
        <PlayerButton
          isPlaying={isPlayingPlaylistSong}
          size={'lg'}
          colorScheme={'green'}
          onTogglePlay={() => handlePlay()}
        />
        <Box
          sx={{
            marginTop: '20px',
          }}
        >
          <SongsTable
            songs={playlist.songs}
            isPlayingPlaylistSong={isPlayingPlaylistSong}
            onSongPlay={handlePlay}
          />
        </Box>
      </GradientPage>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  let user: User

  try {
    user = validateToken(req.cookies[AUTH_JWT_COOKIE_NAME] ?? '')
  } catch (error) {
    return serverSideSignInRedirect()
  }

  const playlist = await prismaClient.playlist.findFirst({
    where: {
      id: +(query.id ?? ''),
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  return {
    props: {
      playlist,
    },
  }
}

export default PlaylistPage
