import Head from 'next/head'
import AuthForm from '../components/AuthForm'

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Sbotify - Sign Up</title>
        <meta
          name="description"
          content="Sbotify - the official Spotify clone"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <AuthForm mode="signup" />
    </>
  )
}

SignUp.disableLayout = true

export default SignUp
