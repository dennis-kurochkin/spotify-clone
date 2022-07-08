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
          <Text className={styles.formTitle}>To continue, login to Sbotify.</Text>
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
                placeholder="Email address"
                type="email"
                size="lg"
                borderColor="gray.500"
                _placeholder={{ fontSize: 'md' }}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
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
                placeholder="Password"
                type="password"
                size="lg"
                borderColor="gray.500"
                _placeholder={{ fontSize: 'md' }}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              />
            </Box>
          </Box>
          <Button
            type="submit"
            size="lg"
            colorScheme="green"
            color="black"
          >
            Sign In
          </Button>
          <Divider />
          <Button
            type="submit"
            size="lg"
            colorScheme="green"
            color="black"
          >
            Sign Up For Sbotify
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthForm
