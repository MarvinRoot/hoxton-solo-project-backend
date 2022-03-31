import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const genres = [
    {
        id: 1,
        name: "Hip-Hop",
        image: "https://i.scdn.co/image/ab67706f000000036cb04ce4baed2e4cc0d11461"
    },
    {
        id: 2,
        name: "Pop",
        image: "https://i.scdn.co/image/ab67706c0000bebbc14667db36e06ca21c2746fb"
    },
    {
        id: 3,
        name: "Rock",
        image: "https://i.scdn.co/image/ab67706f000000034eb58a097da59ad442e26bf2"
    },
    {
        id: 4,
        name: "Electronic",
        image: "https://i.scdn.co/image/ab67706f000000034d4a7ce30e78b9212beb2712"
    },
    {
        id: 5,
        name: "Classical",
        image: "https://i.scdn.co/image/ab67706c0000bebbd54237616a14c76c37b65f8b"
    }
]

const users = [
    {
        id: 1,
        username: "Marvin",
        email: "marvin@mail.com",
        password: bcrypt.hashSync('marvin123'),
        profilePic: "https://avatars.dicebear.com/api/avataaars/Marvin.svg",
    }
]

const songs = [
    {
        id: 1,
        genreId: 1,
        title: "Young Jesus",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/224446118&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273f0f7649257d4b99460929ced"
    },
    {
        id: 2,
        genreId: 1,
        title: "Flexing",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/566444991&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2737425f756cdc992d2f485eb64"
    },
    {
        id: 3,
        genreId: 1,
        title: "Backseat Freestyle",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/63540899&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273d58e537cea05c2156792c53d"
    },
    {
        id: 4,
        genreId: 1,
        title: "Ready To Die",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/196631923&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273dfa5bb0198242e86e8fbf9a2"
    },
    {
        id: 5,
        genreId: 1,
        title: "No Role Modelz",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1011563983&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2736aca031ccc27d2e4dd829d14"
    },
    {
        id: 6,
        genreId: 1,
        title: "Today Was A Good Day",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/300351034&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d00001e02e83d58253e2e7c6742bbf9e4"
    },
    {
        id: 7,
        genreId: 1,
        title: "Full Clip",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/203173784&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273adb5dbf4251255a00146d8eb"
    },
    {
        id: 8,
        genreId: 2,
        title: "New Rules",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/332239193&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2731764e1a1b94e887206782640"
    },
    {
        id: 9,
        genreId: 2,
        title: "Often",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/155876731&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2737fcead687e99583072cc217b"
    },
    {
        id: 10,
        genreId: 2,
        title: "King Of The Fall",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/159570672&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2734446ef225c7b753992cbca0c"
    },
    {
        id: 11,
        genreId: 2,
        title: "Six Feet Under",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/270518513&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273fae80fc6c7f60e75cfc519c7"
    },
    {
        id: 12,
        genreId: 2,
        title: "Talking To The Moon",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/19144882&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273f6b55ca93bd33211227b502b"
    },
    {
        id: 13,
        genreId: 2,
        title: "Run The World",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/13964439&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273c64883f3ec0b5369cd9777fe"
    },
    {
        id: 14,
        genreId: 2,
        title: "Diamonds",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/83159523&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2731f69f49a0d2f6b13a79efe02"
    },
    {
        id: 15,
        genreId: 3,
        title: "Beggin",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1056431755&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273dbc892b8194e35ca3524e767"
    },
    {
        id: 16,
        genreId: 3,
        title: "Highway To Hell",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/93144788&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b27351c02a77d09dfcd53c8676d0"
    },
    {
        id: 17,
        genreId: 3,
        title: "Back in Black",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/154016669&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2730b51f8d91f3a21e8426361ae"
    },
    {
        id: 18,
        genreId: 3,
        title: "Thunderstruck",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/122281403&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2738399047ff71200928f5b6508"
    },
    {
        id: 19,
        genreId: 3,
        title: "Paranoid",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/119322787&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273cfa6ec6d5374ce8aec1a73f5"
    },
    {
        id: 20,
        genreId: 3,
        title: "Purple Haze",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/149587811&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273c9adfbd773852e286faed040"
    },
    {
        id: 21,
        genreId: 3,
        title: "Sweet Child O' Mine",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/130988069&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b27368384dd85fd5e95831252f60"
    },
    {
        id: 22,
        genreId: 4,
        title: "Lean On Me",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/193781466&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273a7a062b686a999b1bc5d980b"
    },
    {
        id: 23,
        genreId: 4,
        title: "Light It Up",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/231782838&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b27325c6801ca3d3b7630519649e"
    },
    {
        id: 24,
        genreId: 4,
        title: "Bubble Butt",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/93698799&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2735610f1b8813b09a9e6edd8e7"
    },
    {
        id: 25,
        genreId: 4,
        title: "Be Together",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/208199477&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273b07e1ca97690736df80aa4ad"
    },
    {
        id: 26,
        genreId: 4,
        title: "Levels",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/54728377&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273ffb343926530168be4724dd4"
    },
    {
        id: 27,
        genreId: 4,
        title: "Purple Lamborghini",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/274793736&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273602b6507f5289db71603c2f4"
    },
    {
        id: 28,
        genreId: 4,
        title: "Bangarang",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/45719017&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2736081278cb62df2757d55633b"
    },
    {
        id: 29,
        genreId: 5,
        title: "Piano Sonata No.17",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/208231906&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/693030b2c7ee75d1fc095d9e6a7fe391a6b10f27"
    },
    {
        id: 30,
        genreId: 5,
        title: "MoonLight Sonata",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/101845244&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/693030b2c7ee75d1fc095d9e6a7fe391a6b10f27"
    },
    {
        id: 31,
        genreId: 5,
        title: "Fur Elise",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/101845055&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/693030b2c7ee75d1fc095d9e6a7fe391a6b10f27"
    },
    {
        id: 32,
        genreId: 5,
        title: "Four Seasons: Winter",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/72198511&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b27316a2d8fe3b6e865067e2fde3"
    },
    {
        id: 33,
        genreId: 5,
        title: "Waltz No.2",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/86854494&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b273895cac8f9d6a00e7c92eee8a"
    },
    {
        id: 34,
        genreId: 5,
        title: "River Flows In You",
        src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/53187186&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        image: "https://i.scdn.co/image/ab67616d0000b2734fc129d3e4a82d3b23fa2af2"
    }

]

