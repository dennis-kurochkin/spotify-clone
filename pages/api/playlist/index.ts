import { validateRoute } from '../../../helpers/auth'
import { prismaClient } from '../../../lib/prisma'

export default validateRoute(async (req, res, user) => {
  const playlists = await prismaClient.playlist.findMany({
    where: {
      userId: user.id,
    },
  })

  res.json(playlists)
})
