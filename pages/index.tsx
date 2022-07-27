import type { NextPage } from 'next'
import Head from 'next/head'
import { usePageTitle } from '~/hooks/usePageTitle'

const Home: NextPage = () => {
  const pageTitle = usePageTitle('Homepage')

  return (
    <>
      <Head>
        <title>
          {pageTitle}
        </title>
      </Head>
      homepage
    </>
  )
}

export default Home