const artists = [
    {
        name: "Logic",
        id: 1,
        genreId: 1,
        image: "https://i.scdn.co/image/ab6761610000e5ebc0f43abdba90d508842d7367"
    },
    {
        name: "Pop Smoke",
        id: 3,
        genreId: 1,
        image: "https://i.scdn.co/image/ab6761610000e5eb597f9edd2cd1a892d4412b09"
    },
    {
        name: "Kendrick Lamar",
        id: 4,
        genreId: 1,
        image: "https://spottedsounds.com/wp-content/uploads/2018/08/kendrick-lamar.jpg"
    },
    {
        name: "The Notorious B.I.G",
        id: 5,
        genreId: 1,
        image: "https://thisis-images.scdn.co/37i9dQZF1DZ06evO39qAJG-default.jpg"
    },
    {
        name: "J.Cole",
        id: 6,
        genreId: 1,
        image: "https://i.scdn.co/image/ab67706f000000023dbbfd76ed4226ca52e44c4e"
    },
    {
        name: "Ice Cube",
        id: 7,
        genreId: 1,
        image: "https://i.scdn.co/image/ab6761610000e5eb650e79afafd00492e33d7b8c"
    },
    {
        name: "Gang Starr",
        id: 8,
        genreId: 1,
        image: "https://lite-images-i.scdn.co/image/ab67616d0000b273e38d4567dbeb5decf989a84d"
    },
    {
        name: "Dua Lipa",
        id: 9,
        genreId: 2,
        image: "https://lite-images-i.scdn.co/image/ab67706f00000002880da7c5be289f2c7787ccd2"
    },
    {
        name: "The Weeknd",
        id: 10,
        genreId: 2,
        image: "https://i.scdn.co/image/ab67706f00000003387c0ddfa4c7553ce24edba5"
    },
    {
        name: "Billie Eilish",
        id: 11,
        genreId: 2,
        image: "https://i.scdn.co/image/ab67706f000000034d26d431869cabfc53c67d8e"
    },
    {
        name: "Bruno Mars",
        id: 12,
        genreId: 2,
        image: "https://i.scdn.co/image/ab67706f000000036ce408042bebe4b19a5ede72"
    },
    {
        name: "Beyonce",
        id: 13,
        genreId: 2,
        image: "https://i.scdn.co/image/ab67706f00000003e3e2727edc2f59616536f30b"
    },
    {
        name: "Rihanna",
        id: 14,
        genreId: 2,
        image: "https://i.scdn.co/image/ab67706f00000003efdcaeb6d5a53f0628022192"
    },
    {
        name: "Maneskin",
        id: 15,
        genreId: 3,
        image: "https://pbs.twimg.com/media/E3Ln52gXwAQ9snJ?format=jpg&name=large"
    },
    {
        name: "AC/DC",
        id: 16,
        genreId: 3,
        image: "https://thisis-images.scdn.co/37i9dQZF1DZ06evO49hLQA-default.jpg"
    },
    {
        name: "Black Sabbath",
        id: 17,
        genreId: 3,
        image: "https://thisis-images.scdn.co/37i9dQZF1DZ06evO3oYXfO-default.jpg"
    },
    {
        name: "Jimi Hendrix",
        id: 18,
        genreId: 3,
        image: "https://lite-images-i.scdn.co/image/ab67706f0000000245498745ad37fecec2835633"
    },
    {
        name: "Guns n' Roses",
        id: 19,
        genreId: 3,
        image: "https://thisis-images.scdn.co/37i9dQZF1DZ06evO1Ziym4-default.jpg"
    },
    {
        name: "Major Lazer",
        id: 20,
        genreId: 4,
        image: "https://thisis-images.scdn.co/37i9dQZF1DZ06evO4aypPO-large.jpg"
    },
    {
        name: "Avicci",
        id: 21,
        genreId: 4,
        image: "https://i.scdn.co/image/ab67706f00000003136380a2498089b7ead3122c"
    },
    {
        name: "Skrillex",
        id: 22,
        genreId: 4,
        image: "https://i.scdn.co/image/ab67706f00000003a90d6064ee6625dbba0851c5"
    },
    {
        name: "Bethoven",
        id: 23,
        genreId: 5,
        image: "https://lite-images-i.scdn.co/image/ab67706f00000002255243f29ac28ef92ec7644a"
    },
    {
        name: "Vivaldi",
        id: 24,
        genreId: 5,
        image: "https://i.scdn.co/image/ab67706f00000003995af0c89200809b471d1264"
    },
    {
        name: "Dmitri Shostakovich",
        id: 25,
        genreId: 5,
        image: "https://i.scdn.co/image/28f745db0a77d0e70db1c0be305f51b3478706aa"
    },
    {
        name: "Yiruma",
        id: 26,
        genreId: 5,
        image: "https://i.scdn.co/image/ab67706f000000034c0cd6257a9f69ee5ed2eb51"
    }
]

