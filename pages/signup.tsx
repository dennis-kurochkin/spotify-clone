import Head from 'next/head'
import AuthForm from '~/components/AuthForm'
import { usePageTitle } from '~/hooks/usePageTitle'

const SignUp = () => {
  const pageTitle = usePageTitle('Sign Up', false)

  return (
    <>
      <Head>
        <title>
          {pageTitle}
        </title>
      </Head>
      <AuthForm mode={'signup'} />
    </>
  )
}

SignUp.disableLayout = true

export default SignUp
