import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET_KEY || 'supersecret'
const ACCESS_TOKEN_EXPIRY = '1h'
const REFRESH_TOKEN_EXPIRY = '7d'

export const generateAccessToken = (user: User) => {
	return jwt.sign({ id: user.id, login: user.login }, JWT_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRY,
	})
}

export const generateRefreshToken = (user: User) => {
	return jwt.sign({ id: user.id }, JWT_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRY,
	})
}

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET) as { id: string; login: string }
}

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, hash: string) => {
	return bcrypt.compare(password, hash)
}
