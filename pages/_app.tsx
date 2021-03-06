import type { AppProps } from 'next/app'
import 'reset-css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import PlayerLayout from '~/components/PlayerLayout'
import '../styles/index.css'
import { reduxWrapper } from '~/store'
import { SWRConfig } from 'swr'
import useLogout from '~/hooks/useLogout'
import { useRouter } from 'next/router'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    green: {
      400: '#1CDF63',
      500: '#1ed760',
      600: '#1CDF63',
      700: '#13ac48',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '500px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: 'bold',
      },
      variants: {
        link: {
          ':focus': {
            boxShadow: 'none',
          },
        },
      },
      sizes: {
        lg: {
          fontSize: 'sm',
          height: '48px',
        },
      },
    },
  },
})

interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & { disableLayout?: boolean }
}

const MyApp: FC<CustomAppProps> = ({ Component, pageProps }) => {
  const [isLoading, setLoading] = useState(false)
  const logout = useLogout()
  const router = useRouter()

  const handleSWRError = async (response: Response) => {
    if (response.status === 403 || response.status === 401) {
      await logout()
    }
  }

  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => setLoading(false)

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)

    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>Sbotify - Loading...</title>
        <meta
          name={'description'}
          content={'Sbotify - the official Spotify clone'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <ChakraProvider theme={theme}>
        <SWRConfig
          value={{ onError: handleSWRError }}
        >
          {Component.disableLayout ? (
            <Component {...pageProps} />
          ) : (
            <PlayerLayout isLoading={isLoading}>
              {isLoading ? null : <Component {...pageProps} />}
            </PlayerLayout>
          )}
        </SWRConfig>
      </ChakraProvider>
    </>
  )
}

export default reduxWrapper.withRedux(MyApp)
