import { Box, Text } from '@chakra-ui/layout'
import { ReactNode } from 'react'
import styles from './ProfileSection.module.scss'

interface ProfileSectionProps {
  title: string
  description?: string
  children: ReactNode
}

const ProfileSection = ({ title, description, children }: ProfileSectionProps) => {
  return (
    <Box as={'section'}>
      <Box
        as={'header'}
        className={styles.header}
      >
        <Text
          className={styles.title}
          as={'h2'}
        >
          {title}
        </Text>
        {!!description && (
          <Text
            className={styles.description}
          >
            {description}
          </Text>
        )}
      </Box>
      {children}
    </Box>
  )
}

export default ProfileSection
