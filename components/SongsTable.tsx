import { Box, Text } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { BiTime } from 'react-icons/bi'
import { getFormattedSongDate, getFormattedSongDuration } from '~/helpers/song'
import { SongWithArtist } from '~/types/song'
import { useAppSelector } from '~/hooks/useStore'
import cx from 'classnames'
import styles from './SongsTable.module.scss'

interface SongsTableProps {
  songs: SongWithArtist[]
  isPlayingPlaylistSong: boolean
  onSongPlay: (song: SongWithArtist) => void
}

const SongsTable = ({ songs, isPlayingPlaylistSong, onSongPlay }: SongsTableProps) => {
  const { activeSong } = useAppSelector((state) => state.player)

  return (
    <Box>
      <Table
        variant={'unstyled'}
        size={'sm'}
      >
        <Thead className={styles.tableHead}>
          <Tr
            sx={{
              borderBottom: '1px solid',
              borderColor: 'gray.800',
            }}
          >
            <Th
              sx={{
                width: '40px',
                textAlign: 'right',
              }}
            >
              #
            </Th>
            <Th>
              Title
            </Th>
            <Th>
              Date added
            </Th>
            <Th>
              <BiTime
                size={'18px'}
                style={{ marginBottom: '-4px' }}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody className={styles.tableBody}>
          <Tr aria-hidden>
            <Td
              colSpan={4}
              paddingY={'8px'}
              aria-hidden
            />
          </Tr>
          {songs.map((song, index) => (
            <Tr
              key={song.id}
              className={cx(
                styles.songRow,
                (activeSong?.id === song.id && isPlayingPlaylistSong) && styles.songRowActive
              )}
              onClick={() => onSongPlay(song)}
            >
              <Td>
                {index + 1}
              </Td>
              <Td>
                <Text>
                  {song.name}
                </Text>
                <Text>
                  {song.artist.name}
                </Text>
              </Td>
              <Td>
                {getFormattedSongDate(song.createdAt)}
              </Td>
              <Td>
                {getFormattedSongDuration(song.duration)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default SongsTable
