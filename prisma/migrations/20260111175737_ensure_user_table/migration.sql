/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "badges" TEXT[],
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Game',
ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT 'Medium',
ADD COLUMN     "duration" TEXT NOT NULL DEFAULT '30 mins',
ADD COLUMN     "howToPlay" TEXT[],
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "mood" TEXT NOT NULL DEFAULT 'Fun',
ADD COLUMN     "occasion" TEXT[],
ADD COLUMN     "players" TEXT NOT NULL DEFAULT '2+ Players',
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "story" TEXT,
ADD COLUMN     "whatYoullLove" TEXT[];

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Joy Juncture',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
