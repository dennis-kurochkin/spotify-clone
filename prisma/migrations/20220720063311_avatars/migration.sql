/*
  Warnings:

  - Added the required column `avatar` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "avatar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL;
