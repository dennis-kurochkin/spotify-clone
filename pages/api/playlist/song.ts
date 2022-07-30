import { validateRoute } from '~/helpers/auth'
import { prismaClient } from '~/lib/prisma'

export default validateRoute(async (req, res, user) => {
  const playlist = await prismaClient.playlist.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  })

  res.json(playlist)
})
