import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
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
        avatar: 'http://placekitten.com/g/600/600',
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

  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
      name: 'Dennis',
      avatar: 'http://placekitten.com/g/400/400',
    },
  })

  const songs = await prisma.song.findMany({})
  await Promise.all(new Array(10).fill(1).map((_, index) => {
    return prisma.playlist.create({
      data: {
        name: `Playlist #${index + 1}`,
        avatar: 'http://placekitten.com/g/500/500',
        description: 'Playlist description',
        user: {
          connect: {
            id: user.id,
          },
        },
        songs: {
          connect: songs.map((song) => ({ id: song.id })),
        },
      },
    })
  }))
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
