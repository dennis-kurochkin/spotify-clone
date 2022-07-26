import { Box, Text } from '@chakra-ui/layout'
import styles from '~/components/PlayerActions.module.scss'
import PlayerButton from '~/components/PlayerButton'
import { TbArrowsShuffle, TbRepeatOff } from 'react-icons/tb'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { CSSObject,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack } from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import { useAppSelector } from '~/hooks/useStore'
import { MutableRefObject, useRef } from 'react'
import { SongSerialized } from '../prisma/types.schema'

const getActionIconButtonStyles = (isActive?: boolean): CSSObject => ({
  display: 'flex',
  justifyContent: 'center',
  color: isActive ? 'green.700' : 'var(--colors-gray-400)',
  minWidth: '32px',
  height: '32px',
  _hover: {
    color: isActive ? 'green.500' : 'var(--colors-white)',
  },
})

const PlayerActions = () => {
  const howler: MutableRefObject<ReactHowler | null> = useRef(null)
  const activeSong: SongSerialized | null = useAppSelector((state) => state.player.activeSong)

  return (
    <Box>
      {!!activeSong && (
        <ReactHowler
          ref={howler}
          src={activeSong.url ?? ''}
          playing={false}
        />
      )}
      <Box className={styles.actionsRow}>
        <IconButton
          variant={'unstyled'}
          sx={getActionIconButtonStyles(true)}
          fontSize={'20px'}
          aria-label={'Toggle shuffle'}
          icon={<TbArrowsShuffle />}
        />
        <IconButton
          variant={'unstyled'}
          sx={getActionIconButtonStyles()}
          fontSize={'28px'}
          aria-label={'Play previous'}
          icon={<MdSkipPrevious />}
        />
        <PlayerButton
          size={'sm'}
          colorScheme={'white'}
          className={styles.playerButton}
        />
        <IconButton
          variant={'unstyled'}
          sx={getActionIconButtonStyles()}
          fontSize={'28px'}
          aria-label={'Play next'}
          icon={<MdSkipNext />}
        />
        <IconButton
          variant={'unstyled'}
          sx={getActionIconButtonStyles()}
          fontSize={'20px'}
          aria-label={'Toggle repeat'}
          icon={<TbRepeatOff />}
        />
      </Box>
      <Box className={styles.sliderRow}>
        <Text className={styles.timeCaption}>
          1:34
        </Text>
        <RangeSlider
          role={'group'}
          min={0}
          max={100}
          step={0.1}
          defaultValue={[0]/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
          aria-label={['Thumb']}
          sx={{ position: 'relative' }}
          _before={{
            content: '""',
            position: 'absolute',
            left: '-10px',
            top: '-14px',
            width: 'calc(100% + 20px)',
            height: 'calc(100% + 28px)',
          }}
        >
          <RangeSliderTrack sx={{ background: 'var(--colors-gray-500)' }}>
            <RangeSliderFilledTrack
              sx={{ background: 'var(--colors-white)' }}
              _groupHover={{ background: 'var(--chakra-colors-green-700)' }}
            />
          </RangeSliderTrack>
          <RangeSliderThumb
            index={0}
            sx={{
              opacity: '0',
              width: '12px',
              height: '12px',
              _active: {
                opacity: 1,
              },
            }}
            _groupHover={{ opacity: '1' }}
          />
        </RangeSlider>
        <Text className={styles.timeCaption}>
          3:40
        </Text>
      </Box>
    </Box>
  )
}

export default PlayerActions
