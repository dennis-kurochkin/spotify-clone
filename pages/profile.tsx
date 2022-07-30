import Head from 'next/head'
import type { Artist } from '@prisma/client'
import GradientPage from '~/components/GradientPage'
import { useApiMe } from '~/hooks/useApi'
import { prismaClient } from '~/lib/prisma'
import ProfileSection from '~/components/ProfileSection'
import { Box } from '@chakra-ui/layout'
import ArtistCard from '~/components/ArtistCard'
import { usePageTitle } from '~/hooks/usePageTitle'
import { serverSideSignInRedirect, validateToken } from '~/helpers/auth'
import { AUTH_JWT_COOKIE_NAME } from '~/constants/auth'
import { GetServerSidePropsContext } from 'next'

const Profile = ({ artists }: { artists: Artist[] }) => {
  const { user, isLoading } = useApiMe()
  const pageTitle = usePageTitle('Profile')

  return (
    <>
      <Head>
        <title>
          {pageTitle}
        </title>
      </Head>
      <GradientPage
        title={!!user && !isLoading ? user.name : 'Loading...'}
        subtitle={'Profile'}
        description={`${artists.length} artists following`}
        headerGradient={{
          start: '#B7351B',
          end: '#3E140E',
        }}
        contentGradient={{
          start: '#48140B',
        }}
        avatarSrc={user?.avatar}
      >
        <ProfileSection
          title={'Top artists this month'}
          description={'Only visible to you'}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '24px',
            }}
          >
            {artists.map((artist, index) => (
              <ArtistCard
                key={`${artist.id}-${index}`}
                name={artist.name}
                avatarSrc={artist.avatar}
              />
            ))}
          </Box>
        </ProfileSection>
      </GradientPage>
    </>
  )
}

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  try {
    validateToken(req.cookies[AUTH_JWT_COOKIE_NAME] ?? '')
  } catch (error) {
    return serverSideSignInRedirect()
  }

  const artists = await prismaClient.artist.findMany({})

  return {
    props: {
      artists,
    },
  }
}

export default Profile
