import { IconButton } from '@chakra-ui/react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { useState } from 'react'

const PlayerButton = () => {
  const [isPlaying, setPlaying] = useState(false)

  const handleClick = () => setPlaying(!isPlaying)

  return (
    <IconButton
      size={'lg'}
      aria-label={!isPlaying ? 'Play' : 'Pause'}
      icon={!isPlaying ? (
        <IoIosPlay
          size={'28px'}
          style={{ marginRight: '-3px' }}
        />
      ) : <IoIosPause size={'28px'} />}
      sx={{
        background: 'green.400',
        color: 'var(--colors-background-400)',
        transition: 'background .3s',
        _hover: {
          background: 'green.500',
          transform: 'scale(1.05)',
        },
        _active: {
          transform: 'scale(1)',
        },
      }}
      onClick={handleClick}
    />
  )
}

export default PlayerButton
