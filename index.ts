import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

//function to create the token
function createToken(id: number) {
    //@ts-ignore
    const token = jwt.sign({ id: id }, process.env.MY_SECRET, {
        expiresIn: '3days'
    })
    return token
}

async function getUserFromToken(token: string) {
    //@ts-ignore
    const data = jwt.verify(token, process.env.MY_SECRET)
    const user = await prisma.user.findUnique({
        //@ts-ignore
        where: { id: data.id },
        select: {
            id: true,
            email: true,
            username: true,
            profilePic: true
        }
    })
    return user
}

const prisma = new PrismaClient()
const PORT = 3001

const app = express()
app.use(cors())
app.use(express.json())

app.post('/sign-up', async (req, res) => {
    const { username, email, password } = req.body

    try {
        //generate a hash from their password
        const hash = bcrypt.hashSync(password, 8)
        const user = await prisma.user.create({
            //store the hash instead of the password the user enters
            data: { username, email, password: hash, profilePic: `https://avatars.dicebear.com/api/avataaars/${username}.svg` },
            select: {
                id: true,
                email: true,
                username: true,
                profilePic: true
            }
        })
        res.send({ user, token: createToken(user.id) })
    } catch (err) {
        res.status(400).send({
            error: "The e-mail or username you're trying to use already exists"
        })
    }
})

app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        //@ts-ignore
        const passwordMatches = bcrypt.compareSync(password, user.password)

        if (user && passwordMatches) {
            res.send({ user, token: createToken(user.id) })
        } else {
            throw Error('Email/password invalid')
        }
    } catch (err) {
        res.status(400).send({ error: 'Email/password invalid' })
    }
})

//checks if there is a token still available
//if there is, it signs us in directly
app.get('/validate', async (req, res) => {
    const token = req.headers.authorization || ''

    try {
        const user = await getUserFromToken(token)
        res.send(user)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/songs', async (req, res) => {
    try {
        const songs = await prisma.song.findMany({ include: { artistsSongs: { include: { artist: true } } } })
        res.send(songs)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }

})

app.get('/songs/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const song = await prisma.song.findUnique({ where: { id }, include: { artistsSongs: { include: { artist: true } } } })
        if (song) res.send(song)
        else res.status(400).send({ error: `Song with id ${id} not found` })
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/artists', async (req, res) => {
    try {
        const artist = await prisma.artist.findMany({ include: { artistsSongs: { include: { song: true } } } })
        res.send(artist)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/artists/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const artist = await prisma.artist.findUnique({ where: { id }, include: { artistsSongs: { include: { song: true } } } })
        if (artist) res.send(artist)
        else res.status(400).send({ error: `Artist with id ${id} not found` })
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/genres', async (req, res) => {
    try {
        const genres = await prisma.genre.findMany()
        res.send(genres)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany(
            {
                include: {
                    favoriteGenres: { include: { genre: true } },
                    favoriteSongs: { include: { song: true } },
                    favoriteArtists: { include: { artist: true } },
                    playlists: { include: { playlistSongs: { include: { song: true } } } }
                }
            })
        res.send(users)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const users = await prisma.user.findUnique({
            where: { id }, include: {
                favoriteGenres: { include: { genre: true } },
                favoriteSongs: { include: { song: true } },
                favoriteArtists: { include: { artist: true } },
                playlists: { include: { playlistSongs: { include: { song: true } } } }
            }
        })
        if (users) res.send(users)
        else res.status(400).send({ error: `User with id ${id} not found` })
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/playlists', async (req, res) => {
    try {
        const playlists = await prisma.playlist.findMany(
            {
                include: { playlistSongs: { include: { song: true } } }
            })
        res.send(playlists)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/playlists/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const playlists = await prisma.playlist.findUnique({ where: { id }, include: { playlistSongs: { include: { song: true } } } })
        if (playlists) res.send(playlists)
        else res.status(400).send({ error: `Playlist with id ${id} not found` })
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.listen(PORT, () => console.log(`Server up: http:\\localhost:${PORT}`))