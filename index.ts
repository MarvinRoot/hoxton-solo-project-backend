import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const PORT = 3001

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log(`Server up: http:\\localhost:${PORT}`))