import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { useState } from 'react'

interface PlayerButtonProps {
  colorScheme: 'green' | 'white'
  size: IconButtonProps['size']
}

const PlayerButton = ({ colorScheme, size }: PlayerButtonProps) => {
  const [isPlaying, setPlaying] = useState(false)

  const handleClick = () => setPlaying(!isPlaying)

  const iconSize: string = size === 'lg' ? '28px' : '24px'

  return (
    <IconButton
      size={size}
      aria-label={!isPlaying ? 'Play' : 'Pause'}
      icon={!isPlaying ? (
        <IoIosPlay
          size={iconSize}
          style={{ marginRight: '-3px' }}
        />
      ) : <IoIosPause size={iconSize} />}
      sx={{
        background: colorScheme === 'green' ? 'green.400' : 'white',
        color: colorScheme === 'green' ? 'var(--colors-background-400)' : 'var(--colors-background-700)',
        transition: 'background .3s',
        _hover: {
          background: colorScheme === 'green' ? 'green.500' : 'white',
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
