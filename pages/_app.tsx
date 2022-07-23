import type { AppProps } from 'next/app'
import 'reset-css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ComponentType, FC, ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import PlayerLayout from '~/components/PlayerLayout'
import '../styles/index.css'
import { useRouter } from 'next/router'
import { StoreProvider } from 'easy-peasy'
import { store } from '~/lib/store'

const StoreProviderCasted = StoreProvider as ComponentType<StoreProvider['props'] & { children: ReactNode }>

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
  const router = useRouter()

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
        <StoreProviderCasted store={store}>
          {Component.disableLayout ? (
            <Component {...pageProps} />
          ) : (
            <PlayerLayout>
              {isLoading ? null : <Component {...pageProps} />}
            </PlayerLayout>
          )}
        </StoreProviderCasted>
      </ChakraProvider>
    </>
  )
}

export default MyApp
