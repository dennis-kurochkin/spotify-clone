import { PrismaClient } from '@prisma/client'
import { artistsData } from './seedData'

const prisma = new PrismaClient()

const run = async () => {
  await Promise.all(artistsData.map((artist) => (
    prisma.artist.upsert({
      where: {
        name: artist.name,
      },
      update: {},
      create: {
        name: artist.name,
        songs: {
          create: artist.songs.map((song) => ({
            name: song.name,
            duration: song.duration,
            url: song.url,
          })),
        },
      },
    })
  )))
}

run()
  .then()
  .catch((error) => {
    console.error(error)
    console.log('Process terminated')
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
