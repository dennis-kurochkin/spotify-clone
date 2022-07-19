import { validateRoute } from '~/helpers/auth'
import { prismaClient } from '~/lib/prisma'

export default validateRoute(async (req, res) => {
  const { pid } = req.query
  const playlists = await prismaClient.playlist.findUnique({
    where: {
      id: +pid,
    },
  })

  res.json(playlists)
})
