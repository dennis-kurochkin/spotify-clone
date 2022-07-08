import { useRouter } from 'next/router'
import {
  Box, Divider, Link, Text,
} from '@chakra-ui/layout'
import { ChangeEvent, FC, useState } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { Button, Input } from '@chakra-ui/react'
import { AuthenticateMode } from '../lib/mutations'
import logo from '../public/logo.svg'
import styles from './AuthForm.module.css'

interface Props {
  mode: AuthenticateMode
}

const AuthForm: FC<Props> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((resolve) => { setTimeout(resolve, 1000) })
    setLoading(false)

    await router.push('/')
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoWrapper}>
        <NextLink
          href="/"
          passHref
        >
          <Link className={styles.logoLink}>
            <Image
              src={logo}
              width="245px"
              height="64px"
            />
          </Link>
        </NextLink>
      </Box>
      <Box>
        <Divider sx={{ color: 'var(--colors-gray-400)' }} />
        <Box className={styles.form}>
          <Text className={styles.formTitle}>
            {mode === 'signin' ? 'To continue, login to Sbotify.' : 'To continue, create and account for Sbotify.'}
          </Text>
          <Box className={styles.formFields}>
            <Box>
              <Text
                className={styles.inputLabel}
                as="label"
              >
                Email address:
              </Text>
              <Input
                value={email}
                disabled={isLoading}
                placeholder="Email address"
                type="email"
                size="lg"
                borderColor="gray.500"
                _placeholder={{ fontSize: 'md' }}
                onChange={({ target }: ChangeEvent<HTMLInputElement>) => setEmail(target.value)}
              />
            </Box>
            <Box>
              <Text
                className={styles.inputLabel}
                as="label"
              >
                Password:
              </Text>
              <Input
                value={password}
                disabled={isLoading}
                placeholder="Password"
                type="password"
                size="lg"
                borderColor="gray.500"
                _placeholder={{ fontSize: 'md' }}
                onChange={({ target }: ChangeEvent<HTMLInputElement>) => setPassword(target.value)}
              />
            </Box>
          </Box>
          <Box className={styles.submitButtonContainer}>
            <Button
              type="submit"
              size="lg"
              colorScheme="green"
              color="black"
              width="100%"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </Button>
          </Box>
          <Divider
            sx={{ color: 'var(--colors-gray-400)' }}
            marginY="32px"
          />
          <Text className={styles.altText}>
            {mode === 'signin' ? 'Don\'t have an account?' : 'Already have an account?'}
          </Text>
          <NextLink
            href={mode === 'signin' ? '/signup' : '/signin'}
            passHref
          >
            <Button
              as="a"
              variant="outline"
              size="lg"
              colorScheme="black"
              width="100%"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              {' '}
              For Sbotify
            </Button>
          </NextLink>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthForm
