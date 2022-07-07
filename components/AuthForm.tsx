import { useRouter } from 'next/router'
import { Box, Divider, Link } from '@chakra-ui/layout'
import { FC, useState } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
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
      </Box>
    </Box>
  )
}

export default AuthForm
