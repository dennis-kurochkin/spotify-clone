[<img src="./public/logo.svg" width="350"/>](./public/logo.svg)

**Sbotify** is a Spotify clone app built with TypeScript, [React](https://github.com/facebook/react), [Next.js](https://nextjs.org/) and [Prisma](https://github.com/prisma/prisma). I made it while learning more about Next.js and React in general, and now I'm happy to showcase it as a part of my portfolio.

You can visit the demo on [this webpage](https://sbotify-clone.vercel.app/) or install the project on your computer.

## Authorization and User Credentials

Using the demo requires authorization. You can either sign up with any email you want (even not real, there is no email confirmation), or sign in with these credentials:

```
login: user@test.com
password: password
```

## Installation

First, install all the packages with **npm**:

```bash
npm ci
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma commands

To make changes in the database you'll need database credentials in yout `.env` file. You can get those using [heroku](https://www.heroku.com/) for free.

Here is the list of useful commands for Prisma ORM:

```bash
# sync database with schema, detects if you need to make a migration
npx prisma db push

# migrate database 
npx prisma migrate dev|prod

# generate data in database
npx prisma db seed

# go in prisma studio
npx prisma studio

# drop database and run migration (clears data)
npx prisma migrate reset
```