const artistsSongs = [
    {
        songId: 1,
        artistId: 1
    },
    {
        songId: 2,
        artistId: 3
    },
    {
        songId: 3,
        artistId: 4
    },
    {
        songId: 4,
        artistId: 5
    },
    {
        songId: 5,
        artistId: 6
    },
    {
        songId: 6,
        artistId: 7
    },
    {
        songId: 7,
        artistId: 8
    },
    {
        songId: 8,
        artistId: 9
    },
    {
        songId: 9,
        artistId: 10
    },
    {
        songId: 10,
        artistId: 10
    },
    {
        songId: 11,
        artistId: 11
    },
    {
        songId: 12,
        artistId: 12
    },
    {
        songId: 13,
        artistId: 13
    },
    {
        songId: 14,
        artistId: 14
    },
    {
        songId: 15,
        artistId: 15
    },
    {
        songId: 16,
        artistId: 16
    },
    {
        songId: 17,
        artistId: 16
    },
    {
        songId: 18,
        artistId: 16
    },
    {
        songId: 19,
        artistId: 17
    },
    {
        songId: 20,
        artistId: 18
    },
    {
        songId: 21,
        artistId: 19
    },
    {
        songId: 22,
        artistId: 20
    },
    {
        songId: 23,
        artistId: 20
    },
    {
        songId: 24,
        artistId: 20
    },
    {
        songId: 24,
        artistId: 12
    },
    {
        songId: 25,
        artistId: 20
    },
    {
        songId: 26,
        artistId: 21
    },
    {
        songId: 27,
        artistId: 22
    },
    {
        songId: 28,
        artistId: 22
    },
    {
        songId: 29,
        artistId: 23
    },
    {
        songId: 30,
        artistId: 23
    },
    {
        songId: 31,
        artistId: 23
    },
    {
        songId: 32,
        artistId: 24
    },
    {
        songId: 33,
        artistId: 25
    },
    {
        songId: 34,
        artistId: 26
    }
]

