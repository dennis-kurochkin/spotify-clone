import Head from 'next/head'
import AuthForm from '../components/AuthForm'

const SignIn = () => {
  return (
    <>
      <Head>
        <title>Sbotify - Sign In</title>
      </Head>
      <AuthForm mode={'signin'} />
    </>
  )
}

SignIn.disableLayout = true

export default SignIn
