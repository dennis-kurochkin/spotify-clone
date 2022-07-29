import { useRouter } from 'next/router'
import { Box, Divider, Text } from '@chakra-ui/layout'
import React, { ChangeEvent, FC, useState } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { authenticate, AuthenticateMode } from '~/lib/mutations'
import { useToast } from '~/hooks/useToast'
import { getApiErrorMessage, logError } from '~/helpers'
import logo from '../public/logo.svg'
import styles from './AuthForm.module.css'

interface Props {
  mode: AuthenticateMode
}

const AuthForm: FC<Props> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isFormSubmitted, setFormSubmitted] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setLoading(true)
    setFormSubmitted(true)

    if (!password || !email) {
      setLoading(false)
      return
    }

    try {
      const response = await authenticate(mode, {
        email,
        password,
      })
      const data = await response.json()

      if (!response.ok) throw data

      toast({
        title: mode === 'signin' ? 'Sign in successful' : 'Account was created',
        status: 'success',
      })

      setTimeout(async () => {
        await router.push('/')
      }, 1000)
    } catch (error) {
      logError(error)
      toast({
        title: getApiErrorMessage(error, `An error occurred during ${mode === 'signin' ? 'signing in' : 'signing up'}`),
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoWrapper}>
        <Box className={styles.logoLink}>
          <Image
            src={logo}
            width={'245px'}
            height={'64px'}
          />
        </Box>
      </Box>
      <Box>
        <Divider sx={{ color: 'var(--colors-gray-400)' }} />
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <Text className={styles.formTitle}>
            {mode === 'signin' ? 'To continue, login to Sbotify.' : 'To continue, create an account for Sbotify.'}
          </Text>
          <Box className={styles.formFields}>
            <FormControl isInvalid={!email && isFormSubmitted}>
              <FormLabel
                className={styles.inputLabel}
                htmlFor={'email'}
              >
                Email address:
              </FormLabel>
              <Input
                value={email}
                disabled={isLoading}
                id={'email'}
                placeholder={'Email address'}
                type={'email'}
                size={'lg'}
                borderColor={'gray.500'}
                errorBorderColor={'red.300'}
                _placeholder={{ fontSize: 'md' }}
                onChange={({ target }: ChangeEvent<HTMLInputElement>) => setEmail(target.value)}
              />
            </FormControl>
            <FormControl isInvalid={!password && isFormSubmitted}>
              <FormLabel
                className={styles.inputLabel}
                htmlFor={'password'}
              >
                Password:
              </FormLabel>
              <Input
                value={password}
                isInvalid={!password && isFormSubmitted}
                disabled={isLoading}
                id={'password'}
                placeholder={'Password'}
                type={'password'}
                size={'lg'}
                borderColor={'gray.500'}
                errorBorderColor={'red.300'}
                _placeholder={{ fontSize: 'md' }}
                onChange={({ target }: ChangeEvent<HTMLInputElement>) => setPassword(target.value)}
              />
            </FormControl>
          </Box>
          <Box className={styles.submitButtonContainer}>
            <Button
              type={'submit'}
              size={'lg'}
              colorScheme={'green'}
              color={'black'}
              width={'100%'}
              isLoading={isLoading}
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </Button>
          </Box>
          <Divider
            sx={{ color: 'var(--colors-gray-400)' }}
            marginY={'32px'}
          />
          <Text className={styles.altText}>
            {mode === 'signin' ? 'Don\'t have an account?' : 'Already have an account?'}
          </Text>
          <NextLink
            href={mode === 'signin' ? '/signup' : '/signin'}
            passHref
          >
            <Button
              as={'a'}
              type={'button'}
              variant={'outline'}
              size={'lg'}
              colorScheme={'black'}
              width={'100%'}
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              {' '}
              For Sbotify
            </Button>
          </NextLink>
        </form>
      </Box>
    </Box>
  )
}

export default AuthForm
