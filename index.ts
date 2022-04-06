import express from 'express'
import cors from 'cors'
import { Genre, PrismaClient } from '@prisma/client'
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
            profilePic: true,
            favoriteGenres: true,
            favoriteArtists: true,
            favoriteSongs: true,
            playlists: { include: { playlistSongs: true } },
            comments: true
        }
    })
    return user
}

const prisma = new PrismaClient()
const PORT = 3001

const app = express()
app.use(cors())
app.use(express.json())

// signs up a user
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
                profilePic: true,
                favoriteGenres: true,
                favoriteArtists: true,
                favoriteSongs: true,
                playlists: { include: { playlistSongs: true } },
                comments: true

            }
        })
        res.send({ user, token: createToken(user.id) })
    } catch (err) {
        res.status(400).send({
            error: "The e-mail or username you're trying to use already exists"
        })
    }
})

// signs in a user
app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                username: true,
                password: true,
                profilePic: true,
                favoriteGenres: true,
                favoriteArtists: true,
                favoriteSongs: true,
                playlists: { include: { playlistSongs: true } },
                comments: true

            }
        })
        //@ts-ignore
        const passwordMatches = bcrypt.compareSync(password, user.password)

        if (user && passwordMatches) {
            res.send({ user, token: createToken(user.id) })
        } else {
            throw Error('Email/password invalid')
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
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

// gets all songs
app.get('/songs', async (req, res) => {
    try {
        const songs = await prisma.song.findMany({ include: { artistsSongs: { include: { artist: true } } } })
        res.send(songs)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }

})

// gets a song by id
app.get('/songs/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const song = await prisma.song.findUnique({ where: { id }, include: { artistsSongs: { select: { artist: true } }, comments: { include: { user: true } } } })
        if (!song) {
            return res.status(400).send({ error: `Song with id ${id} not found` })
        } else {
            let artists = song.artistsSongs.map(object => object.artist)
            //@ts-ignore
            song.artistsSongs = artists
            res.send(song)
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// gets all artists
app.get('/artists', async (req, res) => {
    try {
        const artist = await prisma.artist.findMany({ include: { artistsSongs: { include: { song: true } } } })
        res.send(artist)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// gets an artist by id
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

// gets all genres
app.get('/genres', async (req, res) => {
    try {
        const genres = await prisma.genre.findMany()
        res.send(genres)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// gets all users
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

// gets a user by id
app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const user = await prisma.user.findUnique({
            where: { id }, include: {
                favoriteGenres: { include: { genre: true } },
                favoriteSongs: { include: { song: true } },
                favoriteArtists: { include: { artist: true } },
                playlists: { include: { playlistSongs: { include: { song: true } } } },
                comments: { include: { user: true } }
            }
        })
        if (!user) {
            return res.status(400).send({ error: `User with id ${id} not found` })
        } else {
            let genres = user.favoriteGenres.map(object => object.genre)
            let artists = user.favoriteArtists.map(object => object.artist)
            let songs = user.favoriteSongs.map(object => object.song)
            //@ts-ignore
            user.favoriteGenres = genres
            //@ts-ignore
            user.favoriteArtists = artists
            //@ts-ignore
            user.favoriteSongs = songs
            res.send(user)
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// gets all playlists
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

// gets a playlist by id
app.get('/playlists/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const playlist = await prisma.playlist.findUnique({ where: { id }, include: { playlistSongs: { include: { song: true } } } })

        if (!playlist) {
            res.status(400).send({ error: `Playlist with id ${id} not found` })
        } else {
            // let songs = playlist.playlistSongs.map(object => object.song)
            //@ts-ignore
            // playlist.playlistSongs = songs
            res.send(playlist)
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// adds a song to the user's favorite songs list
app.post('/favoriteSongs', async (req, res) => {
    const token = req.headers.authorization || ''
    const { userId, songId } = req.body

    try {
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (user.id === userId) {
            await prisma.favoriteSongs.create({
                data: { userId, songId }
            })
            const userrr = await getUserFromToken(token)

            res.send({ userrr, message: 'Added to favorite songs' })
        } else {
            res.send({ message: 'You are not authorized!' })
        }
        // maybe write some code that detects if song already belongs to user's favs
        // think about it later
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// adds an artist to the user's favorite artists list
app.post('/favoriteArtists', async (req, res) => {
    const token = req.headers.authorization || ''
    const { userId, artistId } = req.body

    try {
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (user.id === userId) {
            const artist = await prisma.favoriteArtists.create({
                data: { userId, artistId }
            })
            const userrr = await getUserFromToken(token)

            res.send({ userrr, message: 'Added to favorite artists' })
        } else {
            res.send({ message: 'You are not authorized!' })
        }

        // maybe write some code that detects if artist already belongs to user's favs
        // think about it later
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// adds a genre to the user's favorite genres list
// app.post('/favoriteGenres', async (req, res) => {
//     const token = req.headers.authorization || ''
//     const { userId, genreId } = req.body

//     try {
//         const user = await getUserFromToken(token)
//         if (!user) {
//             res.status(404).send({ error: 'User not found' })
//             return
//         }
//         if (user.id === userId) {
//             const genre = await prisma.favoriteGenres.create({
//                 data: { userId, genreId }
//             })
//             res.send(user)
//         } else {
//             res.send({ message: 'You are not authorized!' })
//         }

//         // maybe write some code that detects if genre already belongs to user's favs
//         // think about it later
//     } catch (err) {
//         //@ts-ignore
//         res.status(400).send({ error: err.message })
//     }
// })

// adds a playlist to user's playlists
app.post('/playlists', async (req, res) => {
    const token = req.headers.authorization || ''
    const { userId, title } = req.body

    try {
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (user.id === userId) {
            let playlist = await prisma.playlist.create({
                data: { userId, title }
            })
            const userrr = await getUserFromToken(token)

            res.send({ playlist, userrr, message: `Playlist ${title} was added to you playlists` })
        } else {
            res.send({ message: 'You are not authorized!' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// adds a song to user's playlists
app.post('/playlistSongs', async (req, res) => {
    const token = req.headers.authorization || ''
    const { userId, playlistId, songId } = req.body

    try {
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (user.id === userId) {
            await prisma.playlistSongs.create({
                data: { playlistId, songId }
            })
            res.send({ user, message: `Song was added to your playlist` })
        } else {
            res.send({ message: 'You are not authorized!' })
        }

    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// removes song from user's favoriteSongs list
app.delete('/favoriteSongs/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''
    try {
        const favSong = await prisma.favoriteSongs.findUnique({ where: { id } })
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (!favSong) {
            res.status(404).send({ error: 'Song not found on list' })
            return
        }

        if (user.id === favSong.userId) {
            await prisma.favoriteSongs.delete({ where: { id } })
            const userrr = await getUserFromToken(token)
            res.send(userrr)
        } else {
            res.status(401).send({ error: 'You are not authorised to remove song from list' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

// removes artist from user's favoriteArtists list
app.delete('/favoriteArtists/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''
    try {
        const favArtist = await prisma.favoriteArtists.findUnique({ where: { id } })
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (!favArtist) {
            res.status(404).send({ error: 'Artist not found on list' })
            return
        }

        if (user.id === favArtist.userId) {
            await prisma.favoriteArtists.delete({ where: { id } })
            const userrr = await getUserFromToken(token)
            res.send(userrr)
        } else {
            res.status(401).send({ error: 'You are not authorised to remove artist from list' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

// removes genre from user's favoriteGenres list
app.delete('/favoriteGenres/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''
    try {
        const favGenre = await prisma.favoriteGenres.findUnique({ where: { id } })
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (!favGenre) {
            res.status(404).send({ error: 'Genre not found on list' })
            return
        }

        if (user.id === favGenre.userId) {
            await prisma.favoriteGenres.delete({ where: { id } })
            res.send(favGenre)
        } else {
            res.status(401).send({ error: 'You are not authorised to remove genre from list' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

// deletes playlist
app.delete('/playlists/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''
    try {
        const playlist = await prisma.playlist.findUnique({ where: { id } })
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (!playlist) {
            res.status(404).send({ error: 'Playlist not found on list' })
            return
        }
        if (user.id === playlist.userId) {
            await prisma.playlist.delete({ where: { id } })
            const userrr = await getUserFromToken(token)

            res.send({ playlist, userrr })
        } else {
            res.status(401).send({ error: 'You are not authorised to remove genre from list' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

// removes song from playlist
app.delete('/playlistSongs/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''
    try {
        //@ts-ignore
        const playlistSong = await prisma.playlistSongs.findUnique({ where: { id } })
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (!playlistSong) {
            res.status(404).send({ error: 'Song not found on playlist' })
            return
        }
        //@ts-ignore
        await prisma.playlistSongs.delete({ where: { id } })
        let playlist = await prisma.playlist.findUnique({ where: { id: playlistSong.playlistId }, include: { playlistSongs: { include: { song: true } } } })

        res.send(playlist)
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

// changes username
app.patch('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''
    const { newUsername } = req.body
    try {
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        const updatedUser = await prisma.user.update({ where: { id }, data: { username: newUsername } })
        res.send(updatedUser)
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

app.patch('/playlists/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''
    const { newPlaylistTitle } = req.body
    try {
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        const updatedPlaylist = await prisma.playlist.update({ where: { id }, data: { title: newPlaylistTitle } })
        res.send(updatedPlaylist)
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

// app.patch('/favoriteGenres', async (req, res) => {
//     const token = req.headers.authorization || ''
//     const { selectedGenres } = req.body
//     try {
//         const user = await getUserFromToken(token)
//         if (!user) {
//             res.status(404).send({ error: 'User not found' })
//             return
//         }
//         const updatedUser = await prisma.user.update({ where: { id: user.id }, data: { favoriteGenres: selectedGenres } })
//         res.send(updatedUser)
//     } catch (err) {
//         //@ts-ignore
//         res.status(401).send({ error: err.message })
//     }
// })

app.post('/favoriteGenres', async (req, res) => {
    const token = req.headers.authorization || ''
    const { userId, selectedGenres } = req.body
    try {
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        let genreIds = selectedGenres.map((genre: Genre) => genre.id)
        for (let id of genreIds) {
            await prisma.favoriteGenres.create({ data: { userId, genreId: id } })
        }
        res.send(user)
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

app.post('/comments', async (req, res) => {
    const token = req.headers.authorization || ''
    const { userId, songId, content } = req.body
    try {
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (user.id === userId) {
            await prisma.comments.create({
                data: { userId, songId, content }
            })
            const song = await prisma.song.findUnique({ where: { id: songId }, include: { artistsSongs: { select: { artist: true } }, comments: { include: { user: true } } } })
            const userrr = await getUserFromToken(token)
            res.send({ song, userrr, message: `Song was added to your playlist` })
        } else {
            res.send({ message: 'You are not authorized!' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.delete('/comments/:id', async (req, res) => {
    const id = Number(req.params.id)
    const token = req.headers.authorization || ''
    const { songId } = req.body
    try {
        const comment = await prisma.comments.findUnique({ where: { id } })
        const user = await getUserFromToken(token)
        if (!user) {
            res.status(404).send({ error: 'User not found' })
            return
        }
        if (!comment) {
            res.status(404).send({ error: 'Comment not found on list' })
            return
        }
        if (user.id === comment.userId) {
            await prisma.comments.delete({ where: { id } })
            const userrr = await getUserFromToken(token)
            const song = await prisma.song.findUnique({ where: { id: songId }, include: { artistsSongs: { select: { artist: true } }, comments: { include: { user: true } } } })
            res.send({ song, userrr })
        } else {
            res.status(401).send({ error: 'You are not authorised to remove genre from list' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(401).send({ error: err.message })
    }
})

app.listen(PORT, () => console.log(`Server up: http:\\localhost:${PORT}`))