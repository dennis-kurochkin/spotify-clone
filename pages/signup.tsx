import Head from 'next/head'
import AuthForm from '../components/AuthForm'

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Sbotify - Sign Up</title>
      </Head>
      <AuthForm mode={'signup'} />
    </>
  )
}

SignUp.disableLayout = true

export default SignUp