const favoriteSongs = [
    {
        userId: 1,
        songId: 1
    },
    {
        userId: 1,
        songId: 4
    },
    {
        userId: 1,
        songId: 3
    },
    {
        userId: 1,
        songId: 5
    }
]

const favoriteGenres = [
    {
        userId: 1,
        genreId: 1
    },
    {
        userId: 1,
        genreId: 4
    }
]

const favoriteArtists = [
    {
        userId: 1,
        artistId: 3
    },
    {
        userId: 1,
        artistId: 4
    },
    {
        userId: 1,
        artistId: 5
    },
    {
        userId: 1,
        artistId: 6
    }
]

const playlistSongs = [
    {
        playlistId: 1,
        songId: 1
    },
    {
        playlistId: 1,
        songId: 2
    }
]

const comments = [
    {
        userId: 1,
        songId: 3,
        content: "Kendrick is the best in the rap game rn"
    }
]

const playlists = [
    {
        userId: 1,
        title: "fire"
    }
]

async function createStuff() {
    for (const genre of genres) {
        await prisma.genre.create({ data: genre })
    }

    for (const artist of artists) {
        await prisma.artist.create({ data: artist })
    }

    for (const song of songs) {
        await prisma.song.create({ data: song })
    }

    for (const artistsSong of artistsSongs) {
        await prisma.artistsSongs.create({ data: artistsSong })
    }

    for (const user of users) {
        await prisma.user.create({ data: user })
    }

    for (const playlist of playlists) {
        await prisma.playlist.create({ data: playlist })
    }

    for (const favoriteSong of favoriteSongs) {
        await prisma.favoriteSongs.create({ data: favoriteSong })
    }

    for (const favoriteGenre of favoriteGenres) {
        await prisma.favoriteGenres.create({ data: favoriteGenre })
    }

    for (const playlistSong of playlistSongs) {
        await prisma.playlistSongs.create({ data: playlistSong })
    }

    for (const favoriteArtist of favoriteArtists) {
        await prisma.favoriteArtists.create({ data: favoriteArtist })
    }

    for (const comment of comments) {
        await prisma.comments.create({ data: comment })
    }
}

createStuff()