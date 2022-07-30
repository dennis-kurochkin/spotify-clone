import { Box, Divider, Link, Text } from '@chakra-ui/layout'

import { BsGithub } from 'react-icons/bs'
import { PERSONAL_WEBSITE_LINK, PROJECT_GITHUB_LINK } from '~/constants'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <Box
      as={'footer'}
      sx={{
        padding: '56px 32px 48px',
        backgroundColor: 'var(--colors-background-500)',
      }}
    >
      <Divider marginBottom={'32px'} />
      <Box className={styles.row}>
        <Box className={styles.linksColumn}>
          <Link
            href={PROJECT_GITHUB_LINK}
            className={styles.iconLink}
            isExternal
          >
            <BsGithub fontSize={'20px'} />
            GitHub Repo
          </Link>
          •
          <Text textAlign={'center'}>
            Made with passion 🏃 by
            {' '}
            <Link
              href={PERSONAL_WEBSITE_LINK}
              className={styles.underlinedLink}
              sx={{
                textDecoration: 'underline',
              }}
              isExternal
            >
              Dennis Kurochkin
            </Link>
          </Text>
        </Box>
        <Text textAlign={'right'}>
          © 2022 Sbotify
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
