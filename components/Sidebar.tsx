import { Box, Divider, LinkBox, LinkOverlay, List, ListIcon, ListItem, Stack } from '@chakra-ui/layout'
import Image from 'next/image'
import NextLink from 'next/link'
import { MdAdd, MdFavorite, MdHomeFilled, MdOutlineLibraryMusic, MdSearch } from 'react-icons/md'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons'
import { Skeleton } from '@chakra-ui/react'
import { useApiPlaylists } from '~/hooks/useApi'
import logo from '~/public/logo.svg'
import { FiVolume2 } from 'react-icons/fi'
import { useAppSelector } from '~/hooks/useStore'
import styles from './Sidebar.module.css'

interface NavigationMenuItem {
  title: string
  icon: IconType
  route: string
}

const navigationMenuData: NavigationMenuItem[] = [
  {
    title: 'Home',
    icon: MdHomeFilled,
    route: '/',
  },
  {
    title: 'Search',
    icon: MdSearch,
    route: '#',
  },
  {
    title: 'Your Library',
    icon: MdOutlineLibraryMusic,
    route: '#',
  },
]

const Sidebar = () => {
  const { pathname, asPath } = useRouter()
  const { playlists, isLoading: isPlaylistsLoading } = useApiPlaylists()
  const { playlistId, isPlaying } = useAppSelector((state) => state.player)

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.logo}>
        <NextLink
          href={'/'}
          passHref
        >
          <LinkOverlay>
            <Image
              src={logo}
              width={'178px'}
              height={'46px'}
            />
          </LinkOverlay>
        </NextLink>
      </Box>
      <nav>
        <List marginBottom={'24px'}>
          {navigationMenuData.map(({ title, route, icon }) => (
            <ListItem key={title}>
              <LinkBox>
                <NextLink
                  href={route}
                  passHref
                >
                  <LinkOverlay
                    className={cx(styles.menuLink, pathname === route && styles.menuLinkCurrent)}
                  >
                    <ListIcon
                      as={icon}
                      fontSize={'24px'}
                      marginRight={'16px'}
                    />
                    {title}
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </nav>
      <List>
        <ListItem>
          <LinkBox>
            <NextLink
              href={'#'}
              passHref
            >
              <LinkOverlay
                className={cx(styles.menuLink, pathname === '/playlist/create' && styles.menuLinkCurrent)}
              >
                <Box className={cx(styles.iconWrapper, styles.iconWrapperCreate)}>
                  <ListIcon
                    as={MdAdd}
                    fontSize={'16px'}
                  />
                </Box>
                Create Playlist
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
        <ListItem>
          <LinkBox>
            <NextLink
              href={'#'}
              passHref
            >
              <LinkOverlay
                className={cx(styles.menuLink, pathname === '/collection/tracks' && styles.menuLinkCurrent)}
              >
                <Box className={cx(styles.iconWrapper, styles.iconWrapperLiked)}>
                  <ListIcon
                    as={MdFavorite}
                    fontSize={'14px'}
                  />
                </Box>
                Liked Songs
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      </List>
      <Divider marginTop={'12px'} />
      <List className={styles.playlistsList}>
        {playlists.map((playlist, index) => (
          <ListItem key={`${playlist.id}-${index}`}>
            <LinkBox>
              <NextLink
                href={`/playlist/${playlist.id}`}
                passHref
              >
                <LinkOverlay
                  className={cx(
                    styles.playlistsLink,
                    asPath === `/playlist/${playlist.id}` && styles.playlistsLinkCurrent
                  )}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>
                    {playlist.name}
                  </span>
                  {isPlaying && playlistId === playlist.id && (
                    <FiVolume2
                      style={{
                        color: 'var(--chakra-colors-green-400)',
                        marginLeft: 'auto',
                      }}
                    />
                  )}
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
        {isPlaylistsLoading && (
          <Stack>
            {new Array(3).fill(null).map((_, index) => (
              <Skeleton
                key={index}
                height={'20px'}
                startColor={'gray.700'}
                endColor={'gray.800'}
              />
            ))}
          </Stack>
        )}
      </List>
    </Box>
  )
}

export default Sidebar
