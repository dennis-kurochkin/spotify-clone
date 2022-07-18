import { ReactNode } from 'react'
import { Box, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/react'
import { MdPersonOutline } from 'react-icons/md'

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
          boxShadow={'lg'}
          icon={<MdPersonOutline size={'6em'} />}
          style={isAvatarSquare ? { borderRadius: 0 } : {}}
        />
        <Box className={styles.headerContent}>
          <Text className={styles.subtitle}>
            {subtitle}
          </Text>
          <Text className={styles.title}>
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
