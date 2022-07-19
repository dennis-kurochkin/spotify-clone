import { ReactNode } from 'react'
import { Box, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/react'
import { MdLibraryMusic, MdPersonOutline } from 'react-icons/md'

import styles from './GradientPage.module.scss'

interface BackgroundGradient {
  start: string
  end: string
}

interface Props {
  title: string
  subtitle: string
  avatarSrc?: string
  isAvatarSquare?: boolean
  headerGradient: BackgroundGradient
  contentGradient: Omit<BackgroundGradient, 'end'>
  children: ReactNode
}

const GradientPage = ({
  title, subtitle, avatarSrc, isAvatarSquare = false, headerGradient, contentGradient, children,
}: Props) => {
  const getTitleFontSize = (): string | undefined => {
    if (title.length < 15) {
      return undefined
    }

    if (title.length < 20) {
      return '80px'
    }

    if (title.length < 25) {
      return '70px'
    }

    return '60px'
  }

  return (
    <Box className={styles.page}>
      <Box
        as={'header'}
        background={`linear-gradient(120deg, ${headerGradient.start}, ${headerGradient.end})`}
        className={styles.header}
      >
        <Avatar
          src={avatarSrc}
          width={{
            base: '192px',
            lg: '232px',
          }}
          height={{
            base: '192px',
            lg: '232px',
          }}
          boxShadow={'2xl'}
          icon={isAvatarSquare ? <MdLibraryMusic size={'6em'} /> : <MdPersonOutline size={'6em'} />}
          style={isAvatarSquare ? { borderRadius: 0 } : {}}
        />
        <Box className={styles.headerContent}>
          <Text className={styles.subtitle}>
            {subtitle}
          </Text>
          <Text
            className={styles.title}
            sx={{
              fontSize: getTitleFontSize(),
            }}
          >
            {title}
          </Text>
        </Box>
      </Box>
      <Box
        as={'section'}
        className={styles.content}
        background={`linear-gradient(${contentGradient.start} 0%, var(--colors-background-700) 50%)`}
      >
        {children}
      </Box>
    </Box>
  )
}

export default GradientPage
