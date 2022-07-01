import {
  Box, Divider, LinkBox, LinkOverlay, List, ListIcon, ListItem,
} from '@chakra-ui/layout'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  MdAdd, MdFavorite, MdHomeFilled, MdOutlineLibraryMusic, MdSearch,
} from 'react-icons/md'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons'
import logo from '../public/logo.svg'
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
    route: '/search',
  },
  {
    title: 'Your Library',
    icon: MdOutlineLibraryMusic,
    route: '/collection',
  },
]

const Sidebar = () => {
  const { pathname } = useRouter()

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.logo}>
        <NextLink
          href="/"
          passHref
        >
          <LinkOverlay>
            <Image
              src={logo}
              width="130px"
              height="40px"
            />
          </LinkOverlay>
        </NextLink>
      </Box>
      <List marginBottom="24px">
        {navigationMenuData.map(({ title, route, icon }) => (
          <ListItem key={title}>
            <LinkBox>
              <NextLink
                href={route}
                passHref
              >
                <LinkOverlay
                  className={classNames(styles.menuLink, pathname === route && styles.menuLinkCurrent)}
                >
                  <ListIcon
                    as={icon}
                    fontSize="24px"
                    marginRight="16px"
                  />
                  {title}
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem>
          <LinkBox>
            <NextLink
              href="/playlists/create"
              passHref
            >
              <LinkOverlay
                className={classNames(styles.menuLink, pathname === '/playlists/create' && styles.menuLinkCurrent)}
              >
                <Box className={classNames(styles.iconWrapper, styles.iconWrapperCreate)}>
                  <ListIcon
                    as={MdAdd}
                    fontSize="16px"
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
              href="/collection/tracks"
              passHref
            >
              <LinkOverlay
                className={classNames(styles.menuLink, pathname === '/collection/tracks' && styles.menuLinkCurrent)}
              >
                <Box className={classNames(styles.iconWrapper, styles.iconWrapperLiked)}>
                  <ListIcon
                    as={MdFavorite}
                    fontSize="14px"
                  />
                </Box>
                Liked Songs
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      </List>
      <Divider marginY="12px" />
    </Box>
  )
}

export default Sidebar
