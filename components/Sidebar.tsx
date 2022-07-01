import {
  Box, LinkBox, LinkOverlay, List, ListIcon, ListItem,
} from '@chakra-ui/layout'
import Image from 'next/image'
import NextLink from 'next/link'
import { MdHomeFilled, MdOutlineLibraryMusic, MdSearch } from 'react-icons/md'
import logo from '../public/logo.svg'
import styles from './Sidebar.module.css'

const navigationMenuData = [
  {
    title: 'Home',
    href: '/',
    icon: MdHomeFilled,
  },
  {
    title: 'Search',
    href: '/search',
    icon: MdSearch,
  },
  {
    title: 'Your Library',
    href: '/collection',
    icon: MdOutlineLibraryMusic,
  },
]

const Sidebar = () => {
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
      <List
        spacing={2}
        marginBottom="24px"
      >
        {navigationMenuData.map(({ title, href, icon }) => (
          <ListItem key={title}>
            <LinkBox>
              <NextLink
                href={href}
                passHref
              >
                <LinkOverlay className={styles.menuLink}>
                  <ListIcon
                    as={icon}
                    color="white"
                    marginRight="16px"
                  />
                  {title}
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
