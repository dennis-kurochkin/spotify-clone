import Head from 'next/head'
import AuthForm from '../components/AuthForm'

const SignIn = () => {
  return (
    <>
      <Head>
        <title>Sbotify - Sign In</title>
        <meta
          name="description"
          content="Sbotify - the official Spotify clone"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <AuthForm mode="signin" />
    </>
  )
}

SignIn.disableLayout = true

export default SignIn
