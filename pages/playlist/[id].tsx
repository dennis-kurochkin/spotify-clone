import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import GradientPage from '~/components/GradientPage'
import { useApiPlaylist } from '~/hooks/useApi'

const Home: NextPage = () => {
  const router = useRouter()
  const { playlist, isLoading } = useApiPlaylist(+(router.query.id ?? ''))

  return (
    <>
      <Head>
        <title>
          Sbotify -&nbsp;
          {isLoading ? 'Loading...' : playlist?.name}
        </title>
      </Head>
      <GradientPage
        title={isLoading ? 'Loading...' : (playlist?.name ?? '')}
        subtitle={'Playlist'}
        headerGradient={{
          start: '#B7351B',
          end: '#3E140E',
        }}
        contentGradient={{
          start: '#48140B',
        }}
        isAvatarSquare
      >
        Content
      </GradientPage>
    </>
  )
}

export default Home
