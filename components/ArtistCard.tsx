import { Box, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/react'
import { MdPersonOutline } from 'react-icons/md'
import styles from './ArtistCard.module.scss'

interface ArtistCardProps {
  name: string
  avatarSrc?: string
}

const ArtistCard = ({ name, avatarSrc }: ArtistCardProps) => {
  return (
    <Box
      as={'article'}
      className={styles.card}
    >
      <Avatar
        src={avatarSrc}
        icon={<MdPersonOutline size={'24px'} />}
        sx={{
          width: '100%',
          height: 'auto',
        }}
        boxShadow={'dark-lg'}
      />
      <Text
        as={'h3'}
        className={styles.name}
      >
        {name}
      </Text>
      <Text className={styles.caption}>
        Artist
      </Text>
    </Box>
  )
}

export default ArtistCard
