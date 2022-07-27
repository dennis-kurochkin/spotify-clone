import Head from 'next/head'
import AuthForm from '~/components/AuthForm'
import { usePageTitle } from '~/hooks/usePageTitle'

const SignIn = () => {
  const pageTitle = usePageTitle('Sign In', false)

  return (
    <>
      <Head>
        <title>
          {pageTitle}
        </title>
      </Head>
      <AuthForm mode={'signin'} />
    </>
  )
}

SignIn.disableLayout = true

export default SignIn
