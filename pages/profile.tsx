import type { NextPage } from 'next'
import Head from 'next/head'
import GradientPage from '../components/GradientPage'
import { useApiMe } from '../hooks/useApi'

const Home: NextPage = () => {
  const { user, isLoading } = useApiMe()

  return (
    <>
      <Head>
        <title>Sbotify - Profile</title>
        <meta
          name={'description'}
          content={'Sbotify - the official Spotify clone'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <GradientPage
        title={!!user && !isLoading ? user.name : 'Loading...'}
        subtitle={'Profile'}
        headerGradient={{
          start: '#B7351B',
          end: '#3E140E',
        }}
        contentGradient={{
          start: '#48140B',
        }}
      >
        Content
      </GradientPage>
    </>
  )
}

export default Home
