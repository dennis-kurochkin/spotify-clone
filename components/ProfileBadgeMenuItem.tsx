import { MenuItem } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Box, Link } from '@chakra-ui/layout'
import NextLink from 'next/link'

interface Props {
  children: ReactNode
  href: string
}

const ProfileBadgeMenuItem = ({ children, href }: Props) => {
  return (
    <NextLink
      href={href}
      passHref
    >
      <Link>
        <MenuItem
          as={Box}
          sx={{
            paddingY: '10px',
            color: 'var(--colors-white)',
            fontSize: 'var(--font-size-400)',
            borderRadius: '4px',
            _hover: {
              background: 'var(--colors-background-200)',
            },
            _focus: {
              background: 'var(--colors-background-200)',
            },
          }}
        >
          {children}
        </MenuItem>
      </Link>
    </NextLink>
  )
}

export default ProfileBadgeMenuItem
