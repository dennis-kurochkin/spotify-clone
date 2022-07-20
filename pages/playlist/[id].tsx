import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import GradientPage from '~/components/GradientPage'
import { prismaClient } from '~/lib/prisma'
import { Playlist } from '@prisma/client'

const PlaylistPage = ({ playlist }: { playlist: Playlist }) => {
  return (
    <>
      <Head>
        <title>
          Sbotify -
          {' '}
          {playlist.name}
        </title>
      </Head>
      <GradientPage
        title={playlist.name}
        subtitle={'Playlist'}
        description={playlist.description}
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
        Content
      </GradientPage>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const playlist = await prismaClient.playlist.findUnique({
    where: {
      id: +(query.id ?? ''),
    },
  })

  return {
    props: {
      playlist,
    },
  }
}

export default PlaylistPage
